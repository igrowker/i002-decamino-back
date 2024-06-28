import express from 'express';
import cors from 'cors';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';
import connection from './config/db.connection.js';
import testRouter from './routes/test.route.js';
import userRoutes from './routes/user.route.js';

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())

app.post('/2fa/setup', (req, res) => {
  const secret = speakeasy.generateSecret({ length: 20 });

  console.log(secret)
  
  qrcode.toDataURL(secret.otpauth_url, (err, data_url) => {
    if (err) {
      return res.status(500).json({ message: 'Error generating QR code' });
    }
    
    // Guarda el secreto en la base de datos del usuario
    // Usuario.findByIdAndUpdate(req.user.id, { twoFactorSecret: secret.base32 });

    res.json({ secret: secret.base32, qrCode: data_url });
  });
});

app.use('/api/test', testRouter);
app.use('/api/user', userRoutes);

app.listen(PORT, async () => {
  await connection()
  console.log("Server listening on PORT ❤️🔥🔥: " + PORT);
})