import { Router } from "express";
import { demo } from "../controller/user.controller";
const router = Router()


router.get('/' , demo)

export default router