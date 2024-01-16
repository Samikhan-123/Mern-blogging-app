// verifyToken.js
import jwt from 'jsonwebtoken';



const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({ success: false, message: 'Access denied. Token is missing.' });
    }

    try {
        const secretJWTAuthKey = process.env.JWT_SECRET_KEY || 'defaultSecretKey';
        const decoded = jwt.verify(token, secretJWTAuthKey);
        req.user = decoded; // Attach the decoded user information to the request object
        next(); // Continue to the next middleware or route handler
    } catch (error) {
        console.error(error);
        return res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};

export default verifyToken;
