
import { RequestHandler } from '../types/types.ts'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import {
    loginSchema,
    signupSchema,
    deleteDoctorSchema,
} from '../schemas/doctor.schema.ts'
import { Doctor } from '../models/doctor.model.ts'
import { Appointment } from '../models/appointment.model.ts'

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
        const existingDoctor = await Doctor.findOne({ email }).select('-password');
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
    } catch (error: any) {
        res
            .status(500)
            .json({ message: 'Error creating doctor', error: error.message })
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
        const doctor = await Doctor.findOne({ email }).select("+password")
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

        res.status(200).json({ message: 'Login successful', token, doctor: safeDoctor })
    } catch (error: any) {
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


//get all doctors according to their specialization
export const getDoctor: RequestHandler = async (req, res) => {
    const { specialization } = req.query;
    console.log(specialization)
    //if specialisation is provided
    if (specialization) {
        try {
            const FindDoctors = await Doctor.find({ "specialization": specialization });
            // console.log(`doctors in ${specialization}:${FindDoctors}`);
            res.status(200).json({
                doctors: FindDoctors.map(doctor =>
                ({
                    doctorName: doctor.firstName + " " + doctor.lastName,
                    doctorId: doctor._id, specialization: doctor.specialization
                }))
            })
        } catch (error) {
            console.error("error while fetching doctors:", error);
        }
    }
    //if specialization is not provided
    else {
        try {
            const FindAllDoctors = await Doctor.find();
            // console.log(`All doctors:${FindAllDoctors}`);
            res.status(200).json({
                doctors: FindAllDoctors.map(doctor =>
                ({
                    doctorName: doctor.firstName + " " + doctor.lastName,
                    doctorId: doctor._id, specialization: doctor.specialization
                }))
            })
        } catch (error) {
            console.error("error while fetching doctors:", error);
        }
    }

}


export const allAppointments: RequestHandler = async (req, res) => {
    const { doctorId } = req.body;

    if (!doctorId) {
        return res.status(400).json({ error: "Doctor ID is required" });
    }
    try {
        const appointments = await Appointment.find({ doctorId }).populate("patientId", "name email").exec();
        if (appointments.length === 0) {
            return res.status(404).json({ message: "No appointments found for this doctor" });
        }
        return res.status(200).json(appointments);
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const patientAppointment: RequestHandler = async (req, res) => {
    const { appointmentId } = req.body
    console.log(appointmentId) 
    if (!appointmentId) {
        return res.status(400).json({ error: "Appointment ID is required" })
    }
    try {
        const appointment = await Appointment.findById( appointmentId )
        if (!appointment) {
            return res.status(404).json({ message: "Invalid Appointment of Patient" });
        }

        return res.status(200).json({ appointment });
    } catch (error) {
        console.error("Error fetching appointments:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

export const updateAppointmentStatus: RequestHandler = async (req, res) => {
    const { appointmentId, status } = req.body;

    // Validate input
    if (!appointmentId || !status) {
        return res.status(400).json({ error: "Appointment ID and status are required" });
    }

    // Validate status value
    const validStatuses = ["Scheduled", "Completed", "Cancelled", "No Show"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: `Invalid status. Valid statuses are: ${validStatuses.join(", ")}` });
    }

    try {
        // Find and update the appointment
        const appointment = await Appointment.findByIdAndUpdate(
            appointmentId,
            { status, updatedAt: new Date() },
            { new: true } // Return the updated document
        );

        if (!appointment) {
            return res.status(404).json({ error: "Appointment not found" });
        }

        return res.status(200).json({ message: "Status updated successfully", appointment });
    } catch (error) {
        console.error("Error updating appointment status:", error);
        return res.status(500).json({ error: "Internal server error" });
    }
};
// TODO: appointment delete
// Delete appointment


