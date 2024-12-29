
import "./LayOut.scss";


const LayOut = ({ children }) => {


    return (

        <>
            <div className="_layout_container shadow-sm">
                {children}
            </div>
        </>

    );
};


export default LayOut;