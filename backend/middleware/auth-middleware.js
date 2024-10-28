import jwt from "jsonwebtoken";

const authToken = (req, res, next)=>{

    const token = req.cookies.token || req.headers['authorization']; // why to use headers


    if (!token) {
        console.log("token unvaild")
        return res.status(401).json({ message: 'Access Denied. No token provided.' });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user info in request


        next();
        
    } catch (error) {
        res.status(400).json({ message: 'Invalid Token' });
    }
}

export default authToken;