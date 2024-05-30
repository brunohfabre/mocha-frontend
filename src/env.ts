import { z } from 'zod'

const envSchema = z.object({
  VITE_API_URL: z.string().min(1).url(),
  VITE_GITHUB_CLIENT_ID: z.string().min(1),
})

export const env = envSchema.parse(import.meta.env)
