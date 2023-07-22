import mongoose from "mongoose";

export default async function connectDB(){
    try {
        await mongoose.connect(<string>process.env.DATABASE_URI)
        return console.info("Successfully connected to database");
    } catch (error) {
        console.error('Error connecting to database: ', error);
        return process.exit(1);
    }
}