
const handleError = (err, req, res, next) => {

    console.log(err);

    const errorMessage = err.message || "Internal server error";
    const errorStatusCode = err.status || 500;
    const errorDetails = err.details || null;


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