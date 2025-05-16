import { atom } from 'jotai'
import type { LucideIcon } from 'lucide-react'

type Button = {
  text: string
}

type ConfirmationModal = {
  icon?: LucideIcon
  title: string
  description: string
  onCancel?: () => void
  cancelButton: Button
  onConfirm?: () => void
  confirmButton: Button
}

export type ConfirmationModalState = {
  open: boolean
  confirmation: ConfirmationModal | null
}

export const confirmationModalAtom = atom<ConfirmationModalState>({
  open: false,
  confirmation: null
})
