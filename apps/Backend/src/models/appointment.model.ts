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
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
    symptoms: {
        type: String,
        require: false
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


appointmentSchema.pre('save', async function (next) {
    const doctor = await mongoose.model('Doctor').findById(this.doctorId);
    const patient = await mongoose.model('Patient').findById(this.patientId);
    if (!doctor || !patient) {
        return next(new Error("Invalid doctorId or patientId"));
    }
    next();
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
