
import React, { useState } from "react";
import { ErrorContext } from "./ErrorContext.ts";
import { useNavigate } from "react-router-dom";
import { ErrorType } from "../models/ErrorModels.ts";

const ErrorProvider = ({ children }) => {

    const [error, setError] = useState<ErrorType | null>(null);
    const navigate = useNavigate();

    const throwError  = (err : ErrorType)=>{
        setError(err);
        navigate("/error");
    }

    return (

        <React.Fragment>
            <ErrorContext.Provider value={{error, throwError}}>
                {children}
            </ErrorContext.Provider>
        </React.Fragment>
    )

}

export default ErrorProvider;