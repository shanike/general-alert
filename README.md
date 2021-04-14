# general-alert
A general alert provider to use in a React JS project

### What have we here?
1) A GeneralAlert component and a GeneralPopup component (in ```components/GeneralAlert.tsx```)
2) A ```GeneralAlert.scss``` file for styling the GeneralAlert and the GeneralPopup (```components/GeneralAlert.scss```)
3) A context Provider (```context/GenAlertProvider.tsx```) (exports a Provider and a Hook)
4) A ```general-alert.types.ts``` file for context + components

### Usage:

1) Copy ```GeneralAlert.tsx``` file and ```GeneralAlert.scss``` files from ```components/``` folder into **your project**
2) Copy ```GeneralAlertProvider``` file into your project
3) Wrap your project with the ```GeneralAlertProvider``` (exported from ```GeneralAlertProvider.tsx```)
4) In a component inside your project you may use the generalAlert hook: useGenAlert() (exported from ```GeneralAlertProvider.tsx```)
5)
```tsx
    import { useGenAlert } from '....../generalAlertProvider'; // a copy of context/GeneralAlertProvider.tsx

    // ...

    const { openGenAlert } = useGenAlert();
    // ...
    openGenAlert({ text: "my first alert" });
    const userRes = await openGenAlertSync({ text: "my first popup!", isPopup: { okayText:"got it!", cancelText:"cancel..." } });
```

#### * You may change it from .ts, .tsx to .js, .jsx
#### * You may change any file you **copied**, especially the .scss file - to match your project's UI

## HOW TO USE openGenAlert function:
// todo