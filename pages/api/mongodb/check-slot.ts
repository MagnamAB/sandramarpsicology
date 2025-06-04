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
    const { date, startTime, serviceType } = req.body

    // Validar parámetros
    if (!date || !startTime || !serviceType) {
      return res.status(400).json({ 
        error: 'Faltan parámetros requeridos: date, startTime, serviceType' 
      })
    }

    // Conectar a MongoDB
    const client = await connectToDatabase()
    const db = client.db(MONGODB_DB)
    
    // Buscar slot específico
    const slot = await db.collection<SlotDocument>('appointment_slots').findOne({
      date: date,
      startTime: startTime,
      serviceType: serviceType
    })

    // Verificar disponibilidad
    let available = false
    let reason = null

    if (!slot) {
      reason = 'Slot no existe'
    } else if (slot.isBooked) {
      reason = 'Slot ocupado'
    } else {
      available = true
    }

    return res.status(200).json({ 
      available,
      reason
    })

  } catch (error) {
    console.error('Error verificando disponibilidad:', error)
    return res.status(500).json({ 
      available: false,
      reason: 'Error interno del servidor'
    })
  }
} 