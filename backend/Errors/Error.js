import { FAILED_AUTH } from "../config.js";

const handleError = (err, req, res, next) => {


    const errorMessage = err.message || "Internal server error";
    const errorStatusCode = err.status || 500;
    const errorDetails = err.details || null;
    // const isLoggedIn = err.isLoggedIn;


    if(errorStatusCode === 403){
        return res.redirect(FAILED_AUTH);
    }
    else if(errorStatusCode === 401){
        console.log("Auth failed");
    }
    else{
        console.log(err);
    }


    if (err) {

        return res.status(errorStatusCode).json({
            message : errorMessage,
            details : errorDetails
        })
    }
    else {

        console.log("request is comming in handleError function");
        next();
    }

}


export default handleError;