import { atom } from 'jotai'
import type { LucideIcon } from 'lucide-react'

type Button = {
  text: string
}

type AlertModal = {
  icon?: LucideIcon
  title: string;
  description: string;
  onClose?: () => void;
  closeButton: Button
}

export type AlertModalState = {
  open: boolean
  alert: AlertModal | null
}

export const alertModalAtom = atom<AlertModalState>({
  open: false,
  alert: null
})
