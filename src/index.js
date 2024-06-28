import express from 'express';
import cors from 'cors';
import connection from './config/db.connection.js';
import testRouter from './routes/test.route.js';
import userRoutes from './routes/user.route.js';
import { setupSwagger } from './config/swagger.js'; 


const app = express()
const PORT = process.env.PORT || 8080
// Llama a la configuración de Swagger
setupSwagger(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.use('/api/test', testRouter);
app.use('/api/user', userRoutes);


app.listen(PORT, async () => {
  await connection()
  console.log("Server listening on PORT ❤️ 🔥🔥: " + PORT);
})

