import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
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
    gender: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
        select :false
    },
    birthDate: {
        type: Date
    },
    bloodGroup: {
        type:String,
    },
    phoneNumber:{
        type:Number
    },
    occupation:{
        type:String
    },
    alternateContact:{
        type:Number
    },
    address:{
        type:String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor"
    },

    appointments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment"
    }]
});

export const Patient = mongoose.model("Patient", patientSchema);
