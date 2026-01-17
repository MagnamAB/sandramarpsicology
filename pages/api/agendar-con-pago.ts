import type { NextApiRequest, NextApiResponse} from 'next'
import axios from 'axios'

/**
 * API Route: Agendar Cita con Pago Verificado
 * 
 * Esta función se llama SOLO después de que el pago ha sido verificado como exitoso.
 * Envía los datos de la cita al webhook de N8N para guardar en MongoDB y enviar emails.
 * 
 * Flujo:
 * 1. Recibe datos de la cita + ID de transacción de Wompi
 * 2. Verifica que el pago sea válido (double-check)
 * 3. Envía a N8N para guardar la cita
 * 4. Retorna confirmación
 */

interface AgendarConPagoRequest {
  // Datos de la cita
  nombre: string
  email: string
  telefono: string
  servicio: 'individual' | 'parejas'
  fecha: string
  hora: string
  duracion: string
  modalidad: 'presencial' | 'virtual'
  mensaje?: string
  
  // Datos del pago
  transactionId: string
  pagoReferencia: string
  pagoMonto: number
}

interface AgendarConPagoResponse {
  success: boolean
  message: string
  appointmentId?: string
  transactionId?: string
  error?: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<AgendarConPagoResponse>
) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método no permitido' 
    })
  }

  try {
    const appointmentData = req.body as AgendarConPagoRequest

    // Validaciones básicas
    if (!appointmentData.nombre || !appointmentData.email || !appointmentData.telefono) {
      return res.status(400).json({ 
        success: false, 
        message: 'Datos de contacto incompletos' 
      })
    }

    if (!appointmentData.fecha || !appointmentData.hora || !appointmentData.servicio) {
      return res.status(400).json({ 
        success: false, 
        message: 'Datos de la cita incompletos' 
      })
    }

    if (!appointmentData.transactionId) {
      return res.status(400).json({ 
        success: false, 
        message: 'ID de transacción no proporcionado' 
      })
    }

    // Double-check: Verificar que el pago sea válido
    console.log(`Verificando pago antes de agendar: ${appointmentData.transactionId}`)
    
    // Detectar si estamos en modo sandbox basado en la llave pública
    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || ''
    const isSandbox = publicKey.startsWith('pub_test_')
    const wompiBaseUrl = isSandbox ? 'https://sandbox.wompi.co' : 'https://production.wompi.co'
    const wompiApiUrl = `${wompiBaseUrl}/v1/transactions/${appointmentData.transactionId}`
    
    console.log(`Ambiente Wompi: ${isSandbox ? 'SANDBOX' : 'PRODUCCIÓN'}`)
    const wompiResponse = await axios.get(wompiApiUrl, { timeout: 5000 })
    const transaction = wompiResponse.data.data

    // Verificar que el pago esté aprobado
    if (transaction.status !== 'APPROVED') {
      console.error(`Pago no aprobado: ${transaction.status}`)
      return res.status(400).json({ 
        success: false, 
        message: `El pago no fue aprobado. Estado: ${transaction.status}` 
      })
    }

    // Verificar que el monto coincida
    const expectedAmount = appointmentData.pagoMonto * 100 // Convertir a centavos
    if (transaction.amount_in_cents !== expectedAmount) {
      console.error(`Monto no coincide. Esperado: ${expectedAmount}, Recibido: ${transaction.amount_in_cents}`)
      return res.status(400).json({ 
        success: false, 
        message: 'El monto del pago no coincide con el servicio seleccionado' 
      })
    }

    console.log('Pago verificado exitosamente, procediendo a agendar...')

    // Obtener webhook de N8N desde variables de entorno
    const webhookUrl = process.env.NEXT_PUBLIC_WEBHOOK_AGENDAR_CITAS

    if (!webhookUrl) {
      console.error('ERROR: NEXT_PUBLIC_WEBHOOK_AGENDAR_CITAS no está configurada')
      return res.status(500).json({ 
        success: false, 
        message: 'Configuración de servidor incompleta' 
      })
    }

    // Preparar payload para N8N
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
      
      // Información del pago
      pagado: true,
      pagoEstado: 'APPROVED',
      pagoTransaccionId: appointmentData.transactionId,
      pagoReferencia: appointmentData.pagoReferencia,
      pagoMonto: appointmentData.pagoMonto,
      pagoMoneda: 'COP',
      pagoFecha: new Date().toISOString(),
      pagoMetodo: transaction.payment_method_type || 'desconocido',
      
      // Metadatos para procesamiento en n8n
      timestamp: new Date().toISOString(),
      fechaCompleta: new Date(appointmentData.fecha + 'T' + appointmentData.hora).toISOString(),
      source: 'website_scheduler_with_payment',
      type: 'appointment',
      action: 'create_with_payment',
      status: 'confirmed', // Ya confirmado porque ya pagó
      
      // Información adicional del sistema
      userAgent: req.headers['user-agent'] || 'unknown',
      timezone: 'America/Bogota',
      
      // Información para el procesamiento
      servicioDetalle: getServiceDetails(appointmentData.servicio),
      modalidadDetalle: appointmentData.modalidad === 'presencial' ? {
        tipo: 'presencial',
        ubicacion: 'Carrera 13 Nº 122 – 34, Santa Bárbara, Bogotá',
        indicaciones: 'Consulta presencial en el consultorio'
      } : {
        tipo: 'virtual',
        plataforma: 'Zoom',
        indicaciones: 'Se enviará enlace de videollamada 30 minutos antes'
      }
    }

    // Enviar a N8N
    console.log('Enviando datos a N8N webhook...', {
      url: webhookUrl.substring(0, 50) + '...',
      fecha: payload.fecha,
      hora: payload.hora,
      servicio: payload.servicio
    })

    const n8nResponse = await axios.post(webhookUrl, payload, {
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'DraVargasWebsite/1.0',
        'X-Webhook-Source': 'appointment-scheduler-payment'
      },
      timeout: 15000 // 15 segundos
    })

    // Verificar respuesta de N8N
    if (n8nResponse.status === 200 || n8nResponse.status === 201) {
      console.log('Cita agendada exitosamente en N8N')
      
      return res.status(200).json({
        success: true,
        message: 'Cita agendada exitosamente. Te contactaré 24h antes para confirmar.',
        appointmentId: n8nResponse.data.appointmentId || 'generated',
        transactionId: appointmentData.transactionId
      })
    } else {
      throw new Error(`N8N respondió con status ${n8nResponse.status}`)
    }

  } catch (error) {
    console.error('Error agendando cita con pago:', error)

    // Manejo específico de errores
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED') {
        return res.status(408).json({ 
          success: false, 
          message: 'Tiempo de espera agotado. Tu pago fue procesado, te contactaremos por email para confirmar tu cita.' 
        })
      } else if (error.response && error.response.status === 404) {
        return res.status(500).json({ 
          success: false, 
          message: 'Servicio de agendamiento no disponible. Tu pago fue procesado, te contactaremos por email.' 
        })
      } else if (error.response && error.response.status >= 500) {
        return res.status(500).json({ 
          success: false, 
          message: 'Error del servidor. Tu pago fue procesado, te contactaremos por email para confirmar.' 
        })
      }
    }
    
    return res.status(500).json({ 
      success: false, 
      message: 'Error al agendar. Tu pago fue procesado exitosamente. Te contactaremos por email para confirmar tu cita.' 
    })
  }
}

// Función auxiliar para obtener detalles del servicio
function getServiceDetails(serviceId: string) {
  const services: Record<string, any> = {
    'individual': {
      nombre: 'Terapia Individual',
      duracion: '75 minutos',
      descripcion: 'Sesión de psicoterapia individual para adultos',
      precio: parseInt(process.env.NEXT_PUBLIC_PRECIO_INDIVIDUAL || '150000')
    },
    'parejas': {
      nombre: 'Terapia de Parejas',
      duracion: '120 minutos',
      descripcion: 'Sesión de terapia sistémica para parejas',
      precio: parseInt(process.env.NEXT_PUBLIC_PRECIO_PAREJAS || '200000')
    }
  }
  
  return services[serviceId] || {
    nombre: serviceId,
    duracion: '75 minutos',
    descripcion: 'Sesión de psicoterapia',
    precio: 150000
  }
}
