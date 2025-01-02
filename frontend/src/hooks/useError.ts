import { useContext } from "react"
import { ErrorContext } from "../Context/ErrorContext.ts";

export const useError = ()=>{
    return useContext(ErrorContext);
}