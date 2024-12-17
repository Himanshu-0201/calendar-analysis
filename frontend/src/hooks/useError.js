import { useContext } from "react"
import { ErrorContext } from "../Context/ErrorContext";

export const useError = ()=>{
    return useContext(ErrorContext);
}