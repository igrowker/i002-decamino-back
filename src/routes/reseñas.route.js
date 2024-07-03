//Aca van las rutas

// /routes/reseñasRoutes.js

import { Router } from 'express'
import * as reseñasController from '../controllers/reseñas.controller.js'


//declaro variable que tiene de rutas / instanciando el objeto router

const router = Router();

// Rutas para las reseñas
router.post('/reseñas', reseñasController.createReseñas);
router.get('/reseñas', reseñasController.getReseñas);
router.get('/reseñas/:id', reseñasController.getReseñasById);
router.put('/reseñas/:id', reseñasController.updateReseñas);
router.delete('/reseñas/:id', reseñasController.deleteReseñas);

export default router;