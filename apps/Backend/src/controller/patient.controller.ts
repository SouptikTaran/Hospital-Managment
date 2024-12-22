import { RequestHandler } from "../types/types";
import bcrypt from 'bcryptjs';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { signupSchema, loginSchema, deletePatientSchema } from "../schemas/patient.schema";
import { Patient } from "../models/patient.model";
import { Doctor } from "../models/doctor.model";
import { Appointment } from "../models/appointment.model";
import mongoose from "mongoose";
import { getCookie } from "../functions/cookieFunc";
import moment from 'moment';
import { format, parse, parseISO } from 'date-fns';

// import {ToZonedTime} from 'date-fns-tz'
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Signup Controller
export const signup: RequestHandler = async (req, res) => {
    console.log(req.body)
    const { firstName, lastName, email, gender, password,bloodGroup,birthDate,phoneNumber,occupation,alternateContact,address} = req.body
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
            password: hashedPassword,
            bloodGroup,
            birthDate,
            phoneNumber,
            occupation,
            alternateContact,
            address
        })

        const token = jwt.sign(
            { id: patient.id, email: patient.email },
            JWT_SECRET,
            {
                expiresIn: '1h',
            }
        )

        res.cookie('token', token, {
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // Set expiration to 1 day (in ms)
        })

        const { password: _, ...safePatient } = patient.toObject();


        res.status(201).json({ message: 'Patient created successfully', user: safePatient })
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

        res.cookie('token', token, {
            secure: true,
            maxAge: 24 * 60 * 60 * 1000, // Set expiration to 1 day (in ms)
        })
        const { password: _, ...safePatient } = patient.toObject();

        res.status(200).json({ message: 'Login successful', user: safePatient })
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

// Patient Create Appointment
export const createAppointment: RequestHandler = async (req, res) => {
    const { name, email , phone ,appointmentType , symptoms ,startTime, endTime, doctorId, date } = req.body
    const patientId = req.user?.id;
    

    // TODO: Optimse the code and remove all the unused variables used in the following


    console.log("recieved date:",date);
    const formattedDate=format(date,'yyyy-MM-dd');
    console.log("date:",formattedDate);
    //to convert the start time and end time into 12 hrs format
    const convertTimeto24hrs=(timeString:string)=>{
        const [time,period]=timeString.split(" ");
        const [hours,minutes]=time.split(":");
        let hoursValue=parseInt(hours);
        if(period==="PM"&&hoursValue!==12){
            hoursValue+=12
        }
        else if(hoursValue===12&& period==="AM"){
            hoursValue=0;
            
        }
        const formattedHours = hoursValue < 10 ? `0${hoursValue}` : `${hoursValue}`;
        return `${formattedHours}:${minutes}`;
    }
    //converted from 12hrs to 24 hrs format
    console.log("startTime:" , startTime)
    const startTime24=convertTimeto24hrs(startTime)
;
    const endTime24=convertTimeto24hrs(endTime);
    console.log("start time 24:",startTime24);
    console.log("end time 24:",endTime24);
    //conmbine date with converted time
    const startDateStr = `${formattedDate}T${startTime24}`; 
    const endDateStr = `${formattedDate}T${endTime24}`;     
    console.log("start datestring:",startDateStr);
    console.log("end datestring:",endDateStr);
    // parse the full date-time string
    const startDate = new Date(startDateStr);
    const endDate = new Date(endDateStr);
    console.log("start:",startDate);
    console.log("end:",endDate);
    console.log("Start date UTC:", startDate.toUTCString());
    console.log("End date UTC:", endDate.toUTCString());
    try {
        // Validate if the patient exists
        const patient = await Patient.findById(patientId);
        if (!patient) return res.status(404).json({ error: "Patient not found" });

        // Validate if the doctor exists
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return res.status(404).json({ error: "Doctor not found" });

        // Check if the patient is already added to the doctor's patients list
        if (!doctor.patients.includes(patient.id)) {
            doctor.patients.push(patient.id);
        }



        // Check for an existing appointment in the requested time slot
        const existingAppointment = await Appointment.findOne({
            doctorId,
            $or: [
                { startTime: { $lt: endDate }, endTime: { $gt: startDate } },
                { startTime: { $lt: endDate }, endTime: { $gt: startDate } }
            ]
        });

        if (existingAppointment) {
            return res.status(400).json({ error: "Appointment already exists for this patient with this doctor on the selected date" });
        }
        // Create the new appointment
        const appointment = await Appointment.create({
            patientId,
            symptoms,
            doctorId,
            startTime:startDate.toISOString(),
            endTime:endDate.toISOString(),
            date:startDate.toISOString(),
        });


        // Push the appointment ID to both doctor and patient's appointment lists
        doctor.appointments.push(appointment._id);
        patient.appointments.push(appointment._id);

        // Save the updated doctor and patient documents
        await doctor.save();
        await patient.save();

        // Respond with the success message and appointment details
        res.status(201).json({
            message: "Appointment created successfully",
            // appointment,
        });

    } catch (error: any) {
        res.status(500).json({ error: error.message }); // Catch any errors
    }
};

// Fetch all appointments
export const allAppointments: RequestHandler = async (req, res) => {
    const { patientId } = req.body

    try {
        //check patient exists 
        const patient = await Patient.findById(patientId)
            .populate({
                path: "appointments",
                populate: {
                    path: "doctorId",
                    select: "firstName lastName specialization", // Populate doctor details
                },
            });
        if (!patient) return res.status(404).json({ error: "Patient not found" });

        res.status(200).json({
            message: "Appointments fetched successfully",
            appointments: patient.appointments,
        });
    } catch (error) {
        return res.json({ error: error });
    }
}


//Fetch Patient's data
export const FetchPatientProfile:RequestHandler=async(req,res)=>{
    const {authorization}=req.headers;
    const Head=authorization;
    // console.log("Head:",Head);
    if (!Head) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }
    const AuthHead:any=Head?.split(' ');
    const token=AuthHead[1];
    if (!token) {
        return res.status(401).json({ message: "token is missing" });
    }
    const decode=jwt.verify(token,JWT_SECRET) as JwtPayload;
    
    const PatientEmail=decode.email;
    
    try {
        const patientInfo=await Patient.findOne({email:PatientEmail});
        console.log("Patient Info:",patientInfo);
        const patient=JSON.stringify(patientInfo);
        const name=`${patientInfo?.firstName} ${patientInfo?.lastName}`
        res.status(200).json({patientInfo,name});
    } catch (error) {
        console.error("error:",error);
        res.status(500).json({message:error});
    }
}

export const EditPatientProfile:RequestHandler=async(req,res)=>{
    const {authorization}=req.headers;
    const {phoneNumber,address,occupation,alternateContact,birthDate}=req.body;
    const Head=authorization;
    // console.log("Head:",Head);
    if (!Head) {
        return res.status(401).json({ message: "Authorization header is missing" });
    }
    const AuthHead:any=Head?.split(' ');
    const token=AuthHead[1];
    if (!token) {
        return res.status(401).json({ message: "token is missing" });
    }
    const decode=jwt.verify(token,JWT_SECRET) as JwtPayload;
    
    const PatientEmail=decode.email;
    
    try {
        const patientInfo=await Patient.findOne({email:PatientEmail});
        
        const PatientId=patientInfo?._id;
        const updatedPatient=await Patient.findOneAndUpdate({_id:PatientId},{phoneNumber,address,occupation,alternateContact,birthDate},{new:true});
        if(!updatedPatient){
            res.status(500).json({"message":"Failed to updated profile"});
        }
        res.status(200).json({message:"Profile updated succesfully",patient:updatedPatient});
    } catch (error) {
        console.error("error:",error);
        res.status(500).json({message:error});
    }
}