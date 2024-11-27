import { setUser } from '../HelperFunction/Jwtokens.js';

const authenticateUser = (req, res, next) => {
    
    const token = req.headers.authorization?.split(" ")[1];  
    if (!token) {
        return res.status(403).json({ error: "Access Denied, No token provided" });
    }

    try {
        const decoded = setUser(token);
        req.user = decoded;
        next();  
    } catch (error) {
        console.error("Token error:", error);
        return res.status(401).json({ error: "Invalid or expired token" });
    }
};

export {authenticateUser};
