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

// Función para agendar citas
export const submitAppointment = async (appointmentData: AppointmentData): Promise<ApiResponse> => {
  try {
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_URL

    if (!webhookUrl) {
      throw new Error('Webhook URL no configurada')
    }

    // Preparar datos para enviar
    const payload = {
      ...appointmentData,
      timestamp: new Date().toISOString(),
      source: 'website',
      type: 'appointment',
      action: 'create',
      status: 'pending',
      userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'server'
    }

    const response = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 15000 // 15 segundos de timeout para citas
    })

    return {
      success: true,
      message: 'Cita agendada exitosamente',
      data: response.data
    }
  } catch (error) {
    console.error('Error agendando cita:', error)
    
    return {
      success: false,
      message: 'Error al agendar la cita. Por favor intenta nuevamente o contacta directamente por WhatsApp.',
    }
  }
}

// Función para generar enlace de WhatsApp con mensaje personalizado
export const generateWhatsAppLink = (message?: string): string => {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '573106983385'
  const defaultMessage = 'Hola Dra. Sandra, me interesa agendar una cita de psicología. ¿Cuándo tendría disponibilidad?'
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