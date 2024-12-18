
import { Outlet } from "react-router-dom"
import ErrorProvider from "../Context/ErrorProvider"

const RootLayOut = () => {

    return <>

        <ErrorProvider>
            <Outlet />
        </ErrorProvider>

    </>

}


export default RootLayOut;