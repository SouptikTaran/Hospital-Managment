import mongoose from "mongoose";


export const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined");
        }

        const conn = await mongoose.connect(mongoURI);
        console.log(`Connected with ${conn.connection.name} DB`);
    } catch (error) {
        // Type assertion to make TypeScript recognize error as Error type
        console.error(`Error : ${(error as Error).message}`);
        process.exit(1);
    }
};
