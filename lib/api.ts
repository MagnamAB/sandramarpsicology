import axios from 'axios'

export interface ContactFormData {
  nombre: string
  email: string
  telefono: string
  servicio: string
  mensaje?: string
}

export interface AppointmentData {
  nombre: string
  email: string
  telefono: string
  servicio: string
  fecha: string
  hora: string
  duracion: string
  modalidad: string
  mensaje?: string
}

// Nueva interfaz para gestión de disponibilidad
export interface TimeSlotData {
  date: string
  startTime: string
  endTime: string
  serviceType: 'individual' | 'parejas'
  isBooked: boolean
  appointmentId?: string
  reservedUntil?: string // Para reservas temporales
  createdAt: string
  updatedAt?: string
}

// Nueva interfaz para reservas temporales
export interface SlotReservation {
  id: string
  date: string
  startTime: string
  endTime: string
  serviceType: 'individual' | 'parejas'
  clientData: {
    nombre: string
    email: string
    telefono: string
  }
  expiresAt: string
  status: 'pending' | 'confirmed' | 'expired'
}

export interface ApiResponse {
  success: boolean
  message: string
  data?: any
}

// Función para enviar datos del formulario de contacto a n8n
export const submitContactForm = async (formData: ContactFormData): Promise<ApiResponse> => {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL

    if (!webhookUrl) {
      throw new Error('Webhook URL no configurada')
    }

    // Preparar datos para enviar
    const payload = {
      ...formData,
      timestamp: new Date().toISOString(),
      source: 'website',
      type: 'contact',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
    }

    const response = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000 // 10 segundos de timeout
    })

    return {
      success: true,
      message: 'Formulario enviado exitosamente',
      data: response.data
    }
  } catch (error) {
    console.error('Error enviando formulario:', error)
    
    return {
      success: false,
      message: 'Error al enviar el formulario. Por favor intenta nuevamente o contacta directamente por WhatsApp.',
    }
  }
}

// Función para agendar citas - Envío a webhook n8n específico
export const submitAppointment = async (appointmentData: AppointmentData): Promise<ApiResponse> => {
  try {
      // URL del webhook desde variables de entorno
  const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_AGENDAR_CITAS
  
  if (!webhookUrl) {
    throw new Error('NEXT_PUBLIC_WEBHOOK_AGENDAR_CITAS no está configurada en las variables de entorno')
  }

    // Preparar datos optimizados para n8n
    const payload = {
      // Datos principales de la cita
      nombre: appointmentData.nombre,
      email: appointmentData.email,
      telefono: appointmentData.telefono,
      servicio: appointmentData.servicio,
      fecha: appointmentData.fecha,
      hora: appointmentData.hora,
      duracion: appointmentData.duracion,
      modalidad: appointmentData.modalidad,
      mensaje: appointmentData.mensaje || '',
      
      // Metadatos para procesamiento en n8n
      timestamp: new Date().toISOString(),
      fechaCompleta: new Date(appointmentData.fecha + 'T' + appointmentData.hora).toISOString(),
      source: 'website_scheduler',
      type: 'appointment',
      action: 'create',
      status: 'pending_confirmation',
      
      // Información adicional del sistema
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      
      // Información para el procesamiento
      servicioDetalle: getServiceDetails(appointmentData.servicio),
      modalidadDetalle: appointmentData.modalidad === 'presencial' ? {
        tipo: 'presencial',
        ubicacion: 'Carrera 13 Nº 122 – 34, Santa Bárbara, Bogotá',
        indicaciones: 'Consulta presencial en el consultorio'
      } : {
        tipo: 'virtual',
        plataforma: 'videollamada',
        indicaciones: 'Se enviará enlace de videollamada 30 minutos antes'
      }
    }

    const response = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DraVarigsWebsite/1.0',
        'X-Webhook-Source': 'appointment-scheduler'
      },
      timeout: 15000 // 15 segundos de timeout
    })

    // Verificar si la respuesta de n8n indica éxito
    if (response.status === 200 || response.status === 201) {
    return {
      success: true,
        message: 'Cita agendada exitosamente. Te contactaré para confirmar.',
      data: response.data
      }
    } else {
      throw new Error(`Error en webhook: ${response.status}`)
    }

  } catch (error) {
    console.error('Error agendando cita en n8n:', error)
    
    // Manejo específico de errores
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          message: 'Tiempo de espera agotado. Por favor intenta nuevamente o contacta por WhatsApp.',
        }
      } else if (error.response && error.response.status === 404) {
        return {
          success: false,
          message: 'Servicio de agendamiento temporalmente no disponible. Contacta por WhatsApp.',
        }
      } else if (error.response && error.response.status >= 500) {
        return {
          success: false,
          message: 'Error interno del servidor. Por favor contacta por WhatsApp.',
        }
      }
    }
    
    return {
      success: false,
      message: 'Error al agendar la cita. Por favor contacta directamente por WhatsApp al +57 310 698 3385.',
    }
  }
}

// Función auxiliar para obtener detalles del servicio
const getServiceDetails = (serviceId: string) => {
  const services = {
    'individual': {
      nombre: 'Terapia Individual',
      duracion: '75 minutos',
      descripcion: 'Sesión de psicoterapia individual para adultos',
      precio: 'Consultar'
    },
    'parejas': {
      nombre: 'Terapia de Parejas',
      duracion: '120 minutos',
      descripcion: 'Sesión de terapia sistémica para parejas',
      precio: 'Consultar'
    },
    'familiar': {
      nombre: 'Terapia Familiar',
      duracion: '120 minutos',
      descripcion: 'Sesión de terapia familiar sistémica',
      precio: 'Consultar'
    },
    'desarrollo': {
      nombre: 'Desarrollo Personal',
      duracion: '75 minutos',
      descripcion: 'Sesión de desarrollo personal y autoconocimiento',
      precio: 'Consultar'
    }
  }
  
  return services[serviceId as keyof typeof services] || {
    nombre: serviceId,
    duracion: '75 minutos',
    descripcion: 'Sesión de psicoterapia',
    precio: 'Consultar'
  }
}

// Función para generar enlace de WhatsApp con mensaje personalizado
export const generateWhatsAppLink = (message?: string): string => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573106983385'
  const defaultMessage = 'Hola Sandra, me interesa agendar una cita de psicología. ¿Cuándo tendría disponibilidad?'
  const finalMessage = message || defaultMessage
  
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(finalMessage)}`
}

// Función para validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Función para validar teléfono colombiano
export const isValidColombianPhone = (phone: string): boolean => {
  // Acepta formatos: +57XXXXXXXXXX, 57XXXXXXXXXX, 3XXXXXXXXX
  const phoneRegex = /^(\+?57)?[3][0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Función para formatear teléfono
export const formatPhone = (phone: string): string => {
  const cleaned = phone.replace(/\D/g, '')
  
  if (cleaned.startsWith('57')) {
    return `+${cleaned}`
  } else if (cleaned.startsWith('3')) {
    return `+57${cleaned}`
  }
  
  return phone
}

// =============================================================================
// SISTEMA DE GESTIÓN DE DISPONIBILIDAD DE CITAS
// =============================================================================

// Base URL del API de disponibilidad (solo para operaciones de escritura)
const AVAILABILITY_API_BASE = process.env.NEXT_PUBLIC_AVAILABILITY_API

if (!AVAILABILITY_API_BASE) {
  throw new Error('NEXT_PUBLIC_AVAILABILITY_API no está configurada en las variables de entorno')
}

// URLs internas de Next.js para consultas directas a MongoDB
const MONGODB_API_INTERNAL = '/api/mongodb'

// =============================================================================
// CONSULTAS DIRECTAS A MONGODB (VIA API ROUTES DE NEXT.JS)
// =============================================================================

// Función para obtener slots disponibles directamente desde MongoDB
export const getAvailableSlots = async (
  date: string,
  serviceType: 'individual' | 'parejas'
): Promise<Array<{ startTime: string; endTime: string; id: string }>> => {
  try {
    const response = await axios.post(`${MONGODB_API_INTERNAL}/get-slots`, {
      date,
      serviceType,
      timestamp: new Date().toISOString()
    }, {
      timeout: 3000 // Reducido para consultas rápidas
    })

    return response.data.slots || []
  } catch (error) {
    console.error('Error obteniendo slots disponibles:', error)
    // En caso de error, retornamos array vacío para evitar mostrar horarios incorrectos
    return []
  }
}

// Función para verificar disponibilidad específica directamente en MongoDB
export const checkSlotAvailability = async (
  date: string, 
  startTime: string, 
  serviceType: 'individual' | 'parejas'
): Promise<{ available: boolean; reason?: string }> => {
  try {
    // Usar el nuevo endpoint que verifica solo slots BLOQUEADOS
    const response = await axios.post(`${MONGODB_API_INTERNAL}/check-blocked-slots`, {
      date,
      serviceType,
      timestamp: new Date().toISOString()
    }, {
      timeout: 2000 // Muy rápido para verificaciones
    })

    const { blockedSlots = [] } = response.data
    
    // Verificar si el slot específico está bloqueado
    const isBlocked = blockedSlots.some((slot: any) => 
      slot.startTime === startTime
    )

    return {
      available: !isBlocked, // Disponible si NO está bloqueado
      reason: isBlocked ? 'Este horario ya está ocupado' : undefined
    }
  } catch (error) {
    console.error('Error verificando disponibilidad:', error)
    // En caso de error, asumimos que está disponible (fallback seguro)
    return { available: true, reason: 'Error de verificación - asumiendo disponible' }
  }
}

// =============================================================================
// OPERACIONES DE ESCRITURA VÍA N8N (LÓGICA DE NEGOCIO)
// =============================================================================

// Función para reservar temporalmente un slot (5-10 minutos)
export const reserveSlotTemporarily = async (
  date: string,
  startTime: string,
  endTime: string,
  serviceType: 'individual' | 'parejas',
  clientData: { nombre: string; email: string; telefono: string }
): Promise<{ success: boolean; reservationId?: string; expiresAt?: string; message?: string }> => {
  try {
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutos

    const response = await axios.post(`${AVAILABILITY_API_BASE}/reserve-slot`, {
      date,
      startTime,
      endTime,
      serviceType,
      clientData,
      expiresAt,
      timestamp: new Date().toISOString()
    }, {
      timeout: 5000
    })

    return {
      success: true,
      reservationId: response.data.reservationId,
      expiresAt,
      message: response.data.message
    }
  } catch (error) {
    console.error('Error reservando slot:', error)
    
    if (axios.isAxiosError(error) && error.response?.status === 409) {
      return {
        success: false,
        message: 'Este horario ya no está disponible. Por favor selecciona otro.'
      }
    }
    
    return {
      success: false,
      message: 'Error al reservar el horario. Por favor intenta nuevamente.'
    }
  }
}

// Función para confirmar una reserva (convertir en cita definitiva)
export const confirmSlotReservation = async (
  reservationId: string,
  appointmentData: AppointmentData
): Promise<{ success: boolean; appointmentId?: string; message?: string }> => {
  try {
    const response = await axios.post(`${AVAILABILITY_API_BASE}/confirm-reservation`, {
      reservationId,
      appointmentData,
      timestamp: new Date().toISOString()
    }, {
      timeout: 10000
    })

    return {
      success: true,
      appointmentId: response.data.appointmentId,
      message: response.data.message || 'Cita confirmada exitosamente'
    }
  } catch (error) {
    console.error('Error confirmando reserva:', error)
    return {
      success: false,
      message: 'Error al confirmar la cita. Por favor contacta por WhatsApp.'
    }
  }
}

// Función para liberar una reserva temporal (en caso de cancelación)
export const releaseSlotReservation = async (reservationId: string): Promise<void> => {
  try {
    await axios.post(`${AVAILABILITY_API_BASE}/release-reservation`, {
      reservationId,
      timestamp: new Date().toISOString()
    }, {
      timeout: 3000
    })
  } catch (error) {
    console.error('Error liberando reserva:', error)
    // No es crítico si falla, la reserva expirará automáticamente
  }
}

// Función simplificada para agendar citas - Solo usa webhook principal
export const submitAppointmentWithAvailability = async (appointmentData: AppointmentData): Promise<ApiResponse> => {
  try {
    // Verificar disponibilidad antes de enviar
    const availability = await checkSlotAvailability(
      appointmentData.fecha,
      appointmentData.hora,
      appointmentData.servicio as 'individual' | 'parejas'
    )

    if (!availability.available) {
      return {
        success: false,
        message: `Lo sentimos, este horario ya no está disponible. ${availability.reason || 'Por favor selecciona otro horario.'}`
      }
    }

    // Enviar directamente al webhook principal que maneja todo
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_AGENDAR_CITAS
    
    if (!webhookUrl) {
      throw new Error('NEXT_PUBLIC_WEBHOOK_AGENDAR_CITAS no está configurada en las variables de entorno')
    }

    // Preparar datos optimizados para n8n
    const payload = {
      // Datos principales de la cita
      nombre: appointmentData.nombre,
      email: appointmentData.email,
      telefono: appointmentData.telefono,
      servicio: appointmentData.servicio,
      fecha: appointmentData.fecha,
      hora: appointmentData.hora,
      duracion: appointmentData.duracion,
      modalidad: appointmentData.modalidad,
      mensaje: appointmentData.mensaje || '',
      
      // Metadatos para procesamiento en n8n
      timestamp: new Date().toISOString(),
      fechaCompleta: new Date(appointmentData.fecha + 'T' + appointmentData.hora).toISOString(),
      source: 'website_scheduler',
      type: 'appointment',
      action: 'create',
      status: 'pending_confirmation',
      
      // Información adicional del sistema
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      
      // Información para el procesamiento
      servicioDetalle: getServiceDetails(appointmentData.servicio),
      modalidadDetalle: appointmentData.modalidad === 'presencial' ? {
        tipo: 'presencial',
        ubicacion: 'Carrera 13 Nº 122 – 34, Santa Bárbara, Bogotá',
        indicaciones: 'Consulta presencial en el consultorio'
      } : {
        tipo: 'virtual',
        plataforma: 'videollamada',
        indicaciones: 'Se enviará enlace de videollamada 30 minutos antes'
      }
    }

    const response = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DraVarigsWebsite/1.0',
        'X-Webhook-Source': 'appointment-scheduler'
      },
      timeout: 15000 // 15 segundos de timeout
    })

    // Verificar si la respuesta de n8n indica éxito
    if (response.status === 200 || response.status === 201) {
      return {
        success: true,
        message: 'Cita agendada exitosamente. Te contactaré para confirmar.',
        data: response.data
      }
    } else {
      throw new Error(`Error en webhook: ${response.status}`)
    }

  } catch (error) {
    console.error('Error agendando cita:', error)
    
    // Manejo específico de errores
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return {
          success: false,
          message: 'Tiempo de espera agotado. Por favor intenta nuevamente o contacta por WhatsApp.',
        }
      } else if (error.response && error.response.status === 404) {
        return {
          success: false,
          message: 'Servicio de agendamiento temporalmente no disponible. Contacta por WhatsApp.',
        }
      } else if (error.response && error.response.status >= 500) {
        return {
          success: false,
          message: 'Error interno del servidor. Por favor contacta por WhatsApp.',
        }
      }
    }
    
    return {
      success: false,
      message: 'Error al agendar la cita. Por favor contacta directamente por WhatsApp al +57 310 698 3385.',
    }
  }
} 