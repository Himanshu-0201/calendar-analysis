import jwt from "jsonwebtoken";

const authToken = (req, res, next)=>{

    const token = req.cookies.token || req.headers['authorization']; // why to use headers


    if (!token) {

        const error = new Error("Access Denied. No token provided.");
        error.status = 401;
        return next(error);
        
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Store user info in request
        next();
        
    } catch (err) {

        const error = new Error(err);
        error.status = 401;
        error.message = "Invalid Token";
        next(error);

    }
}

export default authToken;