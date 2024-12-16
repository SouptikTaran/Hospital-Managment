import { Router } from "express";
import patientRouter from "./patient.route.ts"
import doctorRouter from "./doctor.route.ts"
const router = Router()
import { verifyCookie } from "../middlewares/example.middleware.ts";


router.use('/patient' , verifyCookie,patientRouter)
router.use('/doctor' , doctorRouter)

export default router