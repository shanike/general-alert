
export interface ShowAlert {
    text: string;
    warning?: boolean;
    center?: boolean;
    isPopup?: IsPopup;
    noTimeout?: boolean;
    block?: boolean;
}
export interface IsPopup {
    okayText: string;
    cancelText: string;
    closeSelf: () => void;
    popupCb: PopupCB;
}
export interface GenAlertCtxValue {
    openGenAlertSync: (obj: ShowAlert) => Promise<boolean | null>;
    openGenAlert: (obj: ShowAlert) => void;
    closeAlert: () => void;
}
export type PopupCB = (res: boolean) => void

export interface GeneralAlertProps extends ShowAlert {
    visible: boolean;
}