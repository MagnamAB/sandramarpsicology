import React, { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FaCalendarAlt, FaClock, FaUser, FaEnvelope, FaPhone, FaChevronLeft, 
  FaChevronRight, FaCheck, FaGlobe, FaCreditCard, FaTimes, FaUserFriends,
  FaMapMarkerAlt, FaVideo, FaArrowRight, FaArrowLeft, FaLock
} from 'react-icons/fa'
import { 
  isValidEmail, 
  isValidColombianPhone,
  isValidInternationalPhone, 
  formatPhone, 
  type AppointmentData 
} from '../lib/api'

// Declaración global para el Widget de Wompi
declare global {
  interface Window {
    WidgetCheckout: any
  }
}

interface TimeSlot {
  time: string
  available: boolean
  id: string
  endTime: string
  bogotaTime: string
  bogotaEndTime: string
}

interface SelectedAppointment {
  date: Date
  time: string
  service: string
  modalidad: string
  bogotaTime?: string
}

interface TimeRange {
  start: string
  end: string
}

interface DaySchedule {
  ranges: TimeRange[]
  available: boolean
}

// Configuración de horarios de la psicóloga
// Martes y Sábado: 7:30 AM - 12:00 PM (sin almuerzo)
// Otros días: 7:30 AM - 1:00 PM, luego 3:00 PM - 7:30 PM (con almuerzo)
const PSICOLOGA_SCHEDULE: Record<number, DaySchedule> = {
  0: { ranges: [], available: false }, // Domingo - No disponible
  1: { ranges: [{ start: '07:30', end: '13:00' }, { start: '15:00', end: '19:30' }], available: true },  // Lunes
  2: { ranges: [{ start: '07:30', end: '12:00' }], available: true },  // Martes
  3: { ranges: [{ start: '07:30', end: '13:00' }, { start: '15:00', end: '19:30' }], available: true },  // Miércoles
  4: { ranges: [{ start: '07:30', end: '13:00' }, { start: '15:00', end: '19:30' }], available: true },  // Jueves
  5: { ranges: [{ start: '07:30', end: '13:00' }, { start: '15:00', end: '19:30' }], available: true },  // Viernes
  6: { ranges: [{ start: '07:30', end: '12:00' }], available: true },  // Sábado
}

interface AppointmentSchedulerModalProps {
  isOpen: boolean
  onClose: () => void
  isVisible?: boolean
  onHide?: () => void
  onShow?: () => void
}

const AppointmentSchedulerModal: React.FC<AppointmentSchedulerModalProps> = ({ 
  isOpen, 
  onClose, 
  isVisible = true,
  onHide,
  onShow 
}) => {
  // Estado del paso actual (1-5)
  const [currentStep, setCurrentStep] = useState(1)
  
  // Estados de selección
  const [selectedService, setSelectedService] = useState<string>('')
  const [selectedModalidad, setSelectedModalidad] = useState<string>('')
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [currentMonth, setCurrentMonth] = useState(new Date())
  
  // Estados de carga y disponibilidad
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  // Zona horaria
  const [userTimezone, setUserTimezone] = useState<string>('')
  
  // Datos del formulario
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: ''
  })
  
  // Consentimiento de políticas
  const [acceptedTerms, setAcceptedTerms] = useState(false)
  
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  // Servicios con precios - NO MODIFICAR
  const services = [
    { 
      id: 'individual', 
      name: 'Terapia Individual', 
      duration: '75 min', 
      durationMinutes: 75,
      precio: parseInt(process.env.NEXT_PUBLIC_PRECIO_INDIVIDUAL || '150000'),
      description: 'Sesión individual para adultos',
      icon: FaUser
    },
    { 
      id: 'parejas', 
      name: 'Terapia de Parejas', 
      duration: '120 min', 
      durationMinutes: 120,
      precio: parseInt(process.env.NEXT_PUBLIC_PRECIO_PAREJAS || '200000'),
      description: 'Sesión para parejas',
      icon: FaUserFriends
    }
  ]

  const steps = [
    { number: 1, title: 'Servicio', icon: FaUser },
    { number: 2, title: 'Modalidad', icon: FaMapMarkerAlt },
    { number: 3, title: 'Fecha', icon: FaCalendarAlt },
    { number: 4, title: 'Horario', icon: FaClock },
    { number: 5, title: 'Datos', icon: FaCreditCard }
  ]

  // Detectar zona horaria
  useEffect(() => {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    setUserTimezone(timezone)
  }, [])

  // Reset al cerrar
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentStep(1)
        setSelectedService('')
        setSelectedModalidad('')
        setSelectedDate(null)
        setSelectedTime('')
        setFormData({ nombre: '', email: '', telefono: '', mensaje: '' })
        setAcceptedTerms(false)
        setSubmitStatus({ type: null, message: '' })
      }, 300)
    }
  }, [isOpen])

  // ============= FUNCIONES DE TIEMPO - NO MODIFICAR =============
  
  const timeToMinutes = (time: string): number => {
    const [hours, minutes] = time.split(':').map(Number)
    return hours * 60 + minutes
  }

  const minutesToTime = (minutes: number): string => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
  }

  const convertBogotaToUserTime = useCallback((bogotaTime: string, date: Date): string => {
    const [hours, minutes] = bogotaTime.split(':').map(Number)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
    const bogotaISOString = `${year}-${month}-${day}T${timeStr}:00-05:00`
    const bogotaDate = new Date(bogotaISOString)
    
    const userTimeStr = bogotaDate.toLocaleTimeString('en-GB', {
      timeZone: userTimezone || Intl.DateTimeFormat().resolvedOptions().timeZone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    
    return userTimeStr
  }, [userTimezone])

  const convertUserTimeToBogota = (userTime: string, date: Date): string => {
    const [hours, minutes] = userTime.split(':').map(Number)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    const localDate = new Date(year, month, day, hours, minutes)
    
    const bogotaTimeStr = localDate.toLocaleString('en-GB', {
      timeZone: 'America/Bogota',
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    })
    
    return bogotaTimeStr
  }

  // ============= GENERACIÓN DE SLOTS - NO MODIFICAR =============

  const generateTimeSlots = useCallback(async (date: Date, serviceDuration: number): Promise<TimeSlot[]> => {
    const dayOfWeek = date.getDay()
    const schedule = PSICOLOGA_SCHEDULE[dayOfWeek]
    
    if (!schedule.available || schedule.ranges.length === 0) return []

    const theoreticalSlots: TimeSlot[] = []
    
    // Iterar sobre cada rango de horario del día
    for (const range of schedule.ranges) {
      const rangeStartMinutes = timeToMinutes(range.start)
      const rangeEndMinutes = timeToMinutes(range.end)
      
      // Calcular última cita posible para este rango
      // La cita debe TERMINAR antes o igual al fin del rango
      const lastAppointmentMinutes = rangeEndMinutes - serviceDuration
      
      // Generar slots cada 15 minutos dentro del rango
      for (let currentMinutes = rangeStartMinutes; currentMinutes <= lastAppointmentMinutes; currentMinutes += 15) {
        const slotEndMinutes = currentMinutes + serviceDuration
        
        // Verificar que la cita completa cabe en el rango
        if (slotEndMinutes <= rangeEndMinutes) {
          const bogotaStartTime = minutesToTime(currentMinutes)
          const bogotaEndTime = minutesToTime(slotEndMinutes)
          const userStartTime = convertBogotaToUserTime(bogotaStartTime, date)
          const userEndTime = convertBogotaToUserTime(bogotaEndTime, date)
          
          theoreticalSlots.push({
            time: userStartTime,
            endTime: userEndTime,
            available: true,
            id: `${bogotaStartTime}-${bogotaEndTime}`,
            bogotaTime: bogotaStartTime,
            bogotaEndTime: bogotaEndTime
          })
        }
      }
    }

    try {
      const serviceType = serviceDuration === 75 ? 'individual' : 'parejas'
      const dateString = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      
      const response = await fetch(`/api/mongodb/check-blocked-slots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date: dateString, serviceType })
      })
      
      const { blockedSlots = [] } = await response.json()
      
      return theoreticalSlots.map(slot => {
        const isBlocked = blockedSlots.some((blockedSlot: any) => 
          blockedSlot.startTime === slot.bogotaTime
        )
        return { ...slot, available: !isBlocked }
      })
    } catch (error) {
      console.error('Error obteniendo disponibilidad:', error)
      return theoreticalSlots.map(slot => ({ ...slot, available: true }))
    }
  }, [convertBogotaToUserTime])

  // Cargar slots cuando cambia fecha/servicio
  useEffect(() => {
    const loadTimeSlots = async () => {
      if (selectedDate && selectedService) {
        const service = services.find(s => s.id === selectedService)
        if (service) {
          setLoadingSlots(true)
          setAvailableTimeSlots([])
          try {
            const slots = await generateTimeSlots(selectedDate, service.durationMinutes)
            setAvailableTimeSlots(slots)
            setSelectedTime('')
          } catch (error) {
            console.error('Error cargando horarios:', error)
            setAvailableTimeSlots([])
          } finally {
            setLoadingSlots(false)
          }
        }
      }
    }
    loadTimeSlots()
  }, [selectedDate, selectedService, generateTimeSlots])

  // ============= CALENDARIO - NO MODIFICAR =============

  const generateCalendarDays = () => {
    const year = currentMonth.getFullYear()
    const month = currentMonth.getMonth()
    const firstDay = new Date(year, month, 1)
    const startDate = new Date(firstDay)
    startDate.setDate(startDate.getDate() - firstDay.getDay())

    const days: Array<{
      date: Date
      isCurrentMonth: boolean
      isAvailable: boolean
      isPast: boolean
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
        isSelected: selectedDate ? 
          date.getDate() === selectedDate.getDate() &&
          date.getMonth() === selectedDate.getMonth() &&
          date.getFullYear() === selectedDate.getFullYear() : false
      })
    }

    return days
  }

  const monthNames = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
  const dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

  // ============= HANDLERS =============

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId)
    setSelectedTime('')
    setCurrentStep(2)
  }

  const handleModalidadSelect = (modalidad: string) => {
    setSelectedModalidad(modalidad)
    setCurrentStep(3)
  }

  const handleDateSelect = (date: Date) => {
    const schedule = PSICOLOGA_SCHEDULE[date.getDay()]
    if (date >= new Date() && schedule.available) {
      setSelectedDate(date)
      setSelectedTime('')
      setCurrentStep(4)
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time)
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const goToStep = (step: number) => {
    if (step < currentStep) setCurrentStep(step)
    else if (step === 2 && selectedService) setCurrentStep(2)
    else if (step === 3 && selectedModalidad) setCurrentStep(3)
    else if (step === 4 && selectedDate) setCurrentStep(4)
    else if (step === 5 && selectedTime) setCurrentStep(5)
  }

  const proceedToPayment = () => {
    if (selectedDate && selectedTime && selectedService && selectedModalidad) {
      const selectedSlot = availableTimeSlots.find(slot => slot.time === selectedTime)
      const finalBogotaTime = selectedSlot?.bogotaTime || convertUserTimeToBogota(selectedTime, selectedDate)
      setCurrentStep(5)
    }
  }

  // ============= SUBMIT CON WOMPI - NO MODIFICAR LÓGICA =============

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedDate || !selectedTime || !selectedService || !selectedModalidad) return

    setIsLoading(true)
    setSubmitStatus({ type: null, message: '' })

    // Validaciones
    if (!acceptedTerms) {
      setSubmitStatus({ type: 'error', message: 'Debes aceptar los términos y condiciones y la política de privacidad para continuar.' })
      setIsLoading(false)
      return
    }

    if (!isValidEmail(formData.email)) {
      setSubmitStatus({ type: 'error', message: 'Por favor ingresa un email válido' })
      setIsLoading(false)
      return
    }

    if (selectedModalidad === 'presencial') {
      if (!isValidColombianPhone(formData.telefono)) {
        setSubmitStatus({ type: 'error', message: 'Por favor ingresa un número de teléfono colombiano válido (ej: +573XXXXXXXXX)' })
        setIsLoading(false)
        return
      }
    } else {
      if (!isValidInternationalPhone(formData.telefono) && !isValidColombianPhone(formData.telefono)) {
        setSubmitStatus({ type: 'error', message: 'Por favor ingresa un número de teléfono válido con indicador internacional' })
        setIsLoading(false)
        return
      }
    }

    try {
      const selectedSlot = availableTimeSlots.find(slot => slot.time === selectedTime)
      const finalBogotaTime = selectedSlot?.bogotaTime || convertUserTimeToBogota(selectedTime, selectedDate)
      
      // La hora local del usuario es la que seleccionó en el modal (selectedTime)
      // La hora Bogotá es la convertida para N8N/MongoDB
      const appointmentData: AppointmentData = {
        ...formData,
        telefono: formatPhone(formData.telefono),
        fecha: `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}`,
        hora: finalBogotaTime, // Hora Colombia para N8N/MongoDB
        horaLocal: selectedTime, // Hora que el usuario seleccionó (su zona horaria)
        servicio: selectedService,
        duracion: services.find(s => s.id === selectedService)?.duration || '75 min',
        modalidad: selectedModalidad,
        timezone: userTimezone // Zona horaria del usuario para el email de confirmación
      }

      localStorage.setItem('cita_pendiente', JSON.stringify(appointmentData))

      const service = services.find(s => s.id === selectedService)
      if (!service) throw new Error('Servicio no encontrado')

      const precioEnCentavos = service.precio * 100
      const referencia = `CITA-${Date.now()}-${selectedService.toUpperCase()}`

      const firmaResponse = await fetch('/api/firmar-wompi', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reference: referencia, amountInCents: precioEnCentavos }),
      })

      if (!firmaResponse.ok) throw new Error('Error al generar firma de pago')

      const { signature } = await firmaResponse.json()

      if (typeof window.WidgetCheckout === 'undefined') {
        throw new Error('Widget de Wompi no está disponible. Por favor recarga la página.')
      }

      // Ocultar el modal para que el widget de Wompi sea visible
      if (onHide) onHide()

      const checkout = new window.WidgetCheckout({
        currency: 'COP',
        amountInCents: precioEnCentavos,
        reference: referencia,
        publicKey: process.env.NEXT_PUBLIC_WOMPI_PUBLIC_KEY || 'pub_prod_Nmluj5t0JTW6R27aezi121tlem0N41xt',
        signature: { integrity: signature },
        redirectUrl: process.env.NEXT_PUBLIC_REDIRECT_URL || 'http://localhost:3000/confirmacion-cita',
        customerData: {
          email: appointmentData.email,
          fullName: appointmentData.nombre,
          phoneNumber: appointmentData.telefono.replace(/\+/g, ''),
          phoneNumberPrefix: '+57'
        }
      })

      checkout.open((result: any) => {
        console.log('Widget cerrado:', result.transaction)
        
        // Si el pago fue exitoso, redirigir a la página de confirmación
        if (result.transaction && result.transaction.status === 'APPROVED') {
          console.log('Pago exitoso, redirigiendo a confirmación...')
          // Redirigir con el ID de la transacción
          window.location.href = `/confirmacion-cita?id=${result.transaction.id}`
        } else {
          // Si el usuario cierra el widget sin completar el pago, mostrar el modal de nuevo
          if (onShow) onShow()
        }
      })

      setIsLoading(false)

    } catch (error) {
      console.error('Error al procesar pago:', error)
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Error al procesar el pago.'
      })
      setIsLoading(false)
    }
  }

  // Obtener servicio y precio actual
  const currentService = services.find(s => s.id === selectedService)

  // Formatear precio
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price)
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <div className={isVisible ? '' : 'hidden'}>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 sm:inset-2 md:inset-4 lg:inset-8 xl:inset-16 bg-white sm:rounded-2xl shadow-2xl z-[101] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between flex-shrink-0">
              <div>
                <h2 className="text-lg sm:text-xl font-bold">Agendar Cita</h2>
                <p className="text-primary-100 text-xs sm:text-sm">Psicóloga Sandra Vargas</p>
              </div>
              <button
                onClick={onClose}
                className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              >
                <FaTimes className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Stepper */}
            <div className="bg-neutral-50 border-b px-3 sm:px-6 py-3 sm:py-4 flex-shrink-0">
              <div className="flex items-center justify-between max-w-2xl mx-auto">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = currentStep === step.number
                  const isCompleted = currentStep > step.number
                  const isClickable = step.number < currentStep || 
                    (step.number === 2 && selectedService) ||
                    (step.number === 3 && selectedModalidad) ||
                    (step.number === 4 && selectedDate) ||
                    (step.number === 5 && selectedTime)
                  
                  return (
                    <React.Fragment key={step.number}>
                      <button
                        onClick={() => isClickable && goToStep(step.number)}
                        disabled={!isClickable}
                        className={`flex flex-col items-center gap-0.5 sm:gap-1 transition-all ${
                          isClickable ? 'cursor-pointer' : 'cursor-default'
                        }`}
                      >
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all ${
                          isCompleted ? 'bg-green-500 text-white' :
                          isActive ? 'bg-primary-600 text-white ring-2 sm:ring-4 ring-primary-200' :
                          'bg-neutral-200 text-neutral-500'
                        }`}>
                          {isCompleted ? <FaCheck className="w-3 h-3 sm:w-4 sm:h-4" /> : <Icon className="w-3 h-3 sm:w-4 sm:h-4" />}
                        </div>
                        <span className={`text-[10px] sm:text-xs font-medium ${
                          isActive ? 'text-primary-700' : 'text-neutral-500'
                        }`}>
                          {step.title}
                        </span>
                      </button>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 sm:h-1 mx-1 sm:mx-2 rounded ${
                          currentStep > step.number ? 'bg-green-500' : 'bg-neutral-200'
                        }`} />
                      )}
                    </React.Fragment>
                  )
                })}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 modal-scrollbar">
              <AnimatePresence mode="wait">
                {/* Paso 1: Servicio */}
                {currentStep === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-2xl mx-auto"
                  >
                    <div className="text-center mb-4 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1 sm:mb-2">
                        ¿Qué tipo de sesión necesitas?
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-600">
                        Selecciona el servicio que mejor se adapte a tus necesidades
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      {services.map((service) => {
                        const Icon = service.icon
                        return (
                          <button
                            key={service.id}
                            onClick={() => handleServiceSelect(service.id)}
                            className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg group ${
                              selectedService === service.id
                                ? 'border-primary-500 bg-primary-50 shadow-lg'
                                : 'border-neutral-200 hover:border-primary-300 bg-white'
                            }`}
                          >
                            <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-colors ${
                              selectedService === service.id
                                ? 'bg-primary-600 text-white'
                                : 'bg-primary-100 text-primary-600 group-hover:bg-primary-200'
                            }`}>
                              <Icon className="w-6 h-6 sm:w-7 sm:h-7" />
                            </div>
                            <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1">
                              {service.name}
                            </h4>
                            <p className="text-neutral-600 text-xs sm:text-sm mb-2 sm:mb-3">
                              {service.description}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs sm:text-sm text-neutral-500">
                                <FaClock className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1" />
                                {service.duration}
                              </span>
                              <span className="text-base sm:text-lg font-bold text-primary-600">
                                {formatPrice(service.precio)}
                              </span>
                            </div>
                            {selectedService === service.id && (
                              <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 bg-primary-600 rounded-full flex items-center justify-center">
                                <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                              </div>
                            )}
                          </button>
                        )
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Paso 2: Modalidad */}
                {currentStep === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-2xl mx-auto"
                  >
                    <div className="text-center mb-4 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1 sm:mb-2">
                        ¿Cómo prefieres la sesión?
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-600">
                        Puedes elegir atención presencial o virtual
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <button
                        onClick={() => handleModalidadSelect('presencial')}
                        className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg group ${
                          selectedModalidad === 'presencial'
                            ? 'border-primary-500 bg-primary-50 shadow-lg'
                            : 'border-neutral-200 hover:border-primary-300 bg-white'
                        }`}
                      >
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-colors ${
                          selectedModalidad === 'presencial'
                            ? 'bg-primary-600 text-white'
                            : 'bg-blue-100 text-blue-600 group-hover:bg-blue-200'
                        }`}>
                          <FaMapMarkerAlt className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1 sm:mb-2">
                          Presencial
                        </h4>
                        <p className="text-neutral-600 text-xs sm:text-sm mb-3 sm:mb-4">
                          Atención en consultorio, zona norte de Bogotá
                        </p>
                        <div className="bg-neutral-50 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-neutral-600">
                          <p className="font-medium">📍 Carrera 13 Nº 122 – 34</p>
                          <p>Santa Bárbara, Bogotá</p>
                          <p className="text-[10px] sm:text-xs mt-1 text-neutral-500">Parqueadero privado</p>
                        </div>
                        {selectedModalidad === 'presencial' && (
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 bg-primary-600 rounded-full flex items-center justify-center">
                            <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                          </div>
                        )}
                      </button>

                      <button
                        onClick={() => handleModalidadSelect('virtual')}
                        className={`relative p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 text-left transition-all duration-300 hover:shadow-lg group ${
                          selectedModalidad === 'virtual'
                            ? 'border-primary-500 bg-primary-50 shadow-lg'
                            : 'border-neutral-200 hover:border-primary-300 bg-white'
                        }`}
                      >
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-3 sm:mb-4 transition-colors ${
                          selectedModalidad === 'virtual'
                            ? 'bg-primary-600 text-white'
                            : 'bg-green-100 text-green-600 group-hover:bg-green-200'
                        }`}>
                          <FaVideo className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>
                        <h4 className="text-lg sm:text-xl font-bold text-neutral-900 mb-1 sm:mb-2">
                          Virtual
                        </h4>
                        <p className="text-neutral-600 text-xs sm:text-sm mb-3 sm:mb-4">
                          Sesión por videollamada desde cualquier lugar
                        </p>
                        <div className="bg-neutral-50 rounded-lg p-2 sm:p-3 text-xs sm:text-sm text-neutral-600">
                          <p className="font-medium">💻 Plataforma Zoom</p>
                          <p>Desde la comodidad de tu hogar</p>
                          <p className="text-[10px] sm:text-xs mt-1 text-neutral-500">Ideal para internacionales</p>
                        </div>
                        {selectedModalidad === 'virtual' && (
                          <div className="absolute top-3 right-3 sm:top-4 sm:right-4 w-5 h-5 sm:w-6 sm:h-6 bg-primary-600 rounded-full flex items-center justify-center">
                            <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white" />
                          </div>
                        )}
                      </button>
                    </div>

                    <div className="mt-4 sm:mt-6 flex justify-start">
                      <button
                        onClick={() => setCurrentStep(1)}
                        className="flex items-center gap-2 text-sm sm:text-base text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                        Cambiar servicio
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Paso 3: Fecha */}
                {currentStep === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-lg mx-auto"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1 sm:mb-2">
                        Selecciona la fecha
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-600">
                        Elige el día para tu {currentService?.name.toLowerCase()}
                      </p>
                    </div>

                    {/* Calendar */}
                    <div className="bg-white rounded-xl sm:rounded-2xl border border-neutral-200 p-3 sm:p-4 shadow-sm">
                      <div className="flex items-center justify-between mb-3 sm:mb-4">
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
                          className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <h5 className="text-base sm:text-lg font-bold">
                          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
                        </h5>
                        <button
                          onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
                          className="p-1.5 sm:p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                        >
                          <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-0.5 sm:gap-1 mb-1 sm:mb-2">
                        {dayNames.map((day) => (
                          <div key={day} className="p-1 sm:p-2 text-center text-[10px] sm:text-xs font-semibold text-neutral-500">
                            {day}
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
                        {generateCalendarDays().map((day, index) => (
                          <button
                            key={index}
                            onClick={() => handleDateSelect(day.date)}
                            disabled={!day.isAvailable}
                            className={`p-1.5 sm:p-2 text-xs sm:text-sm rounded-md sm:rounded-lg transition-all ${
                              day.isSelected
                                ? 'bg-primary-600 text-white font-bold'
                                : day.isAvailable
                                ? 'hover:bg-primary-100 text-neutral-900 font-medium'
                                : 'text-neutral-300 cursor-not-allowed'
                            } ${!day.isCurrentMonth ? 'opacity-30' : ''}`}
                          >
                            {day.date.getDate()}
                          </button>
                        ))}
                      </div>
                    </div>

                    {selectedDate && (
                      <div className="mt-3 sm:mt-4 p-3 sm:p-4 bg-primary-50 rounded-xl text-center">
                        <p className="text-sm sm:text-base text-primary-800 font-medium">
                          {selectedDate.toLocaleDateString('es-CO', { 
                            weekday: 'long', day: 'numeric', month: 'long'
                          })}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 sm:mt-6 flex justify-between">
                      <button
                        onClick={() => setCurrentStep(2)}
                        className="flex items-center gap-2 text-sm sm:text-base text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                        Atrás
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Paso 4: Horario */}
                {currentStep === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-2xl mx-auto"
                  >
                    <div className="text-center mb-4 sm:mb-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-1 sm:mb-2">
                        Selecciona el horario
                      </h3>
                      {selectedDate && (
                        <p className="text-sm sm:text-base text-neutral-600">
                          {selectedDate.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
                          <span className="mx-1 sm:mx-2">•</span>
                          {currentService?.duration}
                        </p>
                      )}
                    </div>

                    {userTimezone && userTimezone !== 'America/Bogota' && (
                      <div className="mb-3 sm:mb-4 p-2 sm:p-3 bg-green-50 rounded-lg sm:rounded-xl border border-green-200 text-center">
                        <p className="text-xs sm:text-sm text-green-700 flex items-center justify-center gap-1 sm:gap-2">
                          <FaGlobe className="w-3 h-3 sm:w-4 sm:h-4" />
                          Tu zona: <strong>{userTimezone.replace('_', ' ')}</strong>
                        </p>
                      </div>
                    )}

                    {loadingSlots ? (
                      <div className="text-center py-8 sm:py-12">
                        <div className="inline-flex items-center gap-2 sm:gap-3 text-sm sm:text-base text-neutral-600">
                          <div className="animate-spin rounded-full h-5 w-5 sm:h-6 sm:w-6 border-b-2 border-primary-600"></div>
                          Cargando horarios...
                        </div>
                      </div>
                    ) : availableTimeSlots.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 sm:gap-3">
                        {availableTimeSlots.map((slot) => (
                          <button
                            key={slot.id}
                            onClick={() => handleTimeSelect(slot.time)}
                            disabled={!slot.available}
                            className={`p-2 sm:p-3 rounded-lg sm:rounded-xl text-center transition-all ${
                              selectedTime === slot.time
                                ? 'bg-primary-600 text-white shadow-lg ring-2 sm:ring-4 ring-primary-200'
                                : slot.available
                                ? 'bg-white border-2 border-neutral-200 hover:border-primary-300 hover:bg-primary-50'
                                : 'bg-neutral-100 text-neutral-400 cursor-not-allowed line-through'
                            }`}
                          >
                            <div className="text-sm sm:text-base font-bold">{slot.time}</div>
                            <div className="text-[10px] sm:text-xs opacity-75">a {slot.endTime}</div>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 sm:py-12 bg-neutral-50 rounded-xl sm:rounded-2xl">
                        <p className="text-sm sm:text-base text-neutral-500">
                          No hay horarios disponibles.
                          <br />
                          Selecciona otro día.
                        </p>
                      </div>
                    )}

                    <div className="mt-4 sm:mt-6 flex justify-between items-center">
                      <button
                        onClick={() => setCurrentStep(3)}
                        className="flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-neutral-600 hover:text-neutral-900 transition-colors"
                      >
                        <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                        Cambiar fecha
                      </button>
                      {selectedTime && (
                        <button
                          onClick={proceedToPayment}
                          className="flex items-center gap-1 sm:gap-2 bg-primary-600 text-white px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg sm:rounded-xl hover:bg-primary-700 transition-colors text-sm sm:text-base font-semibold"
                        >
                          Continuar
                          <FaArrowRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Paso 5: Datos y Pago */}
                {currentStep === 5 && (
                  <motion.div
                    key="step5"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="max-w-3xl mx-auto"
                  >
                    {/* En móvil: Resumen primero arriba */}
                    <div className="block md:hidden mb-4">
                      <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl p-4 border border-primary-100">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                              <FaCalendarAlt className="w-5 h-5 text-primary-600" />
                            </div>
                            <div>
                              <p className="font-bold text-neutral-900">{currentService?.name}</p>
                              <p className="text-xs text-neutral-500">
                                {selectedDate?.toLocaleDateString('es-CO', { weekday: 'short', day: 'numeric', month: 'short' })} • {selectedTime}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-primary-700">{formatPrice(currentService?.precio || 0)}</p>
                          </div>
                        </div>
                        
                        {/* Sección de confianza - Pago seguro (móvil) */}
                        <div className="mt-3 pt-3 border-t border-primary-100">
                          <div className="flex items-center gap-1.5 mb-1.5">
                            <FaLock className="w-3 h-3 text-green-600" />
                            <span className="text-xs font-semibold text-green-700">Pago 100% Seguro</span>
                          </div>
                          <p className="text-[10px] text-neutral-600 leading-relaxed">
                            Procesado por <strong>Wompi</strong>, certificada por la <strong>Superintendencia Financiera de Colombia</strong>. Estándares <strong>PCI DSS</strong>.
                          </p>
                          <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-neutral-500">
                            <span className="flex items-center gap-0.5">
                              <FaCheck className="w-2.5 h-2.5 text-green-500" />
                              SSL
                            </span>
                            <span className="flex items-center gap-0.5">
                              <FaCheck className="w-2.5 h-2.5 text-green-500" />
                              Datos protegidos
                            </span>
                            <span className="flex items-center gap-0.5">
                              <FaCheck className="w-2.5 h-2.5 text-green-500" />
                              Sin guardar tarjetas
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-5 gap-4 sm:gap-6">
                      {/* Formulario */}
                      <div className="md:col-span-3 order-2 md:order-1">
                        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-3 sm:mb-4">
                          Tus datos
                        </h3>

                        {submitStatus.type === 'error' && (
                          <div className="mb-3 sm:mb-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-red-50 border border-red-200 text-sm text-red-800">
                            {submitStatus.message}
                          </div>
                        )}

                        <form onSubmit={handleFormSubmit} className="space-y-3 sm:space-y-4">
                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1">
                              Nombre completo *
                            </label>
                            <input
                              type="text"
                              name="nombre"
                              required
                              value={formData.nombre}
                              onChange={handleFormChange}
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              disabled={isLoading}
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1">
                              Email *
                            </label>
                            <input
                              type="email"
                              name="email"
                              required
                              value={formData.email}
                              onChange={handleFormChange}
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              disabled={isLoading}
                            />
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1">
                              Teléfono *
                            </label>
                            <input
                              type="tel"
                              name="telefono"
                              required
                              value={formData.telefono}
                              onChange={handleFormChange}
                              placeholder={selectedModalidad === 'presencial' ? '+573XXXXXXXXX' : '+XXXXXXXXXXX'}
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                              disabled={isLoading}
                            />
                            {selectedModalidad === 'virtual' && (
                              <p className="text-[10px] sm:text-xs text-neutral-500 mt-1">
                                Incluye indicador de tu país (ej: +34 España, +52 México)
                              </p>
                            )}
                          </div>

                          <div>
                            <label className="block text-xs sm:text-sm font-medium text-neutral-700 mb-1">
                              Mensaje (opcional)
                            </label>
                            <textarea
                              name="mensaje"
                              rows={2}
                              value={formData.mensaje}
                              onChange={handleFormChange}
                              placeholder="¿Hay algo que te gustaría mencionar?"
                              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-neutral-300 rounded-lg sm:rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                              disabled={isLoading}
                            />
                          </div>

                          {/* Checkbox de consentimiento */}
                          <div className="bg-neutral-50 rounded-lg sm:rounded-xl p-3 sm:p-4">
                            <label className="flex items-start gap-2 sm:gap-3 cursor-pointer">
                              <input
                                type="checkbox"
                                checked={acceptedTerms}
                                onChange={(e) => setAcceptedTerms(e.target.checked)}
                                className="mt-0.5 sm:mt-1 w-4 h-4 sm:w-5 sm:h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
                                disabled={isLoading}
                              />
                              <span className="text-xs sm:text-sm text-neutral-700 leading-tight sm:leading-normal">
                                He leído y acepto los{' '}
                                <a 
                                  href="/terminos-condiciones" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary-600 hover:underline font-medium"
                                >
                                  Términos y Condiciones
                                </a>
                                , la{' '}
                                <a 
                                  href="/politica-privacidad" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary-600 hover:underline font-medium"
                                >
                                  Política de Privacidad
                                </a>
                                {' '}y la{' '}
                                <a 
                                  href="/politica-cookies" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-primary-600 hover:underline font-medium"
                                >
                                  Política de Cookies
                                </a>
                                . Autorizo el tratamiento de mis datos personales.
                              </span>
                            </label>
                          </div>

                          <button
                            type="submit"
                            disabled={isLoading || !acceptedTerms}
                            className={`w-full py-3 sm:py-4 rounded-lg sm:rounded-xl font-bold text-base sm:text-lg flex items-center justify-center gap-2 sm:gap-3 transition-all ${
                              isLoading || !acceptedTerms
                                ? 'bg-neutral-400 cursor-not-allowed text-neutral-600'
                                : 'bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white shadow-lg hover:shadow-xl'
                            }`}
                          >
                            {isLoading ? (
                              <>
                                <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white"></div>
                                Procesando...
                              </>
                            ) : (
                              <>
                                <FaLock className="w-3 h-3 sm:w-4 sm:h-4" />
                                Pagar {formatPrice(currentService?.precio || 0)}
                              </>
                            )}
                          </button>

                          <p className="text-[10px] sm:text-xs text-center text-neutral-500 flex items-center justify-center gap-1">
                            <FaCreditCard className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                            Pago seguro procesado por Wompi
                          </p>
                        </form>

                        <button
                          onClick={() => setCurrentStep(4)}
                          className="mt-3 sm:mt-4 flex items-center gap-1 sm:gap-2 text-sm sm:text-base text-neutral-600 hover:text-neutral-900 transition-colors"
                        >
                          <FaArrowLeft className="w-3 h-3 sm:w-4 sm:h-4" />
                          Cambiar horario
                        </button>
                      </div>

                      {/* Resumen - Solo visible en desktop */}
                      <div className="hidden md:block md:col-span-2 order-1 md:order-2">
                        <div className="bg-gradient-to-br from-primary-50 to-white rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-primary-100 sticky top-4">
                          <h4 className="font-bold text-neutral-900 mb-3 sm:mb-4 text-sm sm:text-base">
                            Resumen de tu cita
                          </h4>
                          
                          <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm">
                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                                <FaUser className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                              </div>
                              <div>
                                <p className="font-medium text-neutral-900">{currentService?.name}</p>
                                <p className="text-neutral-500 text-[10px] sm:text-xs">{currentService?.duration}</p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                                {selectedModalidad === 'presencial' ? (
                                  <FaMapMarkerAlt className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                                ) : (
                                  <FaVideo className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-neutral-900 capitalize">{selectedModalidad}</p>
                                <p className="text-neutral-500 text-[10px] sm:text-xs">
                                  {selectedModalidad === 'presencial' ? 'Santa Bárbara, Bogotá' : 'Videollamada Zoom'}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-start gap-2 sm:gap-3">
                              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                                <FaCalendarAlt className="w-3 h-3 sm:w-4 sm:h-4 text-primary-600" />
                              </div>
                              <div>
                                <p className="font-medium text-neutral-900">
                                  {selectedDate?.toLocaleDateString('es-CO', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </p>
                                <p className="text-neutral-500 text-[10px] sm:text-xs">{selectedTime}</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-primary-200">
                            <div className="flex justify-between items-center">
                              <span className="font-medium text-neutral-700 text-sm">Total</span>
                              <span className="text-xl sm:text-2xl font-bold text-primary-700">
                                {formatPrice(currentService?.precio || 0)}
                              </span>
                            </div>
                          </div>

                          {/* Sección de confianza - Pago seguro */}
                          <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-primary-100">
                            <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                              <FaLock className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                              <span className="text-xs sm:text-sm font-semibold text-green-700">Pago 100% Seguro</span>
                            </div>
                            <p className="text-[10px] sm:text-xs text-neutral-600 leading-relaxed">
                              Procesado por <strong>Wompi</strong>, certificada por la <strong>Superintendencia Financiera de Colombia</strong>. 
                              Estándares <strong>PCI DSS</strong>.
                            </p>
                            <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2 text-[10px] sm:text-xs text-neutral-500">
                              <span className="flex items-center gap-0.5 sm:gap-1">
                                <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                                SSL
                              </span>
                              <span className="flex items-center gap-0.5 sm:gap-1">
                                <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                                Datos protegidos
                              </span>
                              <span className="flex items-center gap-0.5 sm:gap-1">
                                <FaCheck className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-500" />
                                Sin guardar tarjetas
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}

export default AppointmentSchedulerModal
