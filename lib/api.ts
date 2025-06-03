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
    // URL específica del webhook de n8n para agendamiento de citas
    const webhookUrl = 'https://n8n.srv795474.hstgr.cloud/webhook-test/agendar-citas-sandramar'

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