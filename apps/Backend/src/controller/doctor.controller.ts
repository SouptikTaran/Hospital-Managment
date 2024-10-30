
import { RequestHandler } from '../types/types.ts'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {
    loginSchema,
    signupSchema,
    deleteDoctorSchema,
} from '../schemas/doctor.schema.ts'
import { Doctor } from '../models/doctor.model.ts'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'

// Signup Controller
export const signup: RequestHandler = async (req, res) => {
    const { firstName, lastName, email, gender, specialization, password } = req.body;
    const validation = signupSchema.safeParse(req.body)
    if (!validation.success)
        return res
            .status(400)
            .json({ message: 'Invalid Data Input', error: validation.error.errors })

    try {
        // Check if the Doctor already exists
        const existingDoctor = await Doctor.findOne({email}).select('-password');
        if (existingDoctor) {
            return res.status(400).json({ message: 'doctor already exists' })
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10)

        // Create a new patient
        const doctor = await Doctor.create({
                firstName,
                lastName,
                email,
                gender,
                specialization,
                password: hashedPassword,
        })

        const { password: _, ...safeDoctor } = doctor.toObject();


        res.status(201).json({ message: 'Doctor created successfully', doctor: safeDoctor })
    } catch (error:any) {
        res
            .status(500)
            .json({ message: 'Error creating doctor', error: error.message })
    }
}

// Login Controller
export const login:RequestHandler = async (req, res) => {
    const { email, password } = req.body
    const validation = loginSchema.safeParse(req.body)
    if (!validation.success)
        return res
            .status(400)
            .json({ message: 'Invalid Data Input', error: validation.error.errors })

    try {
        // Find the patient by email
        const doctor = await Doctor.findOne({ email}).select("+password")
        if (!doctor) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, doctor.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // Generate a JWT token
        const token = jwt.sign({ id: doctor.id, email: doctor.email }, JWT_SECRET, {
            expiresIn: '1h',
        })
        
        const { password: _, ...safeDoctor } = doctor.toObject();

        res.status(200).json({ message: 'Login successful', token , doctor: safeDoctor})
    } catch (error:any) {
        res.status(500).json({ message: 'Error logging in', error: error.message })
    }
}

// Delete doctor Controller
export const deleteDoctor: RequestHandler = async (req, res) => {
    const { email, password } = req.params
    const validation = deleteDoctorSchema.safeParse(req.params)
    if (!validation.success)
        return res.status(400).json({ message: 'Invalid Data Input' })

    try {
        // Check if the patient exists
        const doctor = await Doctor.findOne({ email }).select('+password')
        if (!doctor) {
            return res.status(404).json({ message: 'Doctor not found' })
        }

        // Check the password
        const isPasswordValid = await bcrypt.compare(password, doctor.password)
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Invalid email or password' })
        }

        // Delete the patient
        await Doctor.deleteOne({ email });

        res.status(200).json({ message: 'Doctor deleted successfully' })
    } catch (error: any) {
        res
            .status(500)
            .json({ message: 'Error deleting Doctor', error: error.message })
    }
}
