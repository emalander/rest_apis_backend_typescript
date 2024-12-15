import express from 'express';
import router from './router';
import db from './config/db';
import colors from 'colors';
import cors, {CorsOptions} from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express';
import swaggerSpec, {swaggerUiOptions}  from './config/swagger';
import { expressCspHeader, INLINE, NONE, SELF }  from 'express-csp-header';

//const { expressCspHeader, INLINE, NONE, SELF } = require('express-csp-header');

// Conectar a base de datos
async function connectDB () {

  try {
    await db.authenticate()
    db.sync()
    //console.log(colors.magenta.bold('Conexion exitosa'))
  } catch (error) {
    console.log(colors.bgRed.bold(error))   
  }
    
}

connectDB()
// instancia de express
const server = express()

/*server.use(expressCspHeader({ 
  directives: {
    'default-src': [NONE],
    'script-src': [SELF, INLINE, 'somehost.com'],
    'style-src': [SELF, 'mystyles.net'],
    'img-src': [SELF],
    'worker-src': [NONE],
    'block-all-mixed-content': true
  }
}))*/

// Permitir conexiones
const corsOptions: CorsOptions = {
  
  origin: function(origin, callback) {
    console.log(origin)
    if(origin === process.env.FRONT_END_URL) { //FRONT_END_URL
      console.log('Permitir 5173')
      callback(null, true)
    } else {
      //callback(new Error('Error de CORS..'))
      console.log(origin)
      callback(null, true)
    }
  }
}
server.use(cors(corsOptions))

// leer datos de formularios
server.use(express.json())
server.use(morgan('dev'))
server.use('/api/products', router)

// Docs 
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server