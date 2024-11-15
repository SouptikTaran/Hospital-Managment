import { Router  , Request , Response , NextFunction} from "express";
import * as Patient from "../controller/patient.controller.ts";
const router = Router()

// Auth Routes
router.post('/signup' , Patient.signup )
router.post('/login' , Patient.login )
router.post('/delete' , Patient.deletePatient )

// Appointment Routes
router.post('/book-appointment' , Patient.createAppointment)
router.post('/appointments' , Patient.allAppointments)
export default router