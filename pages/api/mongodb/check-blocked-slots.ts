import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

// Configuración MongoDB desde variables de entorno
const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING!
const MONGODB_DB = process.env.MONGODB_DATABASE!

let cachedClient: MongoClient | null = null

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  cachedClient = client
  return client
}

// Función para convertir tiempo HH:MM a minutos
function timeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

// Función para convertir minutos a tiempo HH:MM
function minutesToTime(minutes: number): string {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

interface SlotDocument {
  _id?: any
  date: string
  startTime: string
  endTime: string
  serviceType: string
  isBooked: boolean
  appointmentId?: string | null
  createdAt: Date
  updatedAt?: Date
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo permitir POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { date, serviceType } = req.body

    // Validar parámetros
    if (!date || !serviceType) {
      return res.status(400).json({ 
        error: 'Faltan parámetros requeridos: date, serviceType',
        blockedSlots: []
      })
    }

    // Conectar a MongoDB
    const client = await connectToDatabase()
    const db = client.db(MONGODB_DB)
    
    // Query para obtener solo slots BLOQUEADOS (isBooked: true)
    // IMPORTANTE: Para el bloqueo, necesitamos considerar TODAS las citas del día
    // porque una cita de parejas puede bloquear horarios de individual y viceversa
    const query = {
      date: date,
      isBooked: true
      // Removemos serviceType del filtro para obtener TODAS las citas del día
    }

    console.log('DEBUG - Query ejecutada:', query)

    const blockedSlots = await db.collection<SlotDocument>('appointment_slots')
      .find(query)
      .sort({ startTime: 1 })
      .toArray()

    console.log('DEBUG - Slots encontrados en BD:', blockedSlots.length)
    
    if (blockedSlots.length > 0) {
      console.log('DEBUG - Primer slot encontrado:', blockedSlots[0])
    }

    // PASO 1: Primero devolver los slots exactos (como antes)
    const exactBlockedSlots = blockedSlots.map((slot: SlotDocument) => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
      reason: 'exact_match'
    }))

    // PASO 2: Calcular slots adicionales que se solaparían
    const serviceDuration = serviceType === 'individual' ? 75 : 120
    const overlapBlockedSlots: Array<{startTime: string, endTime: string, reason: string}> = []

    console.log(`DEBUG - Calculando solapamientos para servicio ${serviceType} (${serviceDuration} min)`)

         // Para cada slot de 15 minutos del día
     for (let currentMinutes = timeToMinutes('07:30'); currentMinutes <= timeToMinutes('18:30'); currentMinutes += 15) {
       const slotStartTime = minutesToTime(currentMinutes)
       const potentialEndMinutes = currentMinutes + serviceDuration
       
       console.log(`DEBUG - Evaluando slot ${slotStartTime} (nueva cita iría de ${slotStartTime} a ${minutesToTime(potentialEndMinutes)})`)
       
       // Verificar solapamiento con cada cita existente
       for (const existingSlot of blockedSlots) {
         const existingStartMinutes = timeToMinutes(existingSlot.startTime)
         const existingEndMinutes = timeToMinutes(existingSlot.endTime)
         
         console.log(`  - Comparando con cita existente ${existingSlot.startTime}-${existingSlot.endTime}`)
         
         // LÓGICA DE SOLAPAMIENTO CORREGIDA:
         // Dos intervalos se solapan si: max(start1, start2) < min(end1, end2)
         // O más simple: start1 < end2 && start2 < end1
         const wouldOverlap = currentMinutes < existingEndMinutes && existingStartMinutes < potentialEndMinutes
         
         console.log(`  - ¿Se solapa? ${wouldOverlap} (${currentMinutes} < ${existingEndMinutes} && ${existingStartMinutes} < ${potentialEndMinutes})`)
         
         if (wouldOverlap) {
           // No duplicar slots que ya están en exactBlockedSlots
           const isAlreadyBlocked = exactBlockedSlots.some(blocked => blocked.startTime === slotStartTime)
           
           if (!isAlreadyBlocked && !overlapBlockedSlots.some(blocked => blocked.startTime === slotStartTime)) {
             overlapBlockedSlots.push({
               startTime: slotStartTime,
               endTime: minutesToTime(currentMinutes + 15),
               reason: `overlap_with_${existingSlot.startTime}`
             })
             console.log(`  ✅ BLOQUEADO: Slot ${slotStartTime} bloqueado por solapamiento con cita ${existingSlot.startTime}-${existingSlot.endTime}`)
           } else {
             console.log(`  - Ya estaba bloqueado: ${slotStartTime}`)
           }
           break
         } else {
           console.log(`  - No hay solapamiento para ${slotStartTime}`)
         }
       }
     }

    // COMBINAR todos los slots bloqueados
    const allBlockedSlots = [
      ...exactBlockedSlots,
      ...overlapBlockedSlots
    ]

    console.log('DEBUG - Slots exactos:', exactBlockedSlots.length)
    console.log('DEBUG - Slots por solapamiento:', overlapBlockedSlots.length)
    console.log('DEBUG - Total slots bloqueados:', allBlockedSlots.length)

    return res.status(200).json({ 
      blockedSlots: allBlockedSlots,
      total: allBlockedSlots.length
    })

  } catch (error) {
    console.error('Error obteniendo slots bloqueados:', error)
    return res.status(500).json({ 
      error: 'Error interno del servidor',
      blockedSlots: [] // En caso de error, no bloquear ningún slot
    })
  }
} 