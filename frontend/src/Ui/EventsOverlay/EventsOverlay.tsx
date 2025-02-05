import React from 'react';
import ReactDOM from 'react-dom';
import "./EventsOverlay.scss";

const BackDrop = ({onCloseOverlay})=>{
    return <div className="_event-overlay_backdrop" onClick = {onCloseOverlay}></div>
}


const ModalOverlays = ({children})=>{
    return <div className="_event-overlay_content">
        <div className="">{children}</div>
    </div>
}

const EventsOverlay = ({ children, onCloseOverlay}) => {

    const elementRender = document.getElementById("overlays");

    if (!elementRender) return null;

    return (<>
        {ReactDOM.createPortal(<BackDrop onCloseOverlay={onCloseOverlay} />, elementRender)}
        {ReactDOM.createPortal(<ModalOverlays>{children}</ModalOverlays>, elementRender)}
    </>)

};


export default EventsOverlay;