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

    // PASO 2A: Bloquear todos los slots que caen DENTRO de citas existentes
    console.log('DEBUG - PASO 2A: Bloqueando slots dentro de citas existentes')
    for (const existingSlot of blockedSlots) {
      const existingStartMinutes = timeToMinutes(existingSlot.startTime)
      const existingEndMinutes = timeToMinutes(existingSlot.endTime)
      
      console.log(`  - Procesando cita existente ${existingSlot.startTime}-${existingSlot.endTime}`)
      
      // Bloquear todos los slots de 15 min que caen dentro de esta cita
      for (let slotMinutes = timeToMinutes('07:30'); slotMinutes <= timeToMinutes('18:30'); slotMinutes += 15) {
        const slotStartTime = minutesToTime(slotMinutes)
        
        // Un slot está dentro de una cita si su inicio está entre el inicio y fin de la cita (sin incluir el final)
        if (slotMinutes >= existingStartMinutes && slotMinutes < existingEndMinutes) {
          // No duplicar slots que ya están en exactBlockedSlots
          const isAlreadyBlocked = exactBlockedSlots.some(blocked => blocked.startTime === slotStartTime) ||
                                  overlapBlockedSlots.some(blocked => blocked.startTime === slotStartTime)
          
          if (!isAlreadyBlocked) {
            overlapBlockedSlots.push({
              startTime: slotStartTime,
              endTime: minutesToTime(slotMinutes + 15),
              reason: `during_appointment_${existingSlot.startTime}`
            })
            console.log(`    ✅ BLOQUEADO: Slot ${slotStartTime} está durante la cita ${existingSlot.startTime}-${existingSlot.endTime}`)
          }
        }
      }
    }

    // PASO 2B: Bloquear slots que se solaparían con nuevas citas (SOLO horarios de inicio válidos)
    console.log('DEBUG - PASO 2B: Bloqueando slots que se solaparían con nuevas citas')
    for (let currentMinutes = timeToMinutes('07:30'); currentMinutes <= timeToMinutes('18:30'); currentMinutes += 15) {
      const slotStartTime = minutesToTime(currentMinutes)
      const potentialEndMinutes = currentMinutes + serviceDuration
      const potentialEndTime = minutesToTime(potentialEndMinutes)
      
      // Solo considerar si el slot terminaría dentro del horario de atención (máximo 22:00)
      if (potentialEndMinutes > timeToMinutes('22:00')) {
        continue
      }
      
      // Verificar solapamiento con cada cita existente
      for (const existingSlot of blockedSlots) {
        const existingStartMinutes = timeToMinutes(existingSlot.startTime)
        const existingEndMinutes = timeToMinutes(existingSlot.endTime)
        
        // LÓGICA DE SOLAPAMIENTO CORREGIDA: 
        // Hay solapamiento REAL solo si:
        // 1. El FINAL de la nueva cita es DESPUÉS del INICIO de la existente, Y
        // 2. El INICIO de la nueva cita es ANTES del FINAL de la existente
        // PERO: Si una termina exactamente cuando empieza la otra, NO hay solapamiento
        const wouldOverlap = potentialEndMinutes > existingStartMinutes && currentMinutes < existingEndMinutes
        
        console.log(`      Evaluando slot ${slotStartTime}-${potentialEndTime} vs cita ${existingSlot.startTime}-${existingSlot.endTime}:`)
        console.log(`      - ¿Final nueva (${potentialEndMinutes}) > Inicio existente (${existingStartMinutes})? ${potentialEndMinutes > existingStartMinutes}`)
        console.log(`      - ¿Inicio nueva (${currentMinutes}) < Final existente (${existingEndMinutes})? ${currentMinutes < existingEndMinutes}`)
        console.log(`      - ¿Se solapa? ${wouldOverlap}`)
        
        if (wouldOverlap) {
          // No duplicar slots que ya están bloqueados
          const isAlreadyBlocked = exactBlockedSlots.some(blocked => blocked.startTime === slotStartTime) ||
                                  overlapBlockedSlots.some(blocked => blocked.startTime === slotStartTime)
          
          if (!isAlreadyBlocked) {
            overlapBlockedSlots.push({
              startTime: slotStartTime,
              endTime: potentialEndTime, // ✅ CORREGIDO: usar duración completa del servicio
              reason: `overlap_with_${existingSlot.startTime}`
            })
            console.log(`    ✅ BLOQUEADO: Slot ${slotStartTime}-${potentialEndTime} se solaparía con cita ${existingSlot.startTime}-${existingSlot.endTime}`)
          }
          break
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