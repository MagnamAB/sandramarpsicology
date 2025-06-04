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
    const { date, serviceType } = req.body

    // Validar parámetros
    if (!date || !serviceType) {
      return res.status(400).json({ 
        error: 'Faltan parámetros requeridos: date, serviceType' 
      })
    }

    // Conectar a MongoDB
    const client = await connectToDatabase()
    const db = client.db(MONGODB_DB)
    
    // Query simplificada - solo slots libres
    const query = {
      date: date,
      serviceType: serviceType,
      isBooked: false
    }

    const slots = await db.collection<SlotDocument>('appointment_slots')
      .find(query)
      .sort({ startTime: 1 })
      .toArray()

    // Formatear respuesta
    const formattedSlots = slots.map((slot: SlotDocument) => ({
      startTime: slot.startTime,
      endTime: slot.endTime,
      id: `${slot.startTime}-${slot.endTime}`
    }))

    return res.status(200).json({ 
      slots: formattedSlots,
      total: formattedSlots.length
    })

  } catch (error) {
    console.error('Error obteniendo slots:', error)
    return res.status(500).json({ 
      error: 'Error interno del servidor',
      slots: [] 
    })
  }
} 