/**
 * Script para generar slots iniciales de disponibilidad directamente en MongoDB
 * Ejecutar con: node scripts/populate-mongodb.js
 * 
 * CONFIGURACIÓN MONGODB:
 * Host: 168.231.68.83:27017
 * Database: sandramar_appointments
 * User: admin
 * Password: MagnamAI2025+
 * AuthSource: admin
 */

const { MongoClient } = require('mongodb');

// Configuración de conexión
const MONGODB_URI = 'mongodb://admin:MagnamAI2025+@168.231.68.83:27017/sandramar_appointments?authSource=admin';
const DATABASE_NAME = 'sandramar_appointments';

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

async function connectAndPopulate() {
  const client = new MongoClient(MONGODB_URI);
  
  try {
    console.log('🔌 Conectando a MongoDB...');
    await client.connect();
    console.log('✅ Conectado exitosamente a MongoDB');
    
    const db = client.db(DATABASE_NAME);
    
    // Crear índices si no existen
    console.log('📊 Creando índices...');
    await db.collection('appointment_slots').createIndex({ "date": 1, "serviceType": 1, "isBooked": 1 });
    await db.collection('appointments').createIndex({ "date": 1, "startTime": 1 });
    await db.collection('appointments').createIndex({ "googleCalendarEventId": 1 });
    console.log('✅ Índices creados');
    
    // Verificar si ya existen slots
    const existingSlots = await db.collection('appointment_slots').countDocuments();
    
    if (existingSlots > 0) {
      console.log(`⚠️  Ya existen ${existingSlots} slots en la base de datos`);
      console.log('¿Quieres eliminarlos y recrearlos? (Ctrl+C para cancelar)');
      
      // Esperar 5 segundos para que el usuario pueda cancelar
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      console.log('🗑️  Eliminando slots existentes...');
      await db.collection('appointment_slots').deleteMany({});
    }
    
    // Generar y insertar nuevos slots
    console.log('🏗️  Generando slots para los próximos 6 meses...');
    const slots = generateAllSlots();
    
    console.log(`📝 Insertando ${slots.length} slots en MongoDB...`);
    
    if (slots.length > 0) {
      await db.collection('appointment_slots').insertMany(slots);
      console.log(`✅ ${slots.length} slots insertados exitosamente`);
      
      // Mostrar estadísticas
      const individualCount = slots.filter(s => s.serviceType === 'individual').length;
      const parejasCount = slots.filter(s => s.serviceType === 'parejas').length;
      
      console.log(`📊 Estadísticas:`);
      console.log(`   - Slots individuales: ${individualCount}`);
      console.log(`   - Slots de parejas: ${parejasCount}`);
      console.log(`   - Total: ${slots.length}`);
    } else {
      console.log('⚠️  No se generaron slots');
    }
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await client.close();
    console.log('🔌 Conexión cerrada');
  }
}

// Ejecutar el script
if (require.main === module) {
  connectAndPopulate()
    .then(() => {
      console.log('🎉 Script completado exitosamente');
      process.exit(0);
    })
    .catch(error => {
      console.error('💥 Error ejecutando script:', error);
      process.exit(1);
    });
} 