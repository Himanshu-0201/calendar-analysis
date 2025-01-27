import React from "react";
import ReactDOM from "react-dom";

import "./Overlay.scss";


// overlay interfaces

interface OverlayProps {
    onClose: () => void;
    children: React.ReactNode;
}

interface OverlayContentProps {
    children: React.ReactNode;
}

interface BackDropProps { 
    onClose: () => void;
}

const BackDrop : React.FC<BackDropProps> = (props) => {
    return <div className="_overlay_backdrop" onClick={props.onClose}></div>
}


const OverlayContent : React.FC<OverlayContentProps> = (props) => {
    return (
        <div className="overLay_content">
            <div className="">{props.children}</div>
        </div>
    )
}




const Overlay : React.FC<OverlayProps> = (props) => {

   

    return (
        <>
            <BackDrop onClose={props.onClose} />
            <OverlayContent>{props.children}</OverlayContent>
        </>
    )

}


export default Overlay;