import React from 'react'
import { IsPopup } from '../types/general-alert.types';
import { GeneralAlertProps } from '../types/general-alert.types';

import './GeneralAlert.scss'



export const GeneralAlert: React.FC<GeneralAlertProps> = ({ visible, text, warning, center, isPopup, noTimeout = false }) => {
    // if (typeof text !== "string") { return null; }
    if (!visible) return null
    if (typeof text === "string" && isPopup) return <GeneralPopup text={text} {...isPopup} />

    return (
        <div id="general-alert-container" className={`${warning ? "warning-color" : "default-color"} ${center ? "center" : ""} ${noTimeout ? "" : "timeout-animation"}`} >
            {text}
        </div>
    );
}

interface GeneralPopupProps extends IsPopup {
    text: string
}

export const GeneralPopup: React.FC<GeneralPopupProps> = ({ text, okayText, cancelText, closeSelf, popupCb: cb }) => {

    return (
        <div id="popup-alert-full-window" >
            <div className="popup-alert-container">
                <h3 id="popup-text" >{text}</h3>
                <div className="popup-buttons-container" >
                    {cancelText ? <button onClick={() => { cb && typeof cb === "function" && cb(false); closeSelf() }} className="popup-cancel" ><h4>{cancelText || "בטל"}</h4></button> : null}
                    <button onClick={() => { cb && typeof cb === "function" && cb(true); closeSelf() }} className="popup-okay" ><h4>{okayText || "אשר"}</h4></button>
                </div>
            </div>
        </div>
    )
}
