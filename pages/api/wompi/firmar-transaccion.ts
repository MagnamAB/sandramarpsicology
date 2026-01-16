import { NextApiRequest, NextApiResponse } from 'next'
import crypto from 'crypto'

/**
 * API Route para generar la firma de integridad de Wompi
 * 
 * Esta función genera el hash SHA256 necesario para validar
 * que el monto de la transacción no fue alterado.
 * 
 * IMPORTANTE: Esta API debe ejecutarse en el servidor (backend)
 * para no exponer el secreto de integridad de Wompi.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Solo permitir método POST
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Método no permitido' 
    })
  }

  try {
    const { reference, amountInCents } = req.body

    // Validar parámetros requeridos
    if (!reference || !amountInCents) {
      return res.status(400).json({
        success: false,
        message: 'Faltan parámetros requeridos: reference y amountInCents'
      })
    }

    // Validar que amountInCents sea un número positivo
    if (typeof amountInCents !== 'number' || amountInCents <= 0) {
      return res.status(400).json({
        success: false,
        message: 'El monto debe ser un número positivo'
      })
    }

    const currency = 'COP'
    
    // Obtener el secreto de integridad desde variables de entorno
    const integritySecret = process.env.WOMPI_INTEGRITY_SECRET
    
    if (!integritySecret) {
      console.error('ERROR: WOMPI_INTEGRITY_SECRET no está configurado')
      return res.status(500).json({
        success: false,
        message: 'Error de configuración del servidor'
      })
    }

    // Construir la cadena para firmar según especificación de Wompi:
    // referencia + monto + moneda + secreto
    const stringToHash = `${reference}${amountInCents}${currency}${integritySecret}`
    
    // Generar hash SHA256
    const signature = crypto
      .createHash('sha256')
      .update(stringToHash)
      .digest('hex')

    // Log para debugging (sin exponer datos sensibles)
    console.log('Firma generada para Wompi:', {
      reference,
      amountInCents,
      currency,
      signatureLength: signature.length
    })

    // Retornar la firma y datos de la transacción
    return res.status(200).json({
      success: true,
      signature,
      reference,
      amountInCents,
      currency
    })

  } catch (error) {
    console.error('Error generando firma de Wompi:', error)
    return res.status(500).json({
      success: false,
      message: 'Error interno del servidor al generar firma'
    })
  }
}
