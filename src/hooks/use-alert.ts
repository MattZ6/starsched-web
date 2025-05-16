import { useCallback } from "react"
import { useSetAtom } from "jotai"

import { alertModalAtom, type AlertModalState } from "@/atoms/alert"

type Input = NonNullable<AlertModalState['alert']>;

export function useAlert() {
  const setModal = useSetAtom(alertModalAtom)

  const showAlert = useCallback(
    (input: Input) => setModal({ open: true, alert: input }),
    [setModal]
  )

  return { showAlert }
}
