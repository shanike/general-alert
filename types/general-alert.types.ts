
export interface ShowAlert {
    text: string;
    warning?: boolean;
    center?: boolean;
    isPopup?: true | Partial<IsPopup>;
    noTimeout?: boolean;
};
export interface PopupShowAlert extends Omit<ShowAlert, 'center'> {
    isPopup: Partial<IsPopup> | true;
};

export interface IsPopup {
    okayText: string | boolean;
    cancelText: string | boolean;
    closeSelf: () => void;
    popupCb: PopupCB;
};
export interface GenAlertCtxValue {
    openGenAlertSync: (obj: PopupShowAlert) => Promise<boolean | null>;
    openGenAlert: (obj: ShowAlert, popupCb?: PopupCB) => void;
    closeAlert: () => void;
};
export type PopupCB = (res: boolean) => void

export interface GeneralAlertProps extends ShowAlert {
    visible: boolean;
}