import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        select: false
    },
    gender: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    patients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Patient"
        }
    ],
    appointments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Appointment"
        }
    ]
});

export const Doctor = mongoose.model("Doctor", doctorSchema);
