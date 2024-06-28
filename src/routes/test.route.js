import { Router } from 'express'
import * as testController from '../controllers/test.controller.js'

const router = Router()

router.get('/', testController.GETTest)
.post('/', testController.POSTTest)
.put('/:id', testController.PUTTest)
.delete('/:id', testController.DELETETest)

export default router

