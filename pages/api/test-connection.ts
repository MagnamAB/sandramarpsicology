import type { NextApiRequest, NextApiResponse } from 'next'
import { MongoClient } from 'mongodb'

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING!
const MONGODB_DB = process.env.MONGODB_DATABASE!

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = new MongoClient(MONGODB_URI)
    await client.connect()
    
    const db = client.db(MONGODB_DB)
    const collection = db.collection('appointment_slots')
    
    // Buscar todas las citas del 7 de junio
    const june7Slots = await collection.find({
      date: '2025-06-07'
    }).toArray()
    
    // Buscar todas las citas en general
    const allSlots = await collection.find({}).toArray()
    
    await client.close()
    
    return res.status(200).json({
      success: true,
      june7Count: june7Slots.length,
      totalCount: allSlots.length,
      june7Slots: june7Slots.map(slot => ({
        date: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime,
        serviceType: slot.serviceType,
        isBooked: slot.isBooked,
        nombre: slot.nombre
      })),
      allDates: Array.from(new Set(allSlots.map(slot => slot.date))).sort()
    })
    
  } catch (error) {
    return res.status(500).json({ 
      error: error instanceof Error ? error.message : 'Unknown error'
    })
  }
} 