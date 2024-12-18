
import { useState } from "react";
import { ErrorContext } from "./ErrorContext"
import { useNavigate } from "react-router-dom";

const ErrorProvider = ({ children }) => {

    const [error, setError] = useState("null");
    const navigate = useNavigate();

    const throwError  = (err)=>{
        setError(err);
        navigate("/error");
    }

    return (

        <>
            <ErrorContext.Provider value={{error, throwError}}>
                {children}
            </ErrorContext.Provider>
        </>
    )

}

export default ErrorProvider;