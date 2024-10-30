import { Router } from "express";
import patientRouter from "./patient.route.ts"
import doctorRouter from "./doctor.route.ts"
const router = Router()


router.use('/patient' , patientRouter)
router.use('/doctor' , doctorRouter)

export default router