import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

/**
 * API Route: Verificar Transacción Wompi
 * 
 * Consulta el estado de una transacción en Wompi para verificar que el pago sea legítimo.
 * IMPORTANTE: Nunca confiar solo en lo que dice el frontend, siempre verificar en el backend.
 * 
 * Flujo:
 * 1. Recibe ID de transacción desde query params
 * 2. Consulta API de Wompi
 * 3. Retorna estado real de la transacción
 */

interface WompiTransaction {
  id: string
  status: 'APPROVED' | 'DECLINED' | 'VOIDED' | 'ERROR' | 'PENDING'
  reference: string
  amount_in_cents: number
  currency: string
  payment_method_type: string
  payment_method: any
  customer_email: string
  created_at: string
}

interface VerificarResponse {
  success: boolean
  status?: string
  reference?: string
  amount?: number
  currency?: string
  transactionId?: string
  customerEmail?: string
  createdAt?: string
  error?: string
  details?: WompiTransaction
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<VerificarResponse>
) {
  // Solo aceptar GET
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      error: 'Método no permitido' 
    })
  }

  try {
    const { id } = req.query

    // Validar que el ID exista
    if (!id || typeof id !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'ID de transacción no proporcionado' 
      })
    }

    // Consultar API de Wompi
    // Documentación: https://docs.wompi.co/docs/consulta-de-transacciones
    // Detectar si estamos en modo sandbox basado en la llave pública
    const publicKey = process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || ''
    const isSandbox = publicKey.startsWith('pub_test_')
    const wompiBaseUrl = isSandbox ? 'https://sandbox.wompi.co' : 'https://production.wompi.co'
    const wompiApiUrl = `${wompiBaseUrl}/v1/transactions/${id}`
    
    console.log(`Ambiente Wompi: ${isSandbox ? 'SANDBOX' : 'PRODUCCIÓN'}`)

    console.log(`Consultando transacción Wompi: ${id}`)

    const response = await axios.get(wompiApiUrl, {
      timeout: 10000, // 10 segundos
      headers: {
        'Accept': 'application/json'
      }
    })

    const transaction: WompiTransaction = response.data.data

    // Log para debugging
    if (process.env.NODE_ENV === 'development') {
      console.log('Transacción Wompi:', {
        id: transaction.id,
        status: transaction.status,
        reference: transaction.reference,
        amount: transaction.amount_in_cents / 100
      })
    }

    // Retornar información de la transacción
    return res.status(200).json({
      success: true,
      status: transaction.status,
      reference: transaction.reference,
      amount: transaction.amount_in_cents / 100, // Convertir a pesos
      currency: transaction.currency,
      transactionId: transaction.id,
      customerEmail: transaction.customer_email,
      createdAt: transaction.created_at,
      details: transaction // Información completa para uso interno
    })

  } catch (error) {
    console.error('Error verificando transacción Wompi:', error)

    // Manejo específico de errores
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404) {
        return res.status(404).json({ 
          success: false, 
          error: 'Transacción no encontrada' 
        })
      } else if (error.code === 'ECONNABORTED') {
        return res.status(408).json({ 
          success: false, 
          error: 'Tiempo de espera agotado al consultar Wompi' 
        })
      } else if (error.response?.status === 500) {
        return res.status(500).json({ 
          success: false, 
          error: 'Error en el servidor de Wompi' 
        })
      }
    }

    return res.status(500).json({ 
      success: false, 
      error: 'Error interno al verificar transacción' 
    })
  }
}
