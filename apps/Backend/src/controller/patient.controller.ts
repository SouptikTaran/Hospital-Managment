import { RequestHandler } from "../types/types";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { signupSchema, loginSchema, deletePatientSchema } from "../schemas/patient.schema.ts";
import { Patient } from "../models/patient.model.ts";



const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

// Signup Controller
export const signup: RequestHandler = async (req, res) => {
    console.log(req.body)
    const { firstName, lastName, email, gender, password } = req.body
    const validation = signupSchema.safeParse(req.body)
    if (!validation.success)
        return res
            .status(400)
            .json({ message: 'Invalid Data Input', error: validation.error.errors })

    try {
        // Check if the patient already exists
        const existingPatient = await Patient.findOne({ email }).select('-password');;
        if (existingPatient) {
            return res.status(400).json({ message: 'Patient already exists' })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new patient
        const patient = await Patient.create({
            firstName,
            lastName,
            email,
            gender,
            password: hashedPassword
        })

        const token = jwt.sign(
            { id: patient.id, email: patient.email },
            JWT_SECRET,
            {
                expiresIn: '1h',
            }
        )

        res.cookie('token' , token,{
            httpOnly: true,
            secure: true,
            sameSite : 'strict',
            maxAge: 24 * 60 * 60 * 1000, // Set expiration to 1 day (in ms)
        })

        const { password: _, ...safePatient } = patient.toObject();


        res.status(201).json({ message: 'Patient created successfully', user: safePatient})
    } catch (error: any) {
        res
            .status(500)
            .json({ message: 'Error creating patient', error: error.message })
    }
}

// Login Controller
export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body
    const validation = loginSchema.safeParse(req.body)
    if (!validation.success)
        return res
            .status(400)
            .json({ message: 'Invalid Data Input', error: validation.error.errors })

    try {
        // Find the patient by email
        const patient = await Patient.findOne({ email }).select('+password');
        if (!patient) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, patient.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // Generate a JWT token
        const token = jwt.sign(
            { id: patient.id, email: patient.email },
            JWT_SECRET,
            {
                expiresIn: '1h',
            }
        )

        res.cookie('token' , token,{
            secure: true,
            // sameSite : 'strict',
            maxAge: 24 * 60 * 60 * 1000, // Set expiration to 1 day (in ms)
        })
        const { password: _, ...safePatient } = patient.toObject();

        res.status(200).json({ message: 'Login successful',  user: safePatient })
    } catch (error: any) {
        res.status(500).json({ message: 'Error logging in', error: error.message })
    }
}

// Delete Doctor Controller
export const deletePatient: RequestHandler = async (req, res) => {
    const { email, password } = req.params
    const validation = deletePatientSchema.safeParse(req.params)
    if (!validation.success)
        return res.status(400).json({ message: 'Invalid Data Input' })

    try {
        // Check if the patient exists
        const patient = await Patient.findOne({ email }).select('+password')
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' })
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, patient.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // Delete the patient
        await Patient.deleteOne({ email });

        res.status(200).json({ message: 'Patient deleted successfully' })
    } catch (error: any) {
        res
            .status(500)
            .json({ message: 'Error deleting patient', error: error.message })
    }
}