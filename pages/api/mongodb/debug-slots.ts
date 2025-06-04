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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo permitir GET para depuración
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Conectar a MongoDB
    const client = await connectToDatabase()
    const db = client.db(MONGODB_DB)
    
    // Obtener todas las citas en las próximas 2 semanas
    const today = new Date().toISOString().split('T')[0]
    const twoWeeksLater = new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

    const allSlots = await db.collection('appointment_slots')
      .find({
        date: { $gte: today, $lte: twoWeeksLater }
      })
      .sort({ date: 1, startTime: 1 })
      .toArray()

    // Agrupar por fecha
    const slotsByDate = allSlots.reduce((acc: any, slot: any) => {
      if (!acc[slot.date]) {
        acc[slot.date] = []
      }
      acc[slot.date].push({
        time: `${slot.startTime}-${slot.endTime}`,
        serviceType: slot.serviceType,
        isBooked: slot.isBooked,
        appointmentId: slot.appointmentId,
        createdAt: slot.createdAt
      })
      return acc
    }, {})

    return res.status(200).json({ 
      totalSlots: allSlots.length,
      dateRange: { from: today, to: twoWeeksLater },
      slotsByDate
    })

  } catch (error) {
    console.error('Error en debug:', error)
    return res.status(500).json({ 
      error: 'Error interno del servidor'
    })
  }
} 