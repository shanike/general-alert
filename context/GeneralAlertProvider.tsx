import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { GeneralAlert } from '../components/GeneralAlert';
import { GenAlertCtxValue, PopupCB, ShowAlert } from '../types/general-alert.types'

const GenAlertContext = createContext<GenAlertCtxValue | null>(null);

export const useGenAlert = () => useContext(GenAlertContext)!;

export const GenAlertProvider: React.FC = ({ children }) => {
    let alertTO = useRef<NodeJS.Timeout | null>(null).current;

    const [showAlert, setShowAlert] = useState<null | ShowAlert>(null)

    const closeAlert = useCallback(() => {
        setShowAlert(null)
    }, [])

    const openGenAlertSync = useCallback(async (obj: ShowAlert): Promise<boolean | null> => {
        if (typeof obj !== "object" || Array.isArray(obj))
            return null;
        if (alertTO)
            clearTimeout(alertTO)
        return await new Promise((resolve, reject) => {
            const popupCb = (res: boolean) => { resolve(res) }
            const alertObj: ShowAlert = { text: obj.text, warning: obj.warning || false, noTimeout: obj.noTimeout || false, block: obj.block }
            if (obj.isPopup) {
                alertObj.isPopup = { ...obj.isPopup, popupCb, closeSelf: () => { setShowAlert(null) } }
            }
            setShowAlert(alertObj)
            if (!obj.isPopup && !obj.noTimeout) {
                alertTO = setTimeout(closeAlert, 5000);
            }
        })
    }, []);

    const openGenAlert = useCallback((obj: ShowAlert, popupCb: PopupCB = () => { }) => {
        if (typeof obj !== "object" || Array.isArray(obj)) { console.error("GenAlert: provided value is not valid"); return; }
        if (alertTO) { clearTimeout(alertTO); closeAlert() }
        const alertObj: ShowAlert = { text: obj.text, warning: obj.warning || false, center: obj.center || false, noTimeout: obj.noTimeout || false, block: obj.block };
        if (obj.isPopup) {
            alertObj.isPopup = { ...obj.isPopup, popupCb, closeSelf: () => { setShowAlert(null) } };
        }
        setShowAlert(alertObj);
        if (!obj.isPopup && !obj.noTimeout) {
            alertTO = setTimeout(closeAlert, 5000);
        }
    }, []);

    return <GenAlertContext.Provider value={{ openGenAlertSync, openGenAlert, closeAlert }}>
        {children}
        <GeneralAlert visible={!!showAlert} {...showAlert} />
    </GenAlertContext.Provider>
}