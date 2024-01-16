import mongoose from "mongoose";

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`Database connected Successfully ${mongoose.connection.host}`.bgBlue)
    } catch (error) {
        console.log(`${error} database connection error`)
    }
}

export default dbConnection;