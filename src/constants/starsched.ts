import { z } from 'zod'

const starschedEnvSchema = z.object({
  VITE_STARSCHED_API_BASE_URL: z.string().min(1).url(),
  SESSION_EXPIRED_EVENT_NAME: z.string().min(1),
}).transform(input => ({
  baseUrl: input.VITE_STARSCHED_API_BASE_URL,
  sessionExpiredEventName: input.SESSION_EXPIRED_EVENT_NAME,
}))


export const starschedEnv = starschedEnvSchema.parse({
  ...import.meta.env,
  SESSION_EXPIRED_EVENT_NAME: 'StarSchedSessionExpired'
});
