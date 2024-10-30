import { z } from 'zod'

// Schema for Signup
export const signupSchema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email address'),
    specialization: z.string().min(1),
    gender: z.enum(['Male', 'Female', 'Other']).refine(
        (val) => ['Male', 'Female', 'Other'].includes(val),
        { message: 'Invalid gender value' }
    ), password: z.string().min(1, 'Password must be at least 1 characters long'),
})

// Schema for Login
export const loginSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})

// Schema for Delete doctor
export const deleteDoctorSchema = z.object({
    email: z.string().email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
})