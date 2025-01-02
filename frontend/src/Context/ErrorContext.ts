import { createContext } from "react";

import { ErrorContextType } from "../models/ErrorModels";


export const ErrorContext = createContext<ErrorContextType>({});