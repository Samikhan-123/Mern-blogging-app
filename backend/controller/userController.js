// userController.js
import userModel from "../models/userModel.js";

import bcrypt from "bcrypt"

import jwt from "jsonwebtoken";
import { OAuth2Client } from 'google-auth-library';

const GOOGLE_CLIENT_ID = '1084732114493-dd1srhfsog3f11iivd7ckppn9255j3gn.apps.googleusercontent.com';
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

// register users
export const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body

        //validation
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please Fill all Fields(username,email,password)"
            })
        }

        // if existing user find
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(422).json({
                success: false,
                message: "User with this email already exists. Please use a different email."
            })
        }

        // hash password for protection
        const hashPassword = await bcrypt.hash(password,10)

        // save user if everything fine
        const user = new userModel({ username, email, password : hashPassword })
        await user.save()
        return res.status(201).json({
            success: true,
            message: "User Successfully Created",
            user
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "error in Register",
            error:error.message
        })
    }
};



// login users
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(401).json({
                success: false,
                message: "Please Provide email and password",
            });
        }

        // email validation
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email is not registered"
            });
        }

        // password validation
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid password"
            });
        }

        // if everything is fine then login
        const token = jwt.sign({ userId: user._id, name: user.username, email: user.email }, 'yourSecretKey') ;
        console.log('Created Token:', token);
        return res.status(200).json({
            success: true,
            message: "Successfully Logged In",
            user,
            token
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Login Error, something went wrong",
            error: error.message
        });
    }
};


// get all users
export const getAllUsers = async (req, res) => {

    try {
        const users = await userModel.find({})
        return res.status(200).json({
            success: true,
            message: "Successfully get all Users",
            userCount: users.length,
            users
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Failed to get All Users",
            error
        }
        )
    }

};
 
// google oauth login verification



export const authenticateWithGoogle = async (idToken) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: GOOGLE_CLIENT_ID,
        });

        const { email, name } = ticket.getPayload();

        let user = await userModel.findOne({ email });

        if (!user) {
            // If the user doesn't exist, create a new user
            user = new userModel({ username: name, email });
            await user.save();
        }

        const token = jwt.sign({ userId: user._id, name: user.username, email: user.email }, 'yourSecretKey');

        return {
            success: true,
            message: "Successfully authenticated with Google",
            token,
            user,
        };
    } catch (error) {
        console.error("Google authentication error:", error);
        return {
            success: false,
            message: "Failed to authenticate with Google",
            error: error.message,
        };
    }
};
