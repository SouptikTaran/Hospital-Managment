import { Router } from "express";
import * as Doctor from "../controller/doctor.controller.ts";
const router = Router()


router.post('/signup' , Doctor.signup )
router.post('/login' , Doctor.login )
router.post('/delete' , Doctor.deleteDoctor )
router.get('/getDoctors',Doctor.getDoctor)
export default router