import multer from 'multer'
import path from 'path'

// Configura Multer para almacenar archivos temporalmente en el servidor
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Carpeta temporal en el servidor
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${Date.now()}${ext}`); // Nombre único para evitar conflictos
  },
});

const upload = multer({ storage: storage });

export default upload