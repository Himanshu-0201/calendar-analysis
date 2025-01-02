import React from "react"
import { Outlet } from "react-router-dom"
import ErrorProvider from "../Context/ErrorProvider.tsx"

const RootLayOut = () => {

    return <>

        <ErrorProvider>
            <Outlet />
        </ErrorProvider>

    </>

}


export default RootLayOut;