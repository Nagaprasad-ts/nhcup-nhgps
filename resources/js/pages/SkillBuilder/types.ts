export interface FormData {
  childName: string
  childAge: string
  programme: string
  parentName: string
  phone: string
  email: string
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: () => void
}

export interface ToastProps {
  show: boolean
}
