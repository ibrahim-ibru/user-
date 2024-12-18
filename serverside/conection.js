import mongoose from "mongoose";

export default async function connection() {
    const db=mongoose.connect(process.env.DB_URL+process.env.DB_NAME)
    console.log("Database successfully connected");
    return db
    
}