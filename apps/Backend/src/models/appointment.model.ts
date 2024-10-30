import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
        required: true
    },
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
