import { createGlobalStyle, css } from 'styled-components'

const colorPalate = css`
  --md-source: #b05900;
  /* primary */
  --md-ref-palette-primary0: #000000;
  --md-ref-palette-primary10: #301400;
  --md-ref-palette-primary20: #4f2500;
  --md-ref-palette-primary25: #602e00;
  --md-ref-palette-primary30: #713700;
  --md-ref-palette-primary35: #834000;
  --md-ref-palette-primary40: #944a00;
  --md-ref-palette-primary50: #b85f09;
  --md-ref-palette-primary60: #d87827;
  --md-ref-palette-primary70: #f9913f;
  --md-ref-palette-primary80: #ffb784;
  --md-ref-palette-primary90: #ffdcc6;
  --md-ref-palette-primary95: #ffede4;
  --md-ref-palette-primary98: #fff8f5;
  --md-ref-palette-primary99: #fffbff;
  --md-ref-palette-primary100: #ffffff;
  /* secondary */
  --md-ref-palette-secondary0: #000000;
  --md-ref-palette-secondary10: #2b1708;
  --md-ref-palette-secondary20: #422b1b;
  --md-ref-palette-secondary25: #4e3625;
  --md-ref-palette-secondary30: #5b412f;
  --md-ref-palette-secondary35: #684d3a;
  --md-ref-palette-secondary40: #755845;
  --md-ref-palette-secondary50: #90715c;
  --md-ref-palette-secondary60: #ab8a75;
  --md-ref-palette-secondary70: #c7a48e;
  --md-ref-palette-secondary80: #e4bfa8;
  --md-ref-palette-secondary90: #ffdcc6;
  --md-ref-palette-secondary95: #ffede4;
  --md-ref-palette-secondary98: #fff8f5;
  --md-ref-palette-secondary99: #fffbff;
  --md-ref-palette-secondary100: #ffffff;
  /* tertiary */
  --md-ref-palette-tertiary0: #000000;
  --md-ref-palette-tertiary10: #1b1d00;
  --md-ref-palette-tertiary20: #30330b;
  --md-ref-palette-tertiary25: #3c3e15;
  --md-ref-palette-tertiary30: #47491f;
  --md-ref-palette-tertiary35: #53552a;
  --md-ref-palette-tertiary40: #5f6135;
  --md-ref-palette-tertiary50: #787a4b;
  --md-ref-palette-tertiary60: #929462;
  --md-ref-palette-tertiary70: #adaf7b;
  --md-ref-palette-tertiary80: #c8ca94;
  --md-ref-palette-tertiary90: #e5e6ae;
  --md-ref-palette-tertiary95: #f3f4bb;
  --md-ref-palette-tertiary98: #fcfdc3;
  --md-ref-palette-tertiary99: #ffffd3;
  --md-ref-palette-tertiary100: #ffffff;
  /* neutral */
  --md-ref-palette-neutral0: #000000;
  --md-ref-palette-neutral10: #201a17;
  --md-ref-palette-neutral20: #362f2b;
  --md-ref-palette-neutral25: #413a36;
  --md-ref-palette-neutral30: #4d4541;
  --md-ref-palette-neutral35: #59514c;
  --md-ref-palette-neutral40: #655d58;
  --md-ref-palette-neutral50: #7e7570;
  --md-ref-palette-neutral60: #988f8a;
  --md-ref-palette-neutral70: #b4a9a4;
  --md-ref-palette-neutral80: #d0c4bf;
  --md-ref-palette-neutral90: #ece0da;
  --md-ref-palette-neutral95: #fbeee8;
  --md-ref-palette-neutral98: #fff8f5;
  --md-ref-palette-neutral99: #fffbff;
  --md-ref-palette-neutral100: #ffffff;
  /* neutral-variant */
  --md-ref-palette-neutral-variant0: #000000;
  --md-ref-palette-neutral-variant10: #241912;
  --md-ref-palette-neutral-variant20: #3a2e26;
  --md-ref-palette-neutral-variant25: #463930;
  --md-ref-palette-neutral-variant30: #52443b;
  --md-ref-palette-neutral-variant35: #5e5047;
  --md-ref-palette-neutral-variant40: #6a5b52;
  --md-ref-palette-neutral-variant50: #84746a;
  --md-ref-palette-neutral-variant60: #9f8d83;
  --md-ref-palette-neutral-variant70: #baa89d;
  --md-ref-palette-neutral-variant80: #d7c3b7;
  --md-ref-palette-neutral-variant90: #f3ded2;
  --md-ref-palette-neutral-variant95: #ffede4;
  --md-ref-palette-neutral-variant98: #fff8f5;
  --md-ref-palette-neutral-variant99: #fffbff;
  --md-ref-palette-neutral-variant100: #ffffff;
  /* error */
  --md-ref-palette-error0: #000000;
  --md-ref-palette-error10: #410002;
  --md-ref-palette-error20: #690005;
  --md-ref-palette-error25: #7e0007;
  --md-ref-palette-error30: #93000a;
  --md-ref-palette-error35: #a80710;
  --md-ref-palette-error40: #ba1a1a;
  --md-ref-palette-error50: #de3730;
  --md-ref-palette-error60: #ff5449;
  --md-ref-palette-error70: #ff897d;
  --md-ref-palette-error80: #ffb4ab;
  --md-ref-palette-error90: #ffdad6;
  --md-ref-palette-error95: #ffedea;
  --md-ref-palette-error98: #fff8f7;
  --md-ref-palette-error99: #fffbff;
  --md-ref-palette-error100: #ffffff;
  /* light */
  --md-sys-color-primary-light: #944a00;
  --md-sys-color-on-primary-light: #ffffff;
  --md-sys-color-primary-container-light: #ffdcc6;
  --md-sys-color-on-primary-container-light: #301400;
  --md-sys-color-secondary-light: #755845;
  --md-sys-color-on-secondary-light: #ffffff;
  --md-sys-color-secondary-container-light: #ffdcc6;
  --md-sys-color-on-secondary-container-light: #2b1708;
  --md-sys-color-tertiary-light: #5f6135;
  --md-sys-color-on-tertiary-light: #ffffff;
  --md-sys-color-tertiary-container-light: #e5e6ae;
  --md-sys-color-on-tertiary-container-light: #1b1d00;
  --md-sys-color-error-light: #ba1a1a;
  --md-sys-color-error-container-light: #ffdad6;
  --md-sys-color-on-error-light: #ffffff;
  --md-sys-color-on-error-container-light: #410002;
  --md-sys-color-background-light: #fffbff;
  --md-sys-color-on-background-light: #201a17;
  --md-sys-color-surface-light: #fffbff;
  --md-sys-color-on-surface-light: #201a17;
  --md-sys-color-surface-variant-light: #f3ded2;
  --md-sys-color-on-surface-variant-light: #52443b;
  --md-sys-color-outline-light: #84746a;
  --md-sys-color-inverse-on-surface-light: #fbeee8;
  --md-sys-color-inverse-surface-light: #362f2b;
  --md-sys-color-inverse-primary-light: #ffb784;
  --md-sys-color-shadow-light: #000000;
  --md-sys-color-surface-tint-light: #944a00;
  --md-sys-color-outline-variant-light: #d7c3b7;
  --md-sys-color-scrim-light: #000000;
  /* dark */
  --md-sys-color-primary-dark: #ffb784;
  --md-sys-color-on-primary-dark: #4f2500;
  --md-sys-color-primary-container-dark: #713700;
  --md-sys-color-on-primary-container-dark: #ffdcc6;
  --md-sys-color-secondary-dark: #e4bfa8;
  --md-sys-color-on-secondary-dark: #422b1b;
  --md-sys-color-secondary-container-dark: #5b412f;
  --md-sys-color-on-secondary-container-dark: #ffdcc6;
  --md-sys-color-tertiary-dark: #c8ca94;
  --md-sys-color-on-tertiary-dark: #30330b;
  --md-sys-color-tertiary-container-dark: #47491f;
  --md-sys-color-on-tertiary-container-dark: #e5e6ae;
  --md-sys-color-error-dark: #ffb4ab;
  --md-sys-color-error-container-dark: #93000a;
  --md-sys-color-on-error-dark: #690005;
  --md-sys-color-on-error-container-dark: #ffdad6;
  --md-sys-color-background-dark: #201a17;
  --md-sys-color-on-background-dark: #ece0da;
  --md-sys-color-surface-dark: #201a17;
  --md-sys-color-on-surface-dark: #ece0da;
  --md-sys-color-surface-variant-dark: #52443b;
  --md-sys-color-on-surface-variant-dark: #d7c3b7;
  --md-sys-color-outline-dark: #9f8d83;
  --md-sys-color-inverse-on-surface-dark: #201a17;
  --md-sys-color-inverse-surface-dark: #ece0da;
  --md-sys-color-inverse-primary-dark: #944a00;
  --md-sys-color-shadow-dark: #000000;
  --md-sys-color-surface-tint-dark: #ffb784;
  --md-sys-color-outline-variant-dark: #52443b;
  --md-sys-color-scrim-dark: #000000;
`

const lightTheme = css`
  ${colorPalate};

  /* primary */
  --primary: var(--md-ref-palette-primary40);
  --on-primary: var(--md-ref-palette-primary100);
  --primary-container: var(--md-ref-palette-primary90);
  --on-primary-container: var(--md-ref-palette-primary10);

  /* secondary */
  --secondary: var(--md-ref-palette-secondary40);
  --on-secondary: var(--md-ref-palette-secondary100);
  --secondary-container: var(--md-ref-palette-secondary90);
  --on-secondary-container: var(--md-ref-palette-secondary10);

  /* neutral */
  --background: var(--md-ref-palette-neutral99);
  --on-background: var(--md-ref-palette-neutral10);
  --surface-variant: var(--md-ref-palette-neutral-variant90);
  --on-surface-variant: var(--md-ref-palette-neutral-variant30);
  --outline: var(--md-ref-palette-neutral-variant50);
  --outline-variant: var(--md-ref-palette-neutral-variant80);

  /* error */
  --error: var(--md-ref-palette-error40);
  --on-error: var(--md-ref-palette-error100);
  --error-container: var(--md-ref-palette-error90);
  --on-error-container: var(--md-ref-palette-error10);
`

// noinspection CssInvalidPropertyValue
const GlobalStyle = createGlobalStyle`
  html {
    height: -webkit-fill-available;
  }
  
  body {
    ${lightTheme};
    
    font-family: "Lato", sans-serif;
    background: var(--background);

    display: flex;
    margin: 0;
    min-height: 100vh;
    min-height: -webkit-fill-available;
    width: 100vh;
    width: -webkit-fill-available;
  }
  
  #root {
    display: flex;
    flex-grow: 1;
    max-width: 100%;

    > div {
      display: flex;
      flex-grow: 1;
      max-width: 100%;
    }
  }
`

export default GlobalStyle
