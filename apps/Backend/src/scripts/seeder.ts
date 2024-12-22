import { Patient } from '../models/patient.model';
import { Doctor } from '../models/doctor.model';
import { Appointment } from '../models/appointment.model';

export const seedDatabase = async () => {
  const doctorCount = await Doctor.countDocuments();

  if (doctorCount > 0) {
    console.log('Database already seeded. Skipping seeding.');
    return;
  }

  console.log('Seeding database...');

  // Create multiple doctors
  const doctors = await Doctor.insertMany([
    {
      firstName: 'Alice',
      lastName: 'Smith',
      email: 'alice@example.com',
      gender: 'Female',
      specialization: 'Cardiology',
      password: 'password123',
    },
    {
      firstName: 'Bob',
      lastName: 'Johnson',
      email: 'bob@example.com',
      gender: 'Male',
      specialization: 'Dermatology',
      password: 'password456',
    },
    {
      firstName: 'Clara',
      lastName: 'Brown',
      email: 'clara@example.com',
      gender: 'Female',
      specialization: 'Pediatrics',
      password: 'password789',
    },
    {
      firstName: 'Daniel',
      lastName: 'Williams',
      email: 'daniel@example.com',
      gender: 'Male',
      specialization: 'Orthopedics',
      password: 'password101',
    },
  ]);

  // Create multiple patients
  const patients = await Patient.insertMany([
    {
      firstName: 'Emma',
      lastName: 'Taylor',
      email: 'emma@example.com',
      gender: 'Female',
      password: 'password202',
      doctorId: doctors[0]._id,
    },
    {
      firstName: 'James',
      lastName: 'Miller',
      email: 'james@example.com',
      gender: 'Male',
      password: 'password303',
      doctorId: doctors[1]._id,
    },
    {
      firstName: 'Olivia',
      lastName: 'Moore',
      email: 'olivia@example.com',
      gender: 'Female',
      password: 'password404',
      doctorId: doctors[2]._id,
    },
    {
      firstName: 'Liam',
      lastName: 'White',
      email: 'liam@example.com',
      gender: 'Male',
      password: 'password505',
      doctorId: doctors[3]._id,
    },
    {
      firstName: 'Sophia',
      lastName: 'Clark',
      email: 'sophia@example.com',
      gender: 'Female',
      password: 'password606',
      doctorId: doctors[0]._id,
    },
    {
      firstName: 'Noah',
      lastName: 'Lewis',
      email: 'noah@example.com',
      gender: 'Male',
      password: 'password707',
      doctorId: doctors[1]._id,
    },
  ]);

  // Create multiple appointments
  const appointments = [];
  for (let i = 0; i < patients.length; i++) {
    const patient = patients[i];
    const doctor = doctors.find((doc) => doc._id.toString() === patient.doctorId.toString());

    appointments.push({
      date: new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000), // Spread dates
      doctorId: doctor?._id,
      patientId: patient._id,
      startTime: new Date(new Date().getTime() + i * 60 * 60 * 1000),
      endTime: new Date(new Date().getTime() + (i + 1) * 60 * 60 * 1000),
      symptoms: 'Routine checkup',
      status: 'Scheduled',
    });
  }

  await Appointment.insertMany(appointments);

  console.log('Seeding completed successfully with:');
  console.log(`  - ${doctors.length} doctors`);
  console.log(`  - ${patients.length} patients`);
  console.log(`  - ${appointments.length} appointments`);
};
