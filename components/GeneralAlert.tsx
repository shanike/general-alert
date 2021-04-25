import React from 'react'
import { IsPopup, ShowAlert } from '../types/general-alert.types';

import './GeneralAlert.scss'

interface GeneralAlertProps extends ShowAlert {
    visible: boolean;
}

export const GeneralAlert: React.FC<Partial<GeneralAlertProps>> = ({ visible, text, warning, center, isPopup, noTimeout = false }) => {
    if (typeof text === "string" && isPopup && typeof isPopup === "object") return <GeneralPopup text={text} {...isPopup as IsPopup} />

    return (
        <div id="general-alert-container" className={`${visible ? "visible" : "invisible"} ${warning ? "warning-color" : "default-color"} ${center ? "center" : ""} ${noTimeout ? "" : "timeout-animation"}`} >
            {text}
        </div>
    );
}

interface GeneralPopupProps extends IsPopup {
    text: string;
}

export const GeneralPopup: React.FC<GeneralPopupProps> = ({ text, okayText, cancelText, closeSelf, popupCb: cb }) => {

    return (
        <div id="popup-alert-full-window" >
            <div className="popup-alert-container">
                <h3 id="popup-text" >{text}</h3>
                <div className="popup-buttons-container" >
                    {cancelText ? <button onClick={() => { cb && typeof cb === "function" && cb(false); closeSelf() }} className="popup-cancel" ><h4>{typeof cancelText === "string" ? cancelText : "ביטול"}</h4></button> : null}
                    {okayText ? <button onClick={() => { cb && typeof cb === "function" && cb(true); closeSelf() }} className="popup-okay" ><h4>{typeof okayText === "string" ? okayText : "אישור"}</h4></button> : null}
                </div>
            </div>
        </div>
    )
}
