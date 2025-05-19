import { useCallback } from "react"
import { useSetAtom } from "jotai"

import { confirmationModalAtom, type ConfirmationModalState } from "@/atoms/confirmation"

type Input = NonNullable<ConfirmationModalState['confirmation']>;

export function useConfirmation() {
  const setModal = useSetAtom(confirmationModalAtom)

  const showConfirmation = useCallback(
    (input: Input) => setModal({ open: true, confirmation: input }),
    [setModal]
  )

  return { showConfirmation }
}
