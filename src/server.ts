import { app } from '@/app'
import { env } from '@/env'
import { appRoutes } from './http/routes'
import { ZodError } from 'zod'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server running...')
  })

app.register(appRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error.',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Log to an external tool
  }

  return reply.status(500).send({ message: 'Internal server error.' })
})
