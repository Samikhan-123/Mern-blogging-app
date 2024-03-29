
// authMiddleware.js

const passwordAuth = (req, res, next) => {
    const providedPassword = req.query.password; 

    // Check if the provided password matches the expected password
    const expectedPassword = process.env.ADMIN_PASSWORD || "admin"; 
    if (providedPassword !== expectedPassword) {
        return res.status(401).json({ success: false, message: 'Access denied. use password.' });
    }

    next();
};

export default passwordAuth ;