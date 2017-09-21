import Koa2 from 'koa'
import KoaBody from 'koa-body'
import colors from 'colors/safe'
import KoaStatic from 'koa-static2'
import config from './config'
import path from 'path'
import { entry, entryError } from './routes'
import ErrorRoutesCatch from './middleware/ErrorRoutesCatch'
import cors from './middleware/cors'
import jwt from 'koa-jwt'
import fs from 'fs'
// import PluginLoader from './lib/PluginLoader'
let base = config.base
const app = new Koa2()
const env = process.env.NODE_ENV || 'development' // Current mode

const publicKey = fs.readFileSync(path.join(__dirname, '../publicKey.pub'))
app
  .use(cors())
  .use(ErrorRoutesCatch())
  .use(KoaStatic('assets', path.resolve(__dirname, '../assets'))) // Static resource
  .use(jwt({ secret: publicKey }).unless({ path: [/^\/auth/] }))
  .use(KoaBody({
    multipart: true,
    strict: false,
    formidable: {
      uploadDir: path.join(__dirname, '../assets/uploads/tmp')
    },
    jsonLimit: '10mb',
    formLimit: '10mb',
    textLimit: '10mb'
  })) // Processing request
  // .use(PluginLoader(SystemConfig.System_plugin_path))
  .use(entry.routes())
  .use(entry.allowedMethods())
  .use(entryError())

if (env === 'development') { // logger
  app.use((ctx, next) => {
    const start = new Date()
    return next().then(() => {
      const ms = new Date() - start
      console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
    })
  })
}

app.listen(base.API_server_port)

console.log('🌎 =>', colors.green('Now start API server on port ' + base.API_server_port))

export default app
