
import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
    const token = req.headers.authorization; //  the token is sent in the Authorization header

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'Unauthorized: no token provided',
        });
    }

    // Verify the token
    jwt.verify(token.split(' ')[1], 'yourSecretKey', (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                message: 'Unauthorized: Invalid token',
                token: token,
                error: err,
            });
        }

        // console.log('Decoded User:', decoded);
        req.user = decoded;
        next();
    });
};

export default verifyToken;
