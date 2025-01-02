
export interface ErrorType {
    message: string,
    status :  number | string
}

export interface ErrorContextType {
    error? : ErrorType | null,
    throwError?: (err: ErrorType)=>void
}