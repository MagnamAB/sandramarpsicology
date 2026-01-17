import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import AppointmentSchedulerModal from '../components/AppointmentSchedulerModal'

interface AppointmentModalContextType {
  openModal: () => void
  closeModal: () => void
  hideModal: () => void
  showModal: () => void
  isOpen: boolean
  isVisible: boolean
}

const AppointmentModalContext = createContext<AppointmentModalContextType | undefined>(undefined)

export const useAppointmentModal = () => {
  const context = useContext(AppointmentModalContext)
  if (!context) {
    throw new Error('useAppointmentModal must be used within AppointmentModalProvider')
  }
  return context
}

interface AppointmentModalProviderProps {
  children: ReactNode
}

export const AppointmentModalProvider: React.FC<AppointmentModalProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  const openModal = useCallback(() => {
    setIsOpen(true)
    setIsVisible(true)
    document.body.style.overflow = 'hidden'
  }, [])

  const closeModal = useCallback(() => {
    setIsOpen(false)
    setIsVisible(true)
    document.body.style.overflow = 'unset'
  }, [])

  // Ocultar modal temporalmente (para el widget de Wompi)
  const hideModal = useCallback(() => {
    setIsVisible(false)
    document.body.style.overflow = 'unset'
  }, [])

  // Mostrar modal de nuevo
  const showModal = useCallback(() => {
    setIsVisible(true)
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <AppointmentModalContext.Provider value={{ openModal, closeModal, hideModal, showModal, isOpen, isVisible }}>
      {children}
      <AppointmentSchedulerModal 
        isOpen={isOpen} 
        onClose={closeModal} 
        isVisible={isVisible}
        onHide={hideModal}
        onShow={showModal}
      />
    </AppointmentModalContext.Provider>
  )
}

export default AppointmentModalContext
