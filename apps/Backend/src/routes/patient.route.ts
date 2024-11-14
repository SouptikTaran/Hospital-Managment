import { Router  , Request , Response , NextFunction} from "express";
import * as Patient from "../controller/patient.controller.ts";
const router = Router()


router.post('/signup' , Patient.signup )
router.post('/login' , Patient.login )
router.post('/delete' , Patient.deletePatient )
export default router