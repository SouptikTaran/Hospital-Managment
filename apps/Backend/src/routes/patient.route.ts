import { Router  , Request , Response , NextFunction} from "express";
import * as Patient from "../controller/patient.controller";
import { verifyCookie } from "../middlewares/example.middleware";
const router = Router()

// Auth Routes
router.post('/signup' , Patient.signup )
router.post('/login' , Patient.login )
router.post('/delete', verifyCookie ,Patient.deletePatient )

//Profile

// Appointment Routes
router.post('/book-appointment', verifyCookie , Patient.createAppointment)
router.post('/appointments' , Patient.allAppointments)
export default router   

