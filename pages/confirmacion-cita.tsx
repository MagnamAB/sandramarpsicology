import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { NextSeo } from 'next-seo'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { FaCheck, FaTimes, FaSpinner, FaCalendarAlt, FaWhatsapp } from 'react-icons/fa'
import { generateWhatsAppLink } from '../lib/api'

/**
 * Página de Confirmación de Cita con Pago
 * 
 * Esta página es donde Wompi redirige al usuario después de completar el pago.
 * 
 * Flujo:
 * 1. Wompi redirige aquí con ?id=TRANSACTION_ID
 * 2. Se verifica el estado del pago con /api/verificar-transaccion
 * 3. Si el pago es exitoso, se recuperan los datos de la cita desde localStorage
 * 4. Se envía todo a /api/agendar-con-pago para guardar la cita
 * 5. Se muestra confirmación final al usuario
 */

type EstadoConfirmacion = 'verificando' | 'procesando' | 'exitoso' | 'error' | 'rechazado'

interface DatosCita {
  nombre: string
  email: string
  telefono: string
  servicio: 'individual' | 'parejas'
  fecha: string
  hora: string // Hora Colombia
  horaLocal?: string // Hora en zona del usuario
  duracion: string
  modalidad: 'presencial' | 'virtual'
  mensaje?: string
  timezone?: string
  fechaFormateada?: string
  servicioNombre?: string
  precioFormateado?: string
  horaDisplay?: string // Hora formateada para mostrar
  zonaHorariaDisplay?: string // Texto de zona horaria
}

const ConfirmacionCita: React.FC = () => {
  const router = useRouter()
  const { id } = router.query // ID de transacción de Wompi

  const [estado, setEstado] = useState<EstadoConfirmacion>('verificando')
  const [mensaje, setMensaje] = useState<string>('Verificando tu pago...')
  const [datosCita, setDatosCita] = useState<DatosCita | null>(null)
  const [transactionId, setTransactionId] = useState<string>('')

  useEffect(() => {
    if (id && typeof id === 'string') {
      verificarYAgendar(id)
    }
  }, [id])

  const verificarYAgendar = async (transactionId: string) => {
    try {
      setEstado('verificando')
      setMensaje('Verificando tu pago con Wompi...')
      setTransactionId(transactionId)

      // Paso 1: Verificar el pago en Wompi
      console.log('Verificando transacción:', transactionId)
      
      const verificarResponse = await fetch(`/api/verificar-transaccion?id=${transactionId}`)
      const verificarData = await verificarResponse.json()

      if (!verificarData.success) {
        throw new Error(verificarData.error || 'Error al verificar el pago')
      }

      console.log('Pago verificado:', verificarData.status)

      // Verificar que el pago esté aprobado
      if (verificarData.status !== 'APPROVED') {
        if (verificarData.status === 'DECLINED') {
          setEstado('rechazado')
          setMensaje('Tu pago fue rechazado. Por favor intenta nuevamente o usa otro método de pago.')
        } else {
          setEstado('error')
          setMensaje(`Estado del pago: ${verificarData.status}. Por favor contacta con nosotros si tienes dudas.`)
        }
        return
      }

      // Paso 2: Recuperar datos de la cita desde localStorage
      setEstado('procesando')
      setMensaje('Pago confirmado. Agendando tu cita...')

      const citaPendiente = localStorage.getItem('cita_pendiente')
      
      if (!citaPendiente) {
        console.error('No se encontraron datos de la cita en localStorage')
        setEstado('error')
        setMensaje('No se encontraron los datos de tu cita. Tu pago fue procesado. Te contactaremos por email.')
        return
      }

      const citaData: DatosCita = JSON.parse(citaPendiente)
      console.log('Datos de la cita recuperados:', citaData)

      // Agregar información formateada para mostrar
      citaData.fechaFormateada = new Date(citaData.fecha).toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

      citaData.servicioNombre = citaData.servicio === 'individual' 
        ? 'Terapia Individual' 
        : 'Terapia de Parejas'

      citaData.precioFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
      }).format(verificarData.amount || 0)

      // Mostrar hora en la zona horaria del usuario
      // Usar horaLocal si está disponible, sino usar hora (Colombia)
      citaData.horaDisplay = citaData.horaLocal || citaData.hora
      
      // Determinar texto de zona horaria
      const userTimezone = citaData.timezone || 'America/Bogota'
      if (userTimezone === 'America/Bogota') {
        citaData.zonaHorariaDisplay = 'Hora Colombia'
      } else {
        // Extraer nombre legible de la zona (ej: "Europe/Berlin" → "Berlin")
        citaData.zonaHorariaDisplay = userTimezone.replace('_', ' ').split('/').pop() || userTimezone
      }

      setDatosCita(citaData)

      // Paso 3: Agendar la cita enviando todo a N8N
      const agendarResponse = await fetch('/api/agendar-con-pago', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...citaData,
          transactionId: transactionId,
          pagoReferencia: verificarData.reference,
          pagoMonto: verificarData.amount
        }),
      })

      const agendarData = await agendarResponse.json()

      if (!agendarData.success) {
        throw new Error(agendarData.message || 'Error al agendar la cita')
      }

      console.log('Cita agendada exitosamente')

      // Paso 4: Éxito - Limpiar localStorage
      localStorage.removeItem('cita_pendiente')
      
      setEstado('exitoso')
      setMensaje('¡Tu cita ha sido agendada exitosamente!')

    } catch (error) {
      console.error('Error en proceso de confirmación:', error)
      
      setEstado('error')
      if (error instanceof Error) {
        setMensaje(error.message)
      } else {
        setMensaje('Ocurrió un error inesperado. Tu pago fue procesado. Te contactaremos por email.')
      }
    }
  }

  const seoConfig = {
    title: 'Confirmación de Cita - Sandra Vargas Psicóloga',
    description: 'Confirmación de tu cita con la psicóloga Sandra Vargas',
    robots: 'noindex, nofollow' // No indexar esta página
  }

  return (
    <>
      <NextSeo {...seoConfig} />
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-neutral-50">
        <Header />
        
        <main className="pt-32 pb-20">
          <div className="container-responsive max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card text-center"
            >
              {/* Estado: Verificando */}
              {estado === 'verificando' && (
                <>
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaSpinner className="w-10 h-10 text-blue-600 animate-spin" />
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                    Verificando tu pago...
                  </h1>
                  <p className="text-neutral-600 mb-6">
                    Estamos verificando tu pago con Wompi. Por favor espera un momento.
                  </p>
                </>
              )}

              {/* Estado: Procesando */}
              {estado === 'procesando' && (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaSpinner className="w-10 h-10 text-green-600 animate-spin" />
                  </div>
                  <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                    ¡Pago Confirmado!
                  </h1>
                  <p className="text-neutral-600 mb-6">
                    Tu pago ha sido procesado exitosamente. Estamos agendando tu cita...
                  </p>
                </>
              )}

              {/* Estado: Exitoso */}
              {estado === 'exitoso' && datosCita && (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaCheck className="w-10 h-10 text-green-600" />
                  </div>
                  
                  <h1 className="text-3xl font-bold text-green-700 mb-4">
                    ¡Cita Agendada Exitosamente!
                  </h1>
                  
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 mb-6 text-left">
                    <h2 className="text-xl font-bold text-green-800 mb-4 text-center">
                      Detalles de tu Cita
                    </h2>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center border-b border-green-200 pb-2">
                        <span className="text-green-700 font-medium">Servicio:</span>
                        <span className="text-green-900 font-semibold">{datosCita.servicioNombre}</span>
                      </div>
                      
                      <div className="flex justify-between items-center border-b border-green-200 pb-2">
                        <span className="text-green-700 font-medium">Modalidad:</span>
                        <span className="text-green-900 capitalize flex items-center gap-2">
                          {datosCita.modalidad === 'presencial' ? '🏢' : '💻'}
                          {datosCita.modalidad}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center border-b border-green-200 pb-2">
                        <span className="text-green-700 font-medium">Fecha:</span>
                        <span className="text-green-900 font-semibold">{datosCita.fechaFormateada}</span>
                      </div>
                      
                      <div className="flex justify-between items-center border-b border-green-200 pb-2">
                        <span className="text-green-700 font-medium">Hora:</span>
                        <span className="text-green-900 font-semibold text-right">
                          {datosCita.horaDisplay}
                          {datosCita.zonaHorariaDisplay && (
                            <span className="block text-xs text-green-600 font-normal">
                              ({datosCita.zonaHorariaDisplay})
                            </span>
                          )}
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center border-b border-green-200 pb-2">
                        <span className="text-green-700 font-medium">Duración:</span>
                        <span className="text-green-900">{datosCita.duracion}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-green-700 font-medium">Monto Pagado:</span>
                        <span className="text-green-900 font-bold text-lg">{datosCita.precioFormateado}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
                    <h3 className="text-lg font-semibold text-blue-900 mb-3">
                      📧 Confirmación Enviada
                    </h3>
                    <p className="text-blue-800 text-sm">
                      Te hemos enviado un email a <strong>{datosCita.email}</strong> con todos los detalles de tu cita.
                    </p>
                    <p className="text-blue-700 text-xs mt-2 bg-blue-100 rounded-lg p-3">
                      <strong>¿No lo encuentras?</strong> Revisa tu carpeta de <strong>spam</strong> o <strong>correo no deseado</strong>. A veces los correos pueden llegar allí.
                    </p>
                    <p className="text-blue-800 text-sm mt-3">
                      <strong>Me pondré en contacto contigo 24 horas antes</strong> de la cita para confirmar y enviar las indicaciones específicas.
                    </p>
                  </div>

                  {datosCita.modalidad === 'presencial' && (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 mb-6 text-left">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                        📍 Ubicación del Consultorio
                      </h3>
                      <p className="text-neutral-700">
                        <strong>Carrera 13 Nº 122 – 34</strong><br />
                        Santa Bárbara, Bogotá<br />
                        (Zona Norte de Bogotá)<br />
                        <br />
                        <span className="text-sm text-neutral-600">
                          ✓ Parqueadero privado disponible
                        </span>
                      </p>
                    </div>
                  )}

                  {datosCita.modalidad === 'virtual' && (
                    <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-6 mb-6 text-left">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                        💻 Sesión Virtual
                      </h3>
                      <p className="text-neutral-700">
                        Te enviaré el enlace de la videollamada (Zoom) <strong>30 minutos antes</strong> de la sesión.
                        <br />
                        <br />
                        <span className="text-sm text-neutral-600">
                          Por favor asegúrate de tener una buena conexión a internet y un espacio tranquilo para la sesión.
                        </span>
                      </p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <a
                      href="/"
                      className="btn-primary w-full inline-flex items-center justify-center gap-2"
                    >
                      <FaCalendarAlt className="w-5 h-5" />
                      Volver al Inicio
                    </a>
                    
                    <a
                      href={generateWhatsAppLink(`Hola Dra. Sandra, estuve revisando tu página web y acabo de agendar una cita ${datosCita.modalidad} de ${datosCita.servicioNombre} para el ${datosCita.fechaFormateada}. Transacción: ${transactionId}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full inline-flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      Contactar por WhatsApp
                    </a>
                  </div>
                </>
              )}

              {/* Estado: Rechazado */}
              {estado === 'rechazado' && (
                <>
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaTimes className="w-10 h-10 text-yellow-600" />
                  </div>
                  
                  <h1 className="text-3xl font-bold text-yellow-700 mb-4">
                    Pago Rechazado
                  </h1>
                  
                  <p className="text-neutral-700 mb-6">
                    Tu pago fue rechazado por el banco o medio de pago. 
                    No te preocupes, puedes intentar nuevamente con otra tarjeta o método de pago.
                  </p>

                  <div className="space-y-4">
                    <a
                      href="/#agendar-cita"
                      className="btn-primary w-full"
                    >
                      Intentar Nuevamente
                    </a>
                    
                    <a
                      href={generateWhatsAppLink('Hola Dra. Sandra, estuve revisando tu página web e intenté agendar una cita pero tuve problemas con el pago. ¿Podría agendarla por este medio?')}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary w-full inline-flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      Contactar por WhatsApp
                    </a>
                  </div>
                </>
              )}

              {/* Estado: Error */}
              {estado === 'error' && (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaTimes className="w-10 h-10 text-red-600" />
                  </div>
                  
                  <h1 className="text-3xl font-bold text-red-700 mb-4">
                    Ocurrió un Error
                  </h1>
                  
                  <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
                    <p className="text-red-800">
                      {mensaje}
                    </p>
                  </div>

                  <p className="text-neutral-600 mb-6">
                    Si tu pago fue procesado exitosamente, te contactaremos por email a la brevedad para confirmar tu cita.
                  </p>

                  <div className="space-y-4">
                    <a
                      href={generateWhatsAppLink(`Hola Dra. Sandra, estuve revisando tu página web e intenté agendar una cita pero ocurrió un error. ID de transacción: ${transactionId}`)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary w-full inline-flex items-center justify-center gap-2"
                    >
                      <FaWhatsapp className="w-5 h-5" />
                      Contactar por WhatsApp
                    </a>
                    
                    <a
                      href="/"
                      className="btn-secondary w-full"
                    >
                      Volver al Inicio
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </main>

        <Footer />
      </div>
    </>
  )
}

export default ConfirmacionCita
