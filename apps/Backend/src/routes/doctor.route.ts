import { Router } from "express";
import * as Doctor from "../controller/doctor.controller.ts";
const router = Router()

// Authentication
router.post('/signup' , Doctor.signup )
router.post('/login' , Doctor.login )
router.post('/delete' , Doctor.deleteDoctor )
router.get('/getDoctors',Doctor.getDoctor)
// TODO: Forgot password
// TODO: Change password

// profile
// TODO: profile update
// TODO: profile get

// Availability
// TODO: Doctor available

// Appointments
router.get('/appointment', Doctor.patientAppointment)
router.post('/appointments', Doctor.allAppointments)
router.put("/appointments/status",Doctor.updateAppointmentStatus)
// TODO: appointment cancelled


export default router