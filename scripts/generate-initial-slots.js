/**
 * Script para generar slots iniciales de disponibilidad
 * Este script debe ejecutarse desde n8n o MongoDB directamente
 * Genera slots para los próximos 6 meses basado en los horarios de la psicóloga
 * 
 * CONFIGURACIÓN MONGODB:
 * Host: 168.231.68.83:27017
 * Database: sandramar_appointments
 * User: admin
 * Password: MagnamAI2025+
 * AuthSource: admin
 * Connection: mongodb://admin:MagnamAI2025+@168.231.68.83:27017/sandramar_appointments?authSource=admin
 */

// Configuración de horarios por día de la semana
const PSICOLOGA_SCHEDULE = {
  0: { startTime: '07:30', endTime: '00:00', available: false }, // Domingo
  1: { startTime: '07:30', endTime: '20:00', available: true },  // Lunes
  2: { startTime: '07:30', endTime: '20:00', available: true },  // Martes  
  3: { startTime: '07:30', endTime: '12:00', available: true },  // Miércoles
  4: { startTime: '07:30', endTime: '20:00', available: true },  // Jueves
  5: { startTime: '07:30', endTime: '20:00', available: true },  // Viernes
  6: { startTime: '07:30', endTime: '12:00', available: true },  // Sábado
}

// Configuración de servicios
const SERVICES = {
  individual: { duration: 75, lastSlot: { normal: '18:45', short: null } },
  parejas: { duration: 120, lastSlot: { normal: '18:00', short: null } }
}

function timeToMinutes(time) {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}

function minutesToTime(minutes) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

function generateSlotsForDate(date, serviceType) {
  const dayOfWeek = date.getDay()
  const schedule = PSICOLOGA_SCHEDULE[dayOfWeek]
  
  if (!schedule.available) {
    return []
  }

  const service = SERVICES[serviceType]
  const slots = []
  const startMinutes = timeToMinutes(schedule.startTime)
  const endMinutes = timeToMinutes(schedule.endTime)
  
  // Calcular última hora permitida según día y tipo de servicio
  let lastAppointmentMinutes
  if (dayOfWeek === 3 || dayOfWeek === 6) { // Miércoles o Sábado
    lastAppointmentMinutes = timeToMinutes('12:00') - service.duration
  } else {
    lastAppointmentMinutes = timeToMinutes(service.lastSlot.normal)
  }
  
  // Generar slots cada 15 minutos
  for (let currentMinutes = startMinutes; currentMinutes <= lastAppointmentMinutes; currentMinutes += 15) {
    const slotEndMinutes = currentMinutes + service.duration
    
    if (slotEndMinutes <= endMinutes) {
      const startTime = minutesToTime(currentMinutes)
      const endTime = minutesToTime(slotEndMinutes)
      
      slots.push({
        date: date.toISOString().split('T')[0],
        startTime: startTime,
        endTime: endTime,
        serviceType: serviceType,
        isBooked: false,
        appointmentId: null,
        reservedUntil: null,
        createdAt: new Date(),
        updatedAt: new Date()
      })
    }
  }

  return slots
}

function generateAllSlots() {
  const allSlots = []
  const startDate = new Date()
  const endDate = new Date()
  endDate.setMonth(endDate.getMonth() + 6) // 6 meses adelante
  
  const currentDate = new Date(startDate)
  
  while (currentDate <= endDate) {
    // Generar slots para ambos tipos de servicio
    const individualSlots = generateSlotsForDate(new Date(currentDate), 'individual')
    const parejasSlots = generateSlotsForDate(new Date(currentDate), 'parejas')
    
    allSlots.push(...individualSlots, ...parejasSlots)
    
    // Avanzar al siguiente día
    currentDate.setDate(currentDate.getDate() + 1)
  }
  
  return allSlots
}

// Para usar en n8n Code Node:
/*
const slots = generateAllSlots()

// Insertar en MongoDB
for (const slot of slots) {
  await db.collection('appointment_slots').insertOne(slot)
}

return { 
  slotsGenerated: slots.length,
  message: 'Slots generados exitosamente'
}
*/

// Para usar en MongoDB Shell:
/*
// Copiar las funciones arriba y luego ejecutar:
const slots = generateAllSlots()
db.appointment_slots.insertMany(slots)
*/

// Ejemplo de documentos generados:
const exampleSlots = [
  {
    "date": "2024-01-15",
    "startTime": "08:00",
    "endTime": "09:15",
    "serviceType": "individual",
    "isBooked": false,
    "appointmentId": null,
    "reservedUntil": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  },
  {
    "date": "2024-01-15", 
    "startTime": "08:00",
    "endTime": "10:00",
    "serviceType": "parejas",
    "isBooked": false,
    "appointmentId": null,
    "reservedUntil": null,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]

console.log('Ejemplo de slots que se generarían:', exampleSlots) 