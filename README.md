# general-alert
A general alert provider to use in a React JS project

### Table of Contents
**[What have we here? (overview)](#what-have-we-here)**<br>
**[Usage: (steps to do)](#usage)**<br>
**[HOW TO USE openGenAlert function:](#using-the-different-functions)**<br>
**[types](#types)**<br>

**[Notes and Miscellaneous](#notes-and-miscellaneous)**<br>
**[Building the Extension Bundles](#building-the-extension-bundles)**<br>
**[Next Steps, Credits, Feedback, License](#next-steps)**<br>



#### * You may change it from .ts and .tsx to .js and .jsx
#### * You may change any file you **copied**, especially the .scss file - to match your project's UI


## What have we here? (overview)
1) A GeneralAlert component and a GeneralPopup component (in ```components/GeneralAlert.tsx```)
2) A ```GeneralAlert.scss``` file for styling the GeneralAlert and the GeneralPopup (```components/GeneralAlert.scss```)
3) A context Provider (```context/GenAlertProvider.tsx```) (exports a Provider and a Hook)
4) A ```general-alert.types.ts``` file for context + components

## Usage: (steps to do)

1) Copy ```GeneralAlert.tsx``` file and ```GeneralAlert.scss``` files from ```components/``` folder into **your project**
2) Copy ```GeneralAlertProvider``` file into your project
3) Wrap your project with the ```GeneralAlertProvider``` (exported from ```GeneralAlertProvider.tsx```)
4) In a component inside your project you may use the generalAlert hook: ```useGenAlert()``` (exported from ```GeneralAlertProvider.tsx```)
5)
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
**open a popup**: (dialog with the use)
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
(does not reject)

## types:
### openGenAlert:
```tsx
/** 
 * @Prop obj:{
     @Obj_Prop text :string alert text
     @Obj_Prop warning :boolean (for alerts only) will color the alert red-ish, 
     @Obj_Prop center :boolean (for alerts only) if false, will show the alert in the bottom left of the screen (defaults to true)
     @Obj_Prop noTimeout :boolean (for alerts only) if true the alert will not disappear after 5 sec
     @Obj_Prop okayText :string | boolean(for popups only) text value for "okay" button in popup, default is "אישור"
     @Obj_Prop cancelText :string | boolean (for popups only) text value for "cancel" button in popup, default is "ביטול"
 * } 
   * @Prop popupCb :Function (for popups only) - is used only if got obj.isPopup, returnes the user's answer (in the popup there 
            could be two buttons:  "okay" (true) or "cancel" (false) )
*/
```

### openGenAlertSync:
same props as openGenAlert, except popupCb is not expected
useful for popup
you can use it as so: 
```tsx
let userAccepts:boolean = await openGenAlertSync({ text, isPopup: { okayText: "מתאים לי", cancelText: "בטל" } })
```
* another way is to pass a callback to openGenAlert func
