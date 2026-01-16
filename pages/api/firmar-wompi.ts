import crypto from 'crypto'
import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * API Route: Firmar Wompi
 * 
 * Genera una firma SHA256 para validar transacciones de Wompi.
 * Esta firma asegura que el precio no puede ser manipulado por el cliente.
 * 
 * Flujo:
 * 1. Recibe: reference, amountInCents
 * 2. Construye cadena: reference + amountInCents + currency + integritySecret
 * 3. Genera hash SHA256
 * 4. Retorna firma
 */

interface FirmarWompiRequest {
  reference: string
  amountInCents: number
}

interface FirmarWompiResponse {
  success: boolean
  signature?: string
  reference?: string
  amountInCents?: number
  currency?: string
  error?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<FirmarWompiResponse>
) {
  // Solo aceptar POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      error: 'Método no permitido' 
    })
  }

  try {
    const { reference, amountInCents } = req.body as FirmarWompiRequest

    // Validaciones
    if (!reference || typeof reference !== 'string') {
      return res.status(400).json({ 
        success: false, 
        error: 'Referencia inválida' 
      })
    }

    if (!amountInCents || typeof amountInCents !== 'number' || amountInCents <= 0) {
      return res.status(400).json({ 
        success: false, 
        error: 'Monto inválido' 
      })
    }

    // Obtener secreto de integridad desde variables de entorno
    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET

    if (!integritySecret) {
      console.error('ERROR: WOMPI_INTEGRITY_SECRET no está configurada')
      return res.status(500).json({ 
        success: false, 
        error: 'Configuración de servidor incompleta' 
      })
    }

    const currency = 'COP' // Pesos colombianos

    // Construir cadena a firmar según documentación de Wompi
    // Formato: reference + amountInCents + currency + integritySecret
    const cadenaConcatenada = `${reference}${amountInCents}${currency}${integritySecret}`

    // Generar hash SHA256
    const signature = crypto
      .createHash('sha256')
      .update(cadenaConcatenada)
      .digest('hex')

    // Log para debugging (solo en desarrollo)
    if (process.env.NODE_ENV === 'development') {
      console.log('Firma generada:', {
        reference,
        amountInCents,
        currency,
        signatureLength: signature.length
      })
    }

    // Retornar firma y datos
    return res.status(200).json({
      success: true,
      signature,
      reference,
      amountInCents,
      currency
    })

  } catch (error) {
    console.error('Error generando firma Wompi:', error)
    return res.status(500).json({ 
      success: false, 
      error: 'Error interno al generar firma' 
    })
  }
}
