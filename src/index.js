import express from 'express';
import cors from 'cors';
import connection from './config/db.connection.js';
import { injectUser } from './middlewares/auth.middleware.js';
import { setupSwagger } from './config/swagger.js'; 
import testRouter from './routes/test.route.js';
import userRoutes from './routes/user.route.js';
import paymentRoute from './routes/payment.route.js';
import restaurantRoute from './routes/restaurant.route.js';
import errorHandler from './middlewares/error.handler.middleware.js'
import notFoundHandler from './middlewares/not.found.handler.js'
import paymentRoute from './routes/payment.route.js';
import osmRoutes from './routes/osmRoutes.js';

// Declaración de la variable app para usar express
const app = express()

// Declaración del puerto que se va a utilizar
const PORT = process.env.PORT || 8080

// Adición de Swagger para documentación
setupSwagger(app);

// Ruta de webhook antes de body-parser debe estar aca, mas abajo no funciona
app.use('/api/payment/webhook', express.raw({ type: 'application/json' }), paymentRoute);

// Se agregan estos dos métodos para que express pueda leer formularios y json
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Se habilita cors para que se pueda consumir la api desde distintos dominios
app.use(cors())

// Middleware que inyecta la info del user (que viene a través del jwt en headers) en req.user para poder acceder a esta info en el resto de la ejecución de la api
app.use(injectUser)

// Este endpoint da un mensaje de bienvenida
app.get('/', (req, res) => res.status(200).json({ message: '¡Bienvenido a DeCamino!' }))

// Declaración de endpoints llamando a routes
app.use('/api/test', testRouter);
app.use('/api/user', userRoutes);
app.use('/api/payment', paymentRoute);
// Usar las rutas de OSM
app.use('/api', osmRoutes);
app.use('/api/restaurants', restaurantRoute);

// Manejador de errores
app.use(errorHandler);

// Manejador de errores 404 (endpoints no encontrados)
app.use(notFoundHandler);

// Comienzo del listening para conectar con MongoDB y correr express en el puerto previamente declarado
app.listen(PORT, async () => {
  await connection()
  console.log("Server listening on PORT ❤️ 🔥🔥: " + PORT);
})

