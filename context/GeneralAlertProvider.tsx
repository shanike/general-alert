import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { GeneralAlert } from '../components/GeneralAlert';
import { GenAlertCtxValue, PopupShowAlert, PopupCB, ShowAlert } from '../types/general-alert.types'


const GenAlertContext = createContext<GenAlertCtxValue | null>(null);

export const useGenAlert = () => useContext(GenAlertContext)!;
// docs: https://github.com/shanike/general-alert
//! does not yet support mobile styling I think

export const GenAlertProvider: React.FC = ({ children }) => {
    let alertTO = useRef<NodeJS.Timeout | null>(null);

    const [showAlert, setShowAlert] = useState<null | ShowAlert>(null)

    const closeAlert = useCallback(() => {
        setShowAlert(null)
    }, [])

    const openGenAlertSync = useCallback(async (obj: PopupShowAlert): Promise<boolean | null> => {
        if (typeof obj !== "object" || Array.isArray(obj))
            return null;

        if (alertTO.current)
            clearTimeout(alertTO.current)
        return await new Promise((resolve, _reject) => {
            const popupCb = (res: boolean) => { resolve(res) }
            const alertObj: ShowAlert = { text: obj.text, warning: obj.warning || false, noTimeout: obj.noTimeout || false }
            if (obj.isPopup) {
                if (typeof obj.isPopup === "object") {
                    alertObj.isPopup = { ...obj.isPopup, popupCb, closeSelf: () => { setShowAlert(null) } }
                }
                else {
                    alertObj.isPopup = { popupCb, closeSelf: () => { setShowAlert(null) } }
                }
            }
            setShowAlert(alertObj)
            if (!obj.isPopup && !obj.noTimeout) {
                alertTO.current = setTimeout(closeAlert, 5000);
            }
        })
    }, [alertTO, closeAlert]);

    const openGenAlert = useCallback((obj: ShowAlert, popupCb: PopupCB = () => { }) => {
        if (typeof obj !== "object" || Array.isArray(obj)) { console.error("GenAlert: provided value is not valid"); return; }

        if (alertTO.current) { clearTimeout(alertTO.current); closeAlert() }
        const alertObj: ShowAlert = { text: obj.text, warning: obj.warning || false, center: obj.center || true, noTimeout: obj.noTimeout || false };

        if (obj.isPopup) {
            if (typeof obj.isPopup === "object") {
                alertObj.isPopup = { ...obj.isPopup, popupCb, closeSelf: () => { setShowAlert(null) } }
            }
            else {
                alertObj.isPopup = { popupCb, closeSelf: () => { setShowAlert(null) } }
            }
        }
        setShowAlert(alertObj);
        if (!obj.isPopup && !obj.noTimeout) {
            alertTO.current = setTimeout(closeAlert, 5000);
        }
    }, [alertTO, closeAlert]);


    return <GenAlertContext.Provider value={{ openGenAlertSync, openGenAlert, closeAlert }}>
        {children}
        <GeneralAlert visible={!!showAlert} {...showAlert} />
    </GenAlertContext.Provider>
}