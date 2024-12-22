import { Router } from "express";
import patientRouter from "./patient.route"
import doctorRouter from "./doctor.route"
const router = Router()
import { verifyCookie } from "../middlewares/example.middleware";


router.use('/patient',patientRouter)
router.use('/doctor' , doctorRouter)

export default router