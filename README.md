# general-alert
A general-alert component which is managed by React's Context/Provider api, to use in a React project.
(Written in TypeScript)


**[What have we here:](#What-have-we-here)**<br>
**[HOT TO add to my project:](#HOW-TO-add-to-my-project)**<br>
**[HOW TO USE openGenAlert function:](#HOW-TO-USE-openGenAlert-function)**<br>
**[types](#types)**<br>



#### * You may change it from .ts and .tsx to .js and .jsx
#### * You may change any file you **copied**, especially the .scss file - to match your project's UI


## What have we here:
### overview of the fiels in the repository:
1) A GeneralAlert component and a GeneralPopup component (in ```components/GeneralAlert.tsx```)
2) A ```GeneralAlert.scss``` file for styling the GeneralAlert and the GeneralPopup (```components/GeneralAlert.scss```)
3) A context Provider (```context/GenAlertProvider.tsx```) (exports a Provider and a Hook)
4) A ```general-alert.types.ts``` file for context + components

## HOW TO add to my project:
### steps to do:

1) Copy ```GeneralAlert.tsx``` file and ```GeneralAlert.scss``` files from ```components/``` folder into **your project**
2) copy ```general-alert.types.ts``` file into **your project**
3) Copy ```GeneralAlertProvider``` file into **your project**
4) Wrap your project with the ```GenAlertProvider``` (exported from ```GeneralAlertProvider.tsx```)
5) In a component inside your project you may use the generalAlert hook: ```useGenAlert()``` (exported from ```GeneralAlertProvider.tsx```)
6)
```tsx
    import { useGenAlert } from '....../generalAlertProvider'; // a copy file of the context/GeneralAlertProvider.tsx file from this repository

    // ... in React component :
    const { openGenAlert } = useGenAlert();
    
    // ... in function, or wherever in the component :
    openGenAlert({ text: "my first alert" });
    // or: (more about the different functions ahead)
    const userRes = await openGenAlertSync({ text: "my first popup!", isPopup: { okayText:"got it!", cancelText:"cancel..." } });
```



## HOW TO USE openGenAlert function:

### EXAMPLE:
remider to first of all get the context: 

```tsx
const genAlertCtx = useGenAlert()
// or: recommended: get functions straight away
const { openGenAlert } = useGenAlert()
```
**open an alert**: (nice text at the bottom center of the screen)
```tsx
    openGenAlert({ text: "user info was updated successfully" });
```
**open a popup**: (dialog with the user)
```tsx
    openGenAlert({ text: "are you sure?", isPopup: { okayText: "yes", cancelText:"no, I take that back" } });
```
**and to get the user's answer add:**

1:
```tsx
    openGenAlert({ text: "are you sure?", isPopup: { okayText: "yes", cancelText:"no, I take that back" } }, (answer) => {  } );
```
or 2: *use openGenAlertSync* which returns a Promise
```tsx
const { openGenAlertSync } = useGenAlert()
// ...
let answer = await openGenAlertSync({ text: "are you sure?", isPopup: { okayText: "yes", cancelText:"no, I take that back" } });
```
(does not reject -- no need for try/catch)

## types:
### openGenAlert:
```ts
    prop 1: 
    obj: {
        text :string // alert text
        warning :boolean // (for alerts only) will color the alert red-ish, 
        center :boolean // (for alerts only) if false, will show the alert in the bottom left of the screen (defaults to true)
        noTimeout :boolean // (for alerts only) if true the alert will not disappear after 5 sec
        okayText :string | boolean // (for popups only) text value for "okay" button in popup, default is "אישור"
        cancelText :string | boolean // (for popups only) text value for "cancel" button in popup, default is "ביטול"
    }
    prop 2: 
    popupCb: (res: boolean) => void // (for popups only) - returnes the user's answer (in the popup there
                      // could be two buttons: "okay" (true) or "cancel" (false)
```

### openGenAlertSync:
same props as openGenAlert, except some props in obj are not expected (e.g. don't need: popupCb, center, warning, noTimeout)
```tsx
    prop 1 (and only):
    obj: {
        text :string // same as openGenAlert
        isPopup: {
            okayText :string | boolean // same as openGenAlert
            cancelText :string | boolean // same as openGenAlert
        }
    }
```
**useful for popup**
you can use it as so: 
```tsx
let userAccepts:boolean = await openGenAlertSync({ text, isPopup: { okayText: "מתאים לי", cancelText: "בטל" } })
```
* another way is to pass a callback to openGenAlert func
