import { z } from 'zod'

const appEnvSchema = z.object({
  VITE_APP_NAME: z.string().min(1),
  VITE_APP_VERSION: z.string().min(1),
  VITE_APP_BETA: z.union([
    z.literal('true'),
    z.literal('false'),
  ]),
}).transform(input => ({
  name: input.VITE_APP_NAME,
  version: `v${input.VITE_APP_VERSION}`,
  isBeta: input.VITE_APP_BETA === 'true'
}))


export const app = appEnvSchema.parse(import.meta.env);
