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
  // Solo permitir POST para operaciones de escritura
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    // Conectar a MongoDB
    const client = await connectToDatabase()
    const db = client.db(MONGODB_DB)
    
    // Eliminar todos los datos de slots de prueba
    const result = await db.collection('appointment_slots').deleteMany({
      createdAt: { $gte: new Date('2025-06-04T03:50:39.000Z') }
    })

    return res.status(200).json({ 
      success: true,
      message: `Eliminados ${result.deletedCount} registros de prueba`,
      deletedCount: result.deletedCount
    })

  } catch (error) {
    console.error('Error limpiando datos:', error)
    return res.status(500).json({ 
      error: 'Error interno del servidor'
    })
  }
} 