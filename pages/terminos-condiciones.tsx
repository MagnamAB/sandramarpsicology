import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppBubble from '../components/WhatsAppBubble'
import { motion } from 'framer-motion'

const TerminosCondiciones: React.FC = () => {
  return (
    <>
      <Head>
        <title>Términos y Condiciones | Sandra Margarita Vargas - Psicóloga</title>
        <meta name="description" content="Términos y condiciones del servicio de psicoterapia de Sandra Margarita Vargas, Psicóloga Clínica." />
        <meta name="robots" content="noindex, follow" />
      </Head>

      <Header />

      <main className="pt-24 pb-16">
        <div className="container-responsive max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl font-bold text-neutral-900 mb-8">
              Términos y Condiciones del Servicio
            </h1>

            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="text-sm text-neutral-500 mb-8">
                Última actualización: Enero 2026
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Identificación del Profesional</h2>
                <p>
                  <strong>Sandra Margarita Vargas</strong><br />
                  Psicóloga Clínica<br />
                  Tarjeta Profesional: 51641450<br />
                  CC: 51'641.450<br />
                  Dirección: Carrera 13 Nº 122 – 34, Santa Bárbara, Bogotá, Colombia<br />
                  Correo: sandramar.v@hotmail.com<br />
                  Teléfono: +57 310 698 3385
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Descripción de los Servicios</h2>
                
                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">2.1 Servicios Ofrecidos:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Terapia Individual para Adultos:</strong> Sesiones de 75 minutos</li>
                  <li><strong>Terapia de Pareja:</strong> Sesiones de 120 minutos</li>
                </ul>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">2.2 Modalidades:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Presencial:</strong> En consultorio ubicado en Santa Bárbara, Bogotá</li>
                  <li><strong>Virtual:</strong> A través de plataforma de videollamada (Zoom)</li>
                </ul>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">2.3 Enfoque Terapéutico:</h3>
                <p>
                  Enfoque integrativo que incluye elementos de Terapia Gestalt, constelaciones familiares, 
                  y otras aproximaciones terapéuticas adaptadas a las necesidades del consultante.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Proceso de Agendamiento y Pago</h2>
                
                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">3.1 Agendamiento:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Las citas se agendan a través del sistema web o WhatsApp</li>
                  <li>La confirmación de la cita está sujeta al pago completo</li>
                  <li>Una vez confirmada, recibirá un correo electrónico y/o mensaje de WhatsApp</li>
                </ul>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">3.2 Tarifas (vigentes enero 2026):</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Terapia Individual: $330.000 COP por sesión</li>
                  <li>Terapia de Pareja: $450.000 COP por sesión</li>
                </ul>
                <p className="text-sm text-neutral-500 mt-2">
                  Las tarifas pueden ser actualizadas. El precio vigente será el mostrado al momento del agendamiento.
                </p>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">3.3 Métodos de Pago:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Tarjeta de crédito o débito (a través de Wompi)</li>
                  <li>PSE (transferencia bancaria)</li>
                  <li>Nequi</li>
                </ul>
                <p className="mt-2">
                  Los pagos son procesados de forma segura por <strong>Wompi</strong>, pasarela de pagos 
                  certificada y regulada por la Superintendencia Financiera de Colombia.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Política de Cancelación y Reembolso</h2>
                
                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">4.1 Cancelación por parte del Consultante:</h3>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Más de 48 horas antes:</strong> Reembolso del 100% o reprogramación sin costo</li>
                    <li><strong>Entre 24 y 48 horas antes:</strong> Reembolso del 50% o reprogramación</li>
                    <li><strong>Menos de 24 horas o inasistencia:</strong> No hay derecho a reembolso</li>
                  </ul>
                </div>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">4.2 Cancelación por parte de la Profesional:</h3>
                <p>
                  En caso de cancelación por parte de la psicóloga (enfermedad, emergencia), 
                  se ofrecerá reprogramación inmediata o reembolso completo del 100%.
                </p>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">4.3 Proceso de Reembolso:</h3>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Solicitar por email a sandramar.v@hotmail.com</li>
                  <li>El reembolso se procesará en un plazo de 5 a 10 días hábiles</li>
                  <li>Se realizará al mismo medio de pago utilizado</li>
                </ul>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">4.4 Derecho de Retracto:</h3>
                <p>
                  De acuerdo con el artículo 47 de la Ley 1480 de 2011 (Estatuto del Consumidor), 
                  usted tiene derecho a retractarse de la compra dentro de los 5 días hábiles 
                  siguientes a la transacción, siempre que el servicio no haya sido utilizado.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Obligaciones del Consultante</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proporcionar información veraz y actualizada</li>
                  <li>Asistir puntualmente a las citas programadas</li>
                  <li>Informar con anticipación cualquier imposibilidad de asistencia</li>
                  <li>Mantener un ambiente adecuado para sesiones virtuales (privacidad, conexión estable)</li>
                  <li>Respetar el tiempo de la sesión</li>
                  <li>No grabar las sesiones sin autorización expresa</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Obligaciones de la Profesional</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Prestar servicios con profesionalismo y ética</li>
                  <li>Mantener la confidencialidad de la información</li>
                  <li>Respetar el tiempo acordado para las sesiones</li>
                  <li>Informar sobre el proceso terapéutico</li>
                  <li>Cumplir con el Código Deontológico del Psicólogo (Ley 1090 de 2006)</li>
                  <li>Derivar a otros profesionales cuando sea necesario</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Limitaciones del Servicio</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Los servicios de psicoterapia no sustituyen atención psiquiátrica cuando sea necesaria</li>
                  <li>No se garantizan resultados específicos, ya que cada proceso es individual</li>
                  <li>Los servicios están dirigidos a adultos mayores de 18 años</li>
                  <li>En casos de emergencia psiquiátrica, se debe acudir a urgencias médicas</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Propiedad Intelectual</h2>
                <p>
                  Todo el contenido del sitio web (textos, imágenes, logotipos, diseño) es propiedad 
                  de Sandra Margarita Vargas y está protegido por las leyes de propiedad intelectual. 
                  Queda prohibida su reproducción sin autorización expresa.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Resolución de Conflictos</h2>
                <p>
                  Cualquier controversia se resolverá preferiblemente de manera amistosa. 
                  En caso de no llegar a acuerdo, se someterá a:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Mediación o conciliación ante centro autorizado</li>
                  <li>Jurisdicción de los tribunales de Bogotá, Colombia</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Legislación Aplicable</h2>
                <p>
                  Estos términos se rigen por las leyes de la República de Colombia, especialmente:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ley 1090 de 2006 - Ejercicio de la Psicología</li>
                  <li>Ley 1480 de 2011 - Estatuto del Consumidor</li>
                  <li>Ley 1581 de 2012 - Protección de Datos Personales</li>
                  <li>Ley 527 de 1999 - Comercio Electrónico</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Modificaciones</h2>
                <p>
                  Estos términos pueden ser modificados en cualquier momento. Los cambios serán 
                  publicados en esta página con la fecha de actualización. El uso continuado del 
                  servicio implica la aceptación de los nuevos términos.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">12. Contacto</h2>
                <p>Para consultas sobre estos términos:</p>
                <div className="bg-neutral-50 p-4 rounded-lg mt-2">
                  <p><strong>Sandra Margarita Vargas</strong></p>
                  <p>Email: sandramar.v@hotmail.com</p>
                  <p>Teléfono: +57 310 698 3385</p>
                  <p>WhatsApp: +57 310 698 3385</p>
                </div>
              </section>

              <section className="mb-8 bg-primary-50 p-6 rounded-xl">
                <h2 className="text-xl font-bold text-primary-900 mb-4">Aceptación de los Términos</h2>
                <p className="text-primary-800">
                  Al utilizar este sitio web y/o contratar los servicios de psicoterapia, usted declara 
                  que ha leído, comprendido y acepta estos Términos y Condiciones, así como la 
                  Política de Privacidad.
                </p>
              </section>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <WhatsAppBubble />
    </>
  )
}

export default TerminosCondiciones
