import { useState } from 'react'

import { ForgotPassword } from './components/forgot-password'
import { MailSent } from './components/mail-sent'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState<string | null>(null)

  if (email) {
    return <MailSent email={email} />
  }

  return <ForgotPassword onSend={setEmail} />
}
