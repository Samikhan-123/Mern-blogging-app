import mongoose from "mongoose";

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_URL);
        console.log(`Database connected Successfully ${mongoose.connection.host}`.bgBlue)
        // console.log(`Database URL: ${process.env.DB_URL}`);

    } catch (error) {
        console.log(`${error} database connection error`)
    }
}

export default dbConnection;