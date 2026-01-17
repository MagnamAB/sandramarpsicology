import React from 'react'
import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppBubble from '../components/WhatsAppBubble'
import { motion } from 'framer-motion'

const PoliticaCookies: React.FC = () => {
  return (
    <>
      <Head>
        <title>Política de Cookies | Sandra Margarita Vargas - Psicóloga</title>
        <meta name="description" content="Política de cookies del sitio web de Sandra Margarita Vargas, Psicóloga Clínica." />
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
              Política de Cookies
            </h1>

            <div className="prose prose-lg max-w-none text-neutral-700">
              <p className="text-sm text-neutral-500 mb-8">
                Última actualización: Enero 2026
              </p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">1. ¿Qué son las Cookies?</h2>
                <p>
                  Las cookies son pequeños archivos de texto que se almacenan en su dispositivo 
                  (ordenador, tablet o móvil) cuando visita un sitio web. Permiten que el sitio 
                  recuerde sus acciones y preferencias durante un período de tiempo.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">2. Cookies que Utilizamos</h2>
                
                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">2.1 Cookies Esenciales/Técnicas</h3>
                <p>Necesarias para el funcionamiento del sitio:</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-neutral-200 mt-2">
                    <thead className="bg-neutral-100">
                      <tr>
                        <th className="border border-neutral-200 px-4 py-2 text-left">Cookie</th>
                        <th className="border border-neutral-200 px-4 py-2 text-left">Propósito</th>
                        <th className="border border-neutral-200 px-4 py-2 text-left">Duración</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-neutral-200 px-4 py-2">cita_pendiente</td>
                        <td className="border border-neutral-200 px-4 py-2">Almacena datos de cita durante proceso de pago</td>
                        <td className="border border-neutral-200 px-4 py-2">Sesión</td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-200 px-4 py-2">cookie_consent</td>
                        <td className="border border-neutral-200 px-4 py-2">Recordar preferencias de cookies</td>
                        <td className="border border-neutral-200 px-4 py-2">1 año</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-2">2.2 Cookies de Análisis (Google Analytics)</h3>
                <p>Nos ayudan a entender cómo los usuarios interactúan con el sitio:</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-neutral-200 mt-2">
                    <thead className="bg-neutral-100">
                      <tr>
                        <th className="border border-neutral-200 px-4 py-2 text-left">Cookie</th>
                        <th className="border border-neutral-200 px-4 py-2 text-left">Propósito</th>
                        <th className="border border-neutral-200 px-4 py-2 text-left">Duración</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-neutral-200 px-4 py-2">_ga</td>
                        <td className="border border-neutral-200 px-4 py-2">Distinguir usuarios únicos</td>
                        <td className="border border-neutral-200 px-4 py-2">2 años</td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-200 px-4 py-2">_ga_*</td>
                        <td className="border border-neutral-200 px-4 py-2">Mantener estado de sesión</td>
                        <td className="border border-neutral-200 px-4 py-2">2 años</td>
                      </tr>
                      <tr>
                        <td className="border border-neutral-200 px-4 py-2">_gid</td>
                        <td className="border border-neutral-200 px-4 py-2">Distinguir usuarios</td>
                        <td className="border border-neutral-200 px-4 py-2">24 horas</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-xl font-semibold text-neutral-800 mt-6 mb-2">2.3 Cookies de Terceros (Wompi - Pagos)</h3>
                <p>Utilizadas para el procesamiento seguro de pagos:</p>
                <div className="overflow-x-auto">
                  <table className="min-w-full border border-neutral-200 mt-2">
                    <thead className="bg-neutral-100">
                      <tr>
                        <th className="border border-neutral-200 px-4 py-2 text-left">Proveedor</th>
                        <th className="border border-neutral-200 px-4 py-2 text-left">Propósito</th>
                        <th className="border border-neutral-200 px-4 py-2 text-left">Más información</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-neutral-200 px-4 py-2">Wompi</td>
                        <td className="border border-neutral-200 px-4 py-2">Procesar pagos de forma segura</td>
                        <td className="border border-neutral-200 px-4 py-2">
                          <a href="https://wompi.com/es/politica-privacidad" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                            Política de Wompi
                          </a>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">3. Base Legal</h2>
                <p>
                  El uso de cookies se basa en:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Cookies esenciales:</strong> Interés legítimo para el funcionamiento del sitio</li>
                  <li><strong>Cookies de análisis:</strong> Consentimiento del usuario</li>
                  <li><strong>Cookies de terceros:</strong> Necesarias para el servicio de pago contratado</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">4. Gestionar las Cookies</h2>
                
                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">4.1 A través del Banner de Cookies</h3>
                <p>
                  Al visitar el sitio por primera vez, aparecerá un banner donde puede aceptar o 
                  rechazar las cookies no esenciales.
                </p>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">4.2 A través del Navegador</h3>
                <p>Puede configurar su navegador para gestionar cookies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    <strong>Chrome:</strong>{' '}
                    <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      Configuración de cookies
                    </a>
                  </li>
                  <li>
                    <strong>Firefox:</strong>{' '}
                    <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      Configuración de cookies
                    </a>
                  </li>
                  <li>
                    <strong>Safari:</strong>{' '}
                    <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      Configuración de cookies
                    </a>
                  </li>
                  <li>
                    <strong>Edge:</strong>{' '}
                    <a href="https://support.microsoft.com/es-es/microsoft-edge/eliminar-cookies-en-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                      Configuración de cookies
                    </a>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold text-neutral-800 mt-4 mb-2">4.3 Opt-out de Google Analytics</h3>
                <p>
                  Puede desactivar Google Analytics instalando el{' '}
                  <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">
                    complemento de inhabilitación de Google Analytics
                  </a>
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">5. Consecuencias de Desactivar Cookies</h2>
                <p>
                  Si desactiva las cookies, algunas funciones del sitio pueden no funcionar correctamente:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>El proceso de agendamiento y pago puede verse afectado</li>
                  <li>Las preferencias no se guardarán entre visitas</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">6. Transferencia Internacional</h2>
                <p>
                  Algunos proveedores de cookies (como Google) pueden transferir datos a servidores 
                  fuera de Colombia/UE. Estos proveedores cuentan con mecanismos de protección 
                  adecuados (Privacy Shield, Cláusulas Contractuales Tipo).
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">7. Actualizaciones</h2>
                <p>
                  Esta política puede ser actualizada para reflejar cambios en las cookies utilizadas. 
                  La fecha de última actualización se indica al inicio del documento.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-neutral-900 mb-4">8. Contacto</h2>
                <p>Para consultas sobre cookies:</p>
                <div className="bg-neutral-50 p-4 rounded-lg mt-2">
                  <p>Email: sandramar.v@hotmail.com</p>
                  <p>Teléfono: +57 310 698 3385</p>
                </div>
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

export default PoliticaCookies
