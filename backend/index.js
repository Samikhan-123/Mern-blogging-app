import express from "express";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";

// user Routes
import userRouter from "./routes/userRoutes.js";
// blog Routes
import blogRouter from "./routes/blogRoutes.js";
// Env config
dotenv.config();

// DB connection
dbConnection();

// Making express server
const app = express(); 

// Using middlewares

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
// Making routes

app.get('/', (req, res) => {
    res.json('hello backend live')
})
app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use((req, res) => {
    res.status(404).send('Route Not Found');
});
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


const port = process.env.PORT || 8080; 

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
