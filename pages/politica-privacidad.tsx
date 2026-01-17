import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppBubble from '../components/WhatsAppBubble'
import { motion } from 'framer-motion'

const PoliticaPrivacidad: React.FC = () => {
  return (
    <>
      <Head>
        <title>Política de Privacidad | Sandra Margarita Vargas - Psicóloga</title>
        <meta name="description" content="Política de privacidad y tratamiento de datos personales de Sandra Margarita Vargas, Psicóloga Clínica." />
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
              Política de Privacidad y Tratamiento de Datos Personales
            </h1>

            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="text-sm text-neutral-500 mb-8">
                Última actualización: Enero 2026
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. Responsable del Tratamiento</h2>
                <p>
                  <strong>Sandra Margarita Vargas</strong><br />
                  Psicóloga Clínica<br />
                  Tarjeta Profesional: 51641450<br />
                  Dirección: Carrera 13 Nº 122 – 34, Santa Bárbara, Bogotá, Colombia<br />
                  Correo electrónico: sandramar.v@hotmail.com<br />
                  Teléfono: +57 310 698 3385
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Marco Legal</h2>
                <p>
                  Esta política se rige por la siguiente normativa:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Ley 1581 de 2012</strong> - Régimen General de Protección de Datos Personales de Colombia</li>
                  <li><strong>Decreto 1377 de 2013</strong> - Reglamentario de la Ley 1581</li>
                  <li><strong>Ley 1266 de 2008</strong> - Habeas Data</li>
                  <li><strong>Reglamento General de Protección de Datos (RGPD)</strong> - Para usuarios de la Unión Europea</li>
                  <li><strong>Ley 1090 de 2006</strong> - Código Deontológico y Bioético del ejercicio de la Psicología</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Datos Personales Recopilados</h2>
                <p>Recopilamos los siguientes datos personales:</p>
                
                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">3.1 Datos de identificación:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Nombre completo</li>
                  <li>Correo electrónico</li>
                  <li>Número de teléfono</li>
                </ul>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">3.2 Datos de la cita:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Tipo de servicio solicitado</li>
                  <li>Modalidad de atención (presencial/virtual)</li>
                  <li>Fecha y hora de la cita</li>
                  <li>Mensaje opcional proporcionado</li>
                </ul>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">3.3 Datos de pago:</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Referencia de transacción</li>
                  <li>Estado del pago</li>
                  <li>Fecha de pago</li>
                </ul>
                <p className="mt-2 text-sm bg-blue-50 p-3 rounded-lg">
                  <strong>Nota:</strong> Los datos de tarjeta de crédito/débito son procesados exclusivamente por 
                  <strong> Wompi</strong> (pasarela de pagos certificada PCI DSS). No almacenamos datos de tarjetas 
                  en nuestros sistemas.
                </p>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">3.4 Datos sensibles:</h3>
                <p>
                  Dado que ofrecemos servicios de salud mental, durante las sesiones terapéuticas se puede 
                  generar información sobre el estado de salud mental del paciente. Estos datos son considerados 
                  <strong> datos sensibles</strong> según la Ley 1581 de 2012 y están protegidos por el 
                  <strong> secreto profesional</strong> establecido en la Ley 1090 de 2006.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Finalidades del Tratamiento</h2>
                <p>Sus datos personales serán utilizados para:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Gestionar el agendamiento de citas</li>
                  <li>Procesar pagos de servicios</li>
                  <li>Enviar confirmaciones y recordatorios de citas</li>
                  <li>Contactarle para coordinar detalles de la sesión</li>
                  <li>Cumplir con obligaciones legales y tributarias</li>
                  <li>Mejorar la calidad de nuestros servicios</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Base Legal del Tratamiento</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Consentimiento expreso:</strong> Al completar el formulario de agendamiento y aceptar esta política</li>
                  <li><strong>Ejecución de contrato:</strong> Para la prestación del servicio de psicoterapia</li>
                  <li><strong>Cumplimiento legal:</strong> Obligaciones tributarias y profesionales</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Derechos del Titular</h2>
                <p>Como titular de sus datos personales, usted tiene derecho a:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Conocer:</strong> Acceder a sus datos personales</li>
                  <li><strong>Actualizar:</strong> Rectificar datos inexactos o incompletos</li>
                  <li><strong>Suprimir:</strong> Solicitar la eliminación de sus datos (cuando aplique)</li>
                  <li><strong>Revocar:</strong> Retirar el consentimiento otorgado</li>
                  <li><strong>Oponerse:</strong> Al tratamiento para fines específicos</li>
                  <li><strong>Portabilidad:</strong> Recibir sus datos en formato estructurado</li>
                </ul>
                <p className="mt-4">
                  Para ejercer estos derechos, contacte a: <strong>sandramar.v@hotmail.com</strong>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Secreto Profesional</h2>
                <p>
                  Toda información compartida durante las sesiones de psicoterapia está protegida por el 
                  <strong> secreto profesional</strong> establecido en la Ley 1090 de 2006 (Código Deontológico 
                  del Psicólogo en Colombia). Esta información solo podrá ser revelada:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Con autorización expresa y escrita del paciente</li>
                  <li>Por orden judicial</li>
                  <li>En casos de riesgo inminente para la vida del paciente o terceros</li>
                  <li>En casos de abuso a menores de edad (obligación legal de denuncia)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Seguridad de los Datos</h2>
                <p>Implementamos medidas de seguridad técnicas y organizativas:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Encriptación SSL/TLS en todas las comunicaciones</li>
                  <li>Procesamiento de pagos mediante pasarela certificada PCI DSS (Wompi)</li>
                  <li>Acceso restringido a datos personales</li>
                  <li>Almacenamiento seguro en servidores protegidos</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">9. Transferencia de Datos</h2>
                <p>Sus datos pueden ser compartidos con:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Wompi:</strong> Procesamiento de pagos (Colombia)</li>
                  <li><strong>Google Calendar:</strong> Gestión de agenda (con medidas de protección)</li>
                  <li><strong>Vercel:</strong> Alojamiento web (servidores en EE.UU., cumple Privacy Shield)</li>
                </ul>
                <p className="mt-2">
                  No vendemos ni compartimos sus datos con terceros para fines comerciales.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">10. Conservación de Datos</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Datos de citas:</strong> 5 años (obligación legal Colombia)</li>
                  <li><strong>Datos de pago:</strong> 10 años (obligación tributaria)</li>
                  <li><strong>Historias clínicas:</strong> 15 años mínimo (Resolución 1995 de 1999)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">11. Usuarios Internacionales (RGPD)</h2>
                <p>
                  Si usted reside en la Unión Europea, además de los derechos mencionados, tiene derecho a:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Presentar una reclamación ante la autoridad de control de su país</li>
                  <li>No ser objeto de decisiones automatizadas</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">12. Menores de Edad</h2>
                <p>
                  Los servicios están dirigidos exclusivamente a <strong>adultos mayores de 18 años</strong>. 
                  No recopilamos intencionalmente datos de menores. En caso de atención a menores, se requiere 
                  autorización expresa de los padres o tutores legales.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">13. Modificaciones</h2>
                <p>
                  Esta política puede ser actualizada periódicamente. Las modificaciones serán publicadas 
                  en esta página con la fecha de actualización. El uso continuado del sitio implica la 
                  aceptación de los cambios.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">14. Contacto y Reclamaciones</h2>
                <p>Para consultas, ejercicio de derechos o reclamaciones:</p>
                <div className="bg-neutral-50 p-4 rounded-lg mt-2">
                  <p><strong>Sandra Margarita Vargas</strong></p>
                  <p>Email: sandramar.v@hotmail.com</p>
                  <p>Teléfono: +57 310 698 3385</p>
                  <p>Dirección: Carrera 13 Nº 122 – 34, Santa Bárbara, Bogotá</p>
                </div>
                <p className="mt-4">
                  También puede presentar reclamaciones ante la <strong>Superintendencia de Industria y Comercio (SIC)</strong> 
                  de Colombia: www.sic.gov.co
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

export default PoliticaPrivacidad
