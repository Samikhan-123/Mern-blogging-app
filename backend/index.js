import express from "express";
import morgan from "morgan";
import colors from "colors";
import cors from "cors";
import dotenv from "dotenv";
import dbConnection from "./config/dbConnection.js";
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Get the current filename
const __filename = fileURLToPath(import.meta.url);

// Get the directory name
const __dirname = dirname(__filename);

// user Routes
import userRouter from "./routes/userRoutes.js";
// blog Routes
import blogRouter from "./routes/blogRoutes.js";
import path from 'path';
// Env config
dotenv.config();

// DB connection
dbConnection();

// Making express server
const app = express(); 

// Using middlewares

app.use(cors({credentials:true}));
app.use(express.json());
app.use(morgan("dev"));
// Making routes

app.use("/api/v1/user", userRouter);
app.use("/api/v1/blog", blogRouter);
app.use((req, res) => {
    res.status(404).send('Route Not Found Here');
});
app.use(express.static(path.join(__dirname, '../frontend/dist')));
app.get('*', (req, res)=> {
    res.sendFile(path.join(__dirname,'../frontend/dist/index.html'))
})

const port = process.env.PORT || 8080; 

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
