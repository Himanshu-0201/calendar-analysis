
const handleError = (err, req, res, next) => {

    console.log(err);


    if (err) {

        // If the error is a CORS error, handle it here
        if (err.status === 403) {
            return res.status(403).json({
                message: err.message, // Custom error message
                error: "Forbidden" // You can include more details if needed
            });
        }



        // For other errors, pass them to the default error handler
        return res.status(500).json({
            message: "Internal Server Error",
            error: err.message
        });

    }
    else {

        console.log("I will let pass the request");
        next();
    }

}


export default handleError;