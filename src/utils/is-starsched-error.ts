type ValidationError = {
  field: string
  type: string
  message: string
  value?: number
}

type StarSchedError = {
  code: string
  message: string
  validation?: ValidationError
}

export function isStarSchedError<Err extends StarSchedError = StarSchedError>(
  maybeStarSchedError: unknown,
): maybeStarSchedError is Err {
  return (
    typeof maybeStarSchedError === 'object' &&
    maybeStarSchedError !== null &&
    'code' in maybeStarSchedError &&
    'message' in maybeStarSchedError
  )
}
