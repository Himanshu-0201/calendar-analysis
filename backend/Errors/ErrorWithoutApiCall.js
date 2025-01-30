import { errorMail } from "./ErrorMail.js";


const handleErrorWithoutApiCall = (err) => {

    if(!err){
        console.log("Unknow error occured");
        return ;
    }

    const errorMessage = err.message || "Internal server error";
    const errorStatusCode = err.status || 500;
    const errorDetails = err.details || null;


    if(errorStatusCode === 403){
        console.log("You are not allowed to access this server");
    }
    else if(errorStatusCode === 401){
        console.log("Auth failed");
    }
    else{
        console.log(err);
        errorMail(errorMessage);
    }




};


export default handleErrorWithoutApiCall;