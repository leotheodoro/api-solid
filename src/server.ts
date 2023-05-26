import { app } from '@/app'
import { env } from '@/env'
import { appRoutes } from './http/routes'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })
  .then(() => {
    console.log('🚀 HTTP Server running...')
  })

app.register(appRoutes)
