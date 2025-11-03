import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaChevronLeft, FaChevronRight, FaCheck, FaGlobe } from 'react-icons/fa'
import { 
  submitAppointmentWithAvailability, 
  getAvailableSlots,
  isValidEmail, 
  isValidColombianPhone,
  isValidInternationalPhone, 
  formatPhone, 
  type AppointmentData 
} from '../lib/api'

interface TimeSlot {
  time: string // Tiempo en zona horaria local del usuario
  available: boolean
  id: string
  endTime: string // Tiempo en zona horaria local del usuario
  bogotaTime: string // Tiempo original en zona horaria de Bogotá
  bogotaEndTime: string // Tiempo final en zona horaria de Bogotá
}

interface SelectedAppointment {
  date: Date
  time: string // Tiempo mostrado al usuario (en su zona horaria)
  service: string
  modalidad: string
  bogotaTime?: string // Tiempo interno para el backend (zona horaria de Bogotá)
}

// Configuración de horarios de la psicóloga por día de la semana
interface DaySchedule {
  startTime: string // En formato HH:MM
  endTime: string   // En formato HH:MM
  available: boolean
}

// Configuración de la psicóloga - Actualizar según necesidades
const PSICOLOGA_SCHEDULE: Record<number, DaySchedule> = {
  0: { startTime: '07:30', endTime: '00:00', available: false }, // Domingo - No disponible
  1: { startTime: '07:30', endTime: '19:30', available: true },  // Lunes
  2: { startTime: '07:30', endTime: '12:00', available: true },  // Martes  
  3: { startTime: '07:30', endTime: '19:30', available: true },  // Miércoles
  4: { startTime: '07:30', endTime: '19:30', available: true },  // Jueves
  5: { startTime: '07:30', endTime: '19:30', available: true },  // Viernes
  6: { startTime: '07:30', endTime: '12:00', available: true },  // Sábado
}

const AppointmentScheduler: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<'calendar' | 'form' | 'confirmation'>('calendar')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedModalidad, setSelectedModalidad] = useState<string>('')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [isLoading, setIsLoading] = useState(false)
  const [appointment, setAppointment] = useState<SelectedAppointment | null>(null)
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  
  // Estado para información de zona horaria
  const [userTimezone, setUserTimezone] = useState<string>('')
  const [timezoneOffset, setTimezoneOffset] = useState<number>(0)

  // Referencia para el formulario de confirmación
  const formSectionRef = useRef<HTMLDivElement>(null)

  // Datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  })

  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const services = [
    { id: 'individual', name: 'Terapia Individual', duration: '75 min', durationMinutes: 75 },
    { id: 'parejas', name: 'Terapia de Parejas', duration: '120 min', durationMinutes: 120 }
  ]

  // Detectar zona horaria del usuario al cargar el componente
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const now = new Date()
    const bogotaTime = new Date(now.toLocaleString("en-US", {timeZone: "America/Bogota"}))
    const userTime = new Date(now.toLocaleString("en-US", {timeZone: timezone}))
    const offsetHours = (userTime.getTime() - bogotaTime.getTime()) / (1000 * 60 * 60)
    
    setUserTimezone(timezone)
    setTimezoneOffset(offsetHours)
  }, [])

  // Función para convertir tiempo de Bogotá a zona horaria del usuario
  const convertBogotaToUserTime = (bogotaTime: string, date: Date): string => {
    const [hours, minutes] = bogotaTime.split(':').map(Number)
    
    // Crear fecha específica en formato ISO con zona horaria de Bogotá
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    
    // Crear string ISO para Bogotá (UTC-5)
    const bogotaISOString = `${year}-${month}-${day}T${timeStr}:00-05:00`
    const bogotaDate = new Date(bogotaISOString)
    
    // Convertir a zona horaria del usuario
    const userTimeStr = bogotaDate.toLocaleTimeString('en-GB', {
      timeZone: userTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    
    return userTimeStr
  }

  // Función para convertir tiempo del usuario a zona horaria de Bogotá (para backend)
  const convertUserTimeToBogota = (userTime: string, date: Date): string => {
    const [hours, minutes] = userTime.split(':').map(Number)
    
    // Crear fecha completa en la zona horaria del usuario usando Date constructor local
    const year = date.getFullYear()
    const month = date.getMonth() // 0-11
    const day = date.getDate()
    
    // Crear fecha en el navegador del usuario (su zona horaria local)
    const localDate = new Date(year, month, day, hours, minutes)
    
    // Convertir a zona horaria de Bogotá usando toLocaleString
    const bogotaTimeStr = localDate.toLocaleString('en-GB', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    
    return bogotaTimeStr
  }

  // Función para convertir tiempo HH:MM a minutos desde medianoche
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  // Función para convertir minutos desde medianoche a formato HH:MM
  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  // Función para generar slots de tiempo disponibles para una fecha específica
  const generateTimeSlots = async (date: Date, serviceDuration: number): Promise<TimeSlot[]> => {
    const dayOfWeek = date.getDay()
    const schedule = PSICOLOGA_SCHEDULE[dayOfWeek]
    
    // Si no hay horario disponible para ese día
    if (!schedule.available) {
      return []
    }

    // Primero generar slots teóricos basados en horarios (en tiempo de Bogotá)
    const theoreticalSlots: TimeSlot[] = []
    const startMinutes = timeToMinutes(schedule.startTime)
    const endMinutes = timeToMinutes(schedule.endTime)
    
    // Últimas horas según el tipo de cita y el día de la semana
    let lastAppointmentMinutes: number
    
    // Para martes y sábado que terminan a las 12:00 PM
    if (dayOfWeek === 2 || dayOfWeek === 6) { // Martes o Sábado
      // La última cita debe terminar antes de las 12:00 PM
      lastAppointmentMinutes = timeToMinutes('12:00') - serviceDuration
    } else {
      // Para días normales (Lun, Mié, Jue, Vie), usar las restricciones regulares
      if (serviceDuration === 75) { // Individual
        lastAppointmentMinutes = timeToMinutes('18:15') // 6:15 PM
      } else { // Pareja (120 min)
        lastAppointmentMinutes = timeToMinutes('17:30') // 5:30 PM  
      }
    }
    
    // Generar slots cada 15 minutos
    for (let currentMinutes = startMinutes; currentMinutes <= lastAppointmentMinutes; currentMinutes += 15) {
      const slotEndMinutes = currentMinutes + serviceDuration
      
      // Verificar que la cita completa quepa en el horario del día
      if (slotEndMinutes <= endMinutes) {
        const bogotaStartTime = minutesToTime(currentMinutes)
        const bogotaEndTime = minutesToTime(slotEndMinutes)
        
        // Convertir a zona horaria del usuario para mostrar
        const userStartTime = convertBogotaToUserTime(bogotaStartTime, date)
        const userEndTime = convertBogotaToUserTime(bogotaEndTime, date)
        
        theoreticalSlots.push({
          time: userStartTime, // Tiempo mostrado al usuario en su zona horaria
          endTime: userEndTime, // Tiempo mostrado al usuario en su zona horaria
          available: true, // Se verificará contra la base de datos
          id: `${bogotaStartTime}-${bogotaEndTime}`,
          bogotaTime: bogotaStartTime, // Tiempo original en Bogotá
          bogotaEndTime: bogotaEndTime // Tiempo final en Bogotá
        })
      }
    }

    // Verificar disponibilidad real consultando el API (usando tiempos de Bogotá)
    try {
      const serviceType = serviceDuration === 75 ? 'individual' : 'parejas'
      // Corregir el problema de fecha - usar formato local sin conversión UTC
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      
      console.log('DEBUG - Parámetros:', { 
        serviceDuration, 
        serviceType, 
        dateString,
        dateObject: date 
      })
      
      // Consultar slots bloqueados en la base de datos
      const response = await fetch(`/api/mongodb/check-blocked-slots`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: dateString,
          serviceType: serviceType
        })
      })
      
      const { blockedSlots = [] } = await response.json()
      
      console.log('DEBUG - Slots bloqueados recibidos:', blockedSlots)
      console.log('DEBUG - Slots teóricos generados:', theoreticalSlots.map(s => ({ bogotaTime: s.bogotaTime, bogotaEndTime: s.bogotaEndTime })))
      
      // Marcar como no disponibles solo los slots que están específicamente bloqueados
      const finalSlots = theoreticalSlots.map(slot => {
        // El backend YA calcula correctamente todos los solapamientos
        // Solo necesitamos verificar si el startTime del slot está en la lista de bloqueados
        const isBlocked = blockedSlots.some((blockedSlot: any) => 
          blockedSlot.startTime === slot.bogotaTime
        )
        
        if (isBlocked) {
          const reason = blockedSlots.find((blockedSlot: any) => blockedSlot.startTime === slot.bogotaTime)?.reason || 'unknown'
          console.log(`DEBUG - Slot ${slot.bogotaTime}-${slot.bogotaEndTime} está BLOQUEADO (${reason})`)
        }
        
        return {
          ...slot,
          available: !isBlocked // Disponible si NO está bloqueado
        }
      })

      return finalSlots
    } catch (error) {
      console.error('Error obteniendo disponibilidad real:', error)
      // En caso de error, retornar todos los slots como disponibles (fallback seguro)
      return theoreticalSlots.map(slot => ({ ...slot, available: true }))
    }
  }

  // Efecto para generar horarios cuando cambia la fecha o servicio seleccionado
  useEffect(() => {
    const loadTimeSlots = async () => {
      if (selectedDate && selectedService) {
        const service = services.find(s => s.id === selectedService)
        console.log('DEBUG - Servicio seleccionado:', { 
          selectedService, 
          service,
          durationMinutes: service?.durationMinutes 
        })
        if (service) {
          setLoadingSlots(true)
          setAvailableTimeSlots([]) // Limpiar mientras carga
          try {
            const slots = await generateTimeSlots(selectedDate, service.durationMinutes)
            setAvailableTimeSlots(slots)
            setSelectedTime('') // Limpiar hora seleccionada al cambiar fecha/servicio
          } catch (error) {
            console.error('Error cargando horarios:', error)
            setAvailableTimeSlots([])
          } finally {
            setLoadingSlots(false)
          }
        }
      } else {
        setAvailableTimeSlots([])
        setLoadingSlots(false)
      }
    }

    loadTimeSlots()
  }, [selectedDate, selectedService])

  // Generar días del calendario
  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: Array<{
      date: Date
      isCurrentMonth: boolean
      isAvailable: boolean
      isPast: boolean
      isWeekend: boolean
      isSelected: boolean
    }> = []
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate)
      date.setDate(startDate.getDate() + i)
      
      const isCurrentMonth = date.getMonth() === month
      const isPast = date < today
      const dayOfWeek = date.getDay()
      const scheduleForDay = PSICOLOGA_SCHEDULE[dayOfWeek]
      const isAvailable = isCurrentMonth && !isPast && scheduleForDay.available

      days.push({
        date,
        isCurrentMonth,
        isAvailable,
        isPast,
        isWeekend: dayOfWeek === 0, // Solo domingo es considerado no disponible
        isSelected: selectedDate ? 
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear() : false
      })
    }

    return days
  }

  const handleDateSelect = (date: Date) => {
    const dayOfWeek = date.getDay()
    const schedule = PSICOLOGA_SCHEDULE[dayOfWeek]
    
    console.log('DEBUG - Fecha seleccionada:', {
      fechaCompleta: date,
      fechaLocal: date.toLocaleDateString(),
      fechaISO: date.toISOString(),
      dayOfWeek,
      dayName: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'][dayOfWeek]
    })
    
    if (date >= new Date() && schedule.available) {
      setSelectedDate(date)
      setSelectedTime('')
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    // Limpiar hora seleccionada al cambiar servicio
    setSelectedTime('')
  }

  const handleModalidadSelect = (modalidad: string) => {
    setSelectedModalidad(modalidad)
  }

  const proceedToForm = () => {
    if (selectedDate && selectedTime && selectedService && selectedModalidad) {
      // Encontrar el slot seleccionado para obtener el tiempo de Bogotá
      const selectedSlot = availableTimeSlots.find(slot => slot.time === selectedTime)
      
      // Debug: verificar si el slot tiene bogotaTime
      console.log('DEBUG - Slot seleccionado:', selectedSlot)
      console.log('DEBUG - selectedTime:', selectedTime)
      console.log('DEBUG - bogotaTime del slot:', selectedSlot?.bogotaTime)
      
      // Si no hay bogotaTime en el slot, convertir el tiempo del usuario a Bogotá
      const finalBogotaTime = selectedSlot?.bogotaTime || convertUserTimeToBogota(selectedTime, selectedDate)
      
      console.log('DEBUG - Tiempo final para Bogotá:', finalBogotaTime)
      
      setAppointment({
        date: selectedDate,
        time: selectedTime, // Tiempo mostrado al usuario (en su zona horaria)
        service: selectedService,
        modalidad: selectedModalidad,
        bogotaTime: finalBogotaTime // Tiempo interno (Bogotá)
      })
      setCurrentStep('form')
    }
  }

  // useEffect para manejar el scroll cuando cambia al formulario
  useEffect(() => {
    if (currentStep === 'form') {
      // Delay para asegurar que la animación termine
      setTimeout(() => {
        // Buscar el elemento del AppointmentScheduler
        const schedulerElement = document.getElementById('appointment-scheduler');
        
        if (schedulerElement) {
          // Scroll al inicio del scheduler con offset
          const yOffset = -50;
          const y = schedulerElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
          
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          });
          
          console.log('Scroll ejecutado hacia AppointmentScheduler'); // Debug
        } else {
          console.log('No se encontró el elemento appointment-scheduler'); // Debug
          
          // Fallback: scroll hacia arriba un poco para asegurar visibilidad
          window.scrollBy({
            top: -200,
            behavior: 'smooth'
          });
        }
      }, 600); // Más tiempo para la animación
    }
  }, [currentStep])

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!appointment) return

    setIsLoading(true)
    setSubmitStatus({ type: null, message: '' })

    // Validaciones
    if (!isValidEmail(formData.email)) {
      setSubmitStatus({
        type: 'error',
        message: 'Por favor ingresa un email válido'
      })
      setIsLoading(false)
      return
    }

    // Validar teléfono según modalidad
    if (appointment.modalidad === 'presencial') {
      // Para citas presenciales, validar que sea número colombiano
      if (!isValidColombianPhone(formData.telefono)) {
        setSubmitStatus({
          type: 'error',
          message: 'Por favor ingresa un número de teléfono colombiano válido (ej: +573XXXXXXXXX)'
        })
        setIsLoading(false)
        return
      }
    } else {
      // Para citas virtuales, aceptar números internacionales
      if (!isValidInternationalPhone(formData.telefono) && !isValidColombianPhone(formData.telefono)) {
        setSubmitStatus({
          type: 'error',
          message: 'Por favor ingresa un número de teléfono válido con indicador internacional (ej: +34XXXXXXXXX)'
        })
        setIsLoading(false)
        return
      }
    }

    try {
      const appointmentData: AppointmentData = {
        ...formData,
        telefono: formatPhone(formData.telefono),
        fecha: `${appointment.date.getFullYear()}-${String(appointment.date.getMonth() + 1).padStart(2, '0')}-${String(appointment.date.getDate()).padStart(2, '0')}`,
        hora: appointment.bogotaTime || appointment.time, // Usar tiempo de Bogotá para el backend
        servicio: appointment.service,
        duracion: services.find(s => s.id === appointment.service)?.duration || '75 min',
        modalidad: appointment.modalidad
      }

      // Debug: verificar datos antes de enviar
      console.log('DEBUG - Datos de la cita a enviar:', {
        fechaOriginal: appointment.date,
        fechaEnviada: appointmentData.fecha,
        horaUsuario: appointment.time,
        horaBogota: appointmentData.hora,
        telefonoOriginal: formData.telefono,
        telefonoFormateado: appointmentData.telefono,
        modalidad: appointmentData.modalidad
      })

      const result = await submitAppointmentWithAvailability(appointmentData)

      if (result.success) {
        setCurrentStep('confirmation')
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message
        })
      }
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Error inesperado. Por favor contacta directamente por WhatsApp.'
      })
    }

    setIsLoading(false)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ]

  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  return (
    <div className="max-w-4xl mx-auto" id="appointment-scheduler">
      <AnimatePresence mode="wait">
        {currentStep === 'calendar' && (
          <motion.div
            key="calendar"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Selecciona tu fecha y hora
              </h3>
              <p className="text-neutral-600">
                Elige el día y horario que mejor se adapte a tus necesidades
              </p>
            </div>

            {/* Selector de Servicio */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-neutral-900 mb-4">1. Tipo de sesión</h4>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                {services.map((service) => (
                  <button
                    key={service.id}
                    onClick={() => handleServiceSelect(service.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-all duration-200 ${
                      selectedService === service.id
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 hover:border-primary-300 text-neutral-700'
                    }`}
                  >
                    <div className="font-semibold">{service.name}</div>
                    <div className="text-sm opacity-75">{service.duration}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selector de Modalidad */}
            {selectedService && (
              <div className="mb-8">
                <h4 className="text-lg font-semibold text-neutral-900 mb-4">2. Modalidad</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => handleModalidadSelect('presencial')}
                    className={`p-6 border-2 rounded-lg text-center transition-all duration-200 ${
                      selectedModalidad === 'presencial'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 hover:border-primary-300 text-neutral-700'
                    }`}
                  >
                    <div className="text-3xl mb-3">🏢</div>
                    <div className="font-semibold text-lg mb-2">Presencial</div>
                    <div className="text-sm opacity-75">
                      En el consultorio<br />
                      Carrera 13 Nº 122 – 34, Santa Bárbara
                    </div>
                  </button>
                  
                  <button
                    onClick={() => handleModalidadSelect('virtual')}
                    className={`p-6 border-2 rounded-lg text-center transition-all duration-200 ${
                      selectedModalidad === 'virtual'
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-neutral-200 hover:border-primary-300 text-neutral-700'
                    }`}
                  >
                    <div className="text-3xl mb-3">💻</div>
                    <div className="font-semibold text-lg mb-2">Virtual</div>
                    <div className="text-sm opacity-75">
                      Por videollamada<br />
                      Desde la comodidad de tu hogar
                    </div>
                  </button>
                </div>
              </div>
            )}

            {selectedService && selectedModalidad && (
              <>
                {/* Calendario */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-neutral-900 mb-4">3. Fecha</h4>
                  
                  {/* Header del calendario */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <FaChevronLeft className="w-4 h-4" />
                    </button>
                    <h5 className="text-lg font-semibold">
                      {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                    </h5>
                    <button
                      onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                      className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                    >
                      <FaChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Días de la semana */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {dayNames.map((day) => (
                      <div key={day} className="p-2 text-center text-sm font-medium text-neutral-500">
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Días del calendario */}
                  <div className="grid grid-cols-7 gap-1">
                    {generateCalendarDays().map((day, index) => (
                      <button
                        key={index}
                        onClick={() => handleDateSelect(day.date)}
                        disabled={!day.isAvailable}
                        className={`p-3 text-sm rounded-lg transition-all duration-200 ${
                          day.isSelected
                            ? 'bg-primary-600 text-white'
                            : day.isAvailable
                            ? 'hover:bg-primary-100 text-neutral-900'
                            : 'text-neutral-300 cursor-not-allowed'
                        } ${!day.isCurrentMonth ? 'opacity-30' : ''}`}
                      >
                        {day.date.getDate()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Horarios */}
                {selectedDate && (
                  <div className="mb-8">
                    <h4 className="text-lg font-semibold text-neutral-900 mb-4">
                      4. Horario
                      {selectedService && (
                        <span className="text-sm font-normal text-neutral-600 ml-2">
                          (Duración: {services.find(s => s.id === selectedService)?.duration})
                        </span>
                      )}
                    </h4>
                    
                    {/* Información del día y zona horaria */}
                    {selectedDate && (
                      <div className="mb-4 space-y-2">
                        <div className="p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>
                              {selectedDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
                            </strong>
                            {(() => {
                              const dayOfWeek = selectedDate.getDay()
                              const schedule = PSICOLOGA_SCHEDULE[dayOfWeek]
                              return schedule.available ? (
                                <span className="ml-2">
                                  • Horarios disponibles: {schedule.startTime} - {schedule.endTime} (Colombia)
                                </span>
                              ) : null
                            })()}
                          </p>
                        </div>
                        
                        {userTimezone && userTimezone !== 'America/Bogota' && (
                          <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                            <p className="text-sm text-green-700 flex items-center gap-2">
                              <FaGlobe className="w-4 h-4" />
                              <span>
                                <strong>Los horarios se muestran en tu zona horaria:</strong> {userTimezone.replace('_', ' ')}
                                <br />
                                <span className="text-xs opacity-75">
                                  Al agendar, se convertirán automáticamente al horario de Colombia
                                </span>
                              </span>
                            </p>
                          </div>
                        )}
                      </div>
                    )}

                    {loadingSlots ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center gap-2 text-neutral-600">
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-primary-600"></div>
                          Cargando horarios disponibles...
                        </div>
                      </div>
                    ) : availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {availableTimeSlots.map((slot) => (
                        <button
                          key={slot.id}
                          onClick={() => handleTimeSelect(slot.time)}
                          disabled={!slot.available}
                          className={`p-3 border-2 rounded-lg text-center transition-all duration-200 ${
                            selectedTime === slot.time
                              ? 'border-primary-500 bg-primary-50 text-primary-700'
                              : slot.available
                                ? 'border-neutral-200 hover:border-primary-300 text-neutral-700 hover:bg-neutral-50'
                                : 'border-neutral-100 bg-neutral-50 text-neutral-400 cursor-not-allowed opacity-60'
                          }`}
                        >
                          <FaClock className="w-4 h-4 mx-auto mb-1" />
                            <div className="font-semibold">{slot.time}</div>
                            <div className="text-xs opacity-75">a {slot.endTime}</div>
                            {!slot.available && (
                              <div className="text-xs text-red-500 mt-1">Ocupado</div>
                            )}
                        </button>
                      ))}
                    </div>
                    ) : (
                      <div className="text-center py-8">
                        <div className="text-neutral-500">
                          {selectedDate && !PSICOLOGA_SCHEDULE[selectedDate.getDay()].available 
                            ? 'No hay horarios disponibles para este día' 
                            : selectedDate && selectedService
                            ? 'No hay horarios disponibles para esta fecha. Por favor selecciona otro día.'
                            : 'Selecciona un tipo de sesión para ver horarios disponibles'}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Botón Continuar */}
                {selectedDate && selectedTime && selectedService && selectedModalidad && (
                  <div className="text-center">
                    <button
                      onClick={proceedToForm}
                      className="btn-primary px-8 py-3"
                    >
                      Continuar con mis datos
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}

        {currentStep === 'form' && appointment && (
          <motion.div
            key="form"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="card"
            ref={formSectionRef}
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-neutral-900 mb-2">
                Confirma tu cita
              </h3>
              <div className="bg-primary-50 p-4 rounded-lg">
                <p className="text-primary-800">
                  <strong>{services.find(s => s.id === appointment.service)?.name}</strong><br />
                  <span className="inline-flex items-center gap-2 mt-1">
                    {appointment.modalidad === 'presencial' ? '🏢' : '💻'}
                    <span className="capitalize">{appointment.modalidad}</span>
                  </span><br />
                  {appointment.date.toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} 
                  <br />
                  <strong>Horario:</strong> {appointment.time} - {(() => {
                    const service = services.find(s => s.id === appointment.service)
                    if (service) {
                      const startMinutes = timeToMinutes(appointment.time)
                      const endMinutes = startMinutes + service.durationMinutes
                      return minutesToTime(endMinutes)
                    }
                    return ''
                  })()}
                  <span className="text-sm opacity-75 ml-1">
                    ({services.find(s => s.id === appointment.service)?.duration})
                  </span>
                </p>
              </div>
            </div>

            {submitStatus.type && (
              <div className={`mb-6 p-4 rounded-lg ${
                submitStatus.type === 'success' 
                  ? 'bg-green-100 text-green-800 border border-green-200' 
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}>
                {submitStatus.message}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-neutral-700 mb-2">
                  <FaUser className="inline w-4 h-4 mr-2" />
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  value={formData.nombre}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                  <FaEnvelope className="inline w-4 h-4 mr-2" />
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-neutral-700 mb-2">
                  <FaPhone className="inline w-4 h-4 mr-2" />
                  Teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  required
                  value={formData.telefono}
                  onChange={handleFormChange}
                  placeholder={
                    appointment?.modalidad === 'presencial' 
                      ? "Ej: +573106983385" 
                      : "Ej: +34665388685 (con indicador internacional)"
                  }
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  disabled={isLoading}
                />
                {appointment?.modalidad === 'virtual' && (
                  <p className="text-xs text-neutral-500 mt-1">
                    📱 Para citas virtuales, incluye el indicador de tu país (ej: +34 para España, +52 para México)
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-neutral-700 mb-2">
                  Mensaje adicional (opcional)
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={3}
                  value={formData.mensaje}
                  onChange={handleFormChange}
                  className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="¿Hay algo específico que te gustaría trabajar en la sesión?"
                  disabled={isLoading}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setCurrentStep('calendar')}
                  className="flex-1 btn-secondary py-3"
                  disabled={isLoading}
                >
                  Volver
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isLoading
                      ? 'bg-neutral-400 text-neutral-600 cursor-not-allowed'
                      : 'btn-primary'
                  }`}
                >
                  {isLoading ? 'Agendando...' : 'Confirmar Cita'}
                </button>
              </div>
            </form>
          </motion.div>
        )}

        {currentStep === 'confirmation' && appointment && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="card text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FaCheck className="w-8 h-8 text-green-600" />
            </div>
            
            <h3 className="text-2xl font-bold text-neutral-900 mb-4">
              ¡Cita Agendada Exitosamente!
            </h3>
            
            <div className="bg-green-50 p-6 rounded-lg mb-6">
              <p className="text-green-800 mb-2">
                <strong>{services.find(s => s.id === appointment.service)?.name}</strong>
              </p>
              <p className="text-green-700 mb-2">
                <span className="inline-flex items-center gap-2">
                  {appointment.modalidad === 'presencial' ? '🏢' : '💻'}
                  <span className="capitalize font-medium">{appointment.modalidad}</span>
                </span>
              </p>
              <p className="text-green-700">
                {appointment.date.toLocaleDateString('es-CO', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })} 
                <br />
                <strong>Horario:</strong> {appointment.time} - {(() => {
                  const service = services.find(s => s.id === appointment.service)
                  if (service) {
                    const startMinutes = timeToMinutes(appointment.time)
                    const endMinutes = startMinutes + service.durationMinutes
                    return minutesToTime(endMinutes)
                  }
                  return ''
                })()}
                <span className="text-sm opacity-75 ml-1">
                  ({services.find(s => s.id === appointment.service)?.duration})
                </span>
              </p>
            </div>

            <p className="text-neutral-600 mb-8">
              Te he enviado una confirmación por email con todos los detalles. 
              Me pondré en contacto contigo 24 horas antes de la cita para confirmar.
            </p>

            <div className="space-y-3">
              <button 
                onClick={() => {
                  setCurrentStep('calendar')
                  setSelectedDate(null)
                  setSelectedTime('')
                  setSelectedService('')
                  setSelectedModalidad('')
                  setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
                  setAppointment(null)
                }}
                className="btn-primary w-full"
              >
                Agendar otra cita
              </button>
              <p className="text-sm text-neutral-500">
                Si necesitas modificar o cancelar, contáctame por WhatsApp
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AppointmentScheduler 