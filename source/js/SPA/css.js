// // Get the :root styles
// const rootStyles = document.querySelector(':root');
// // Set/Update new values
// rootStyles.style.setProperty("--color-success", "hsla(211.059, 100%, 50%, 1)");

// // Compute the :root styles
// const computedRootStyles = getComputedStyle(rootStyles);
// // Get computed value
// console.log(computedRootStyles.getPropertyValue("--color-success"));

// background -> middleground -> foreground

"use strict";

export default class CSS{
  // Color Modes
  static colorModes = Object.freeze({
    DARK: 1,
    LIGHT: 2
  });

  // Color Mode Default: Dark Mode
  static currentColorMode = CSS.colorModes.DARK;

  static colorModeSwitcherIcon = null;

  //////////// APIs
  // Init
  static init(){
    Log.info("CSS.init()");

    CSS.colorModeSwitcherIcon = document.querySelector(`${Menu.selector} > header > x-icon[for=colorModeSwitcher]`);

    CSS.#loadColorBrand();
    CSS.detectColorMode();
    CSS.#onColorModeChange();
    CSS.#handleColorModeToggle();
  }

  // Get CSS value
  static getValue(variable){
    return getComputedStyle(document.querySelector(':root')).getPropertyValue(variable);
  }

  ///// Load Brand Color From Configurations File
  static #loadColorBrand(){
    // Update CSS color main
    const rootStyles = document.querySelector(':root');

    rootStyles.style.setProperty("--color-main-hue", `${window.CONF.default.color.brand.hue || 230}deg`);
    rootStyles.style.setProperty("--color-main-saturation", `${window.CONF.default.color.brand.saturation || 13}%`);
    rootStyles.style.setProperty("--color-main-lightness", `${window.CONF.default.color.brand.lightness || 9}%`);
  }

  ///// Color Mode
  // Detect Color Mode
  static detectColorMode(){
    // Get User Preferred Color Mode
    if(
      // If User Is In Session
      "user" in window.session &&

      // If Session User Has "app_color_mode"
      "app_color_mode" in window.session["user"] &&

      // If "app_color_mode" Is In CSS.colorModes
      Object.values(CSS.colorModes).includes(window.session["user"]["app_color_mode"])

    ) CSS.currentColorMode = window.session["user"]["app_color_mode"];

    // Get saved color mode to the local storage
    // NOTE: Prevents emulation of the color scheme via devtools
    else if(localStorage.getItem("x.app_color_mode"))
      CSS.currentColorMode = parseInt(localStorage.getItem("x.app_color_mode"));

    // Get System Color Mode
    else if(window.matchMedia){
      // System Default: Light
      if(window.matchMedia('(prefers-color-scheme: light)').matches) CSS.currentColorMode = CSS.colorModes.LIGHT;

      // System Default: Dark
      else CSS.currentColorMode = CSS.colorModes.DARK;
    }

    // Switch the color mode
    // Set color mode switcher icon "name" and "toggle" values
    switch(CSS.currentColorMode){
      case CSS.colorModes.LIGHT:
        CSS.#light();
        CSS.colorModeSwitcherIcon.name = "dark_mode";
        CSS.colorModeSwitcherIcon.toggle = "light_mode";
        break;

      // If we add more color modes we will uncommend the code below and add more cases
      // case CSS.colorModes.DARK:
      //     CSS.#dark();
      //     CSS.colorModeSwitcherIcon.name = "light_mode";
      //     CSS.colorModeSwitcherIcon.toggle = "dark_mode";
      //     break;

      default:
        CSS.#dark();
        CSS.colorModeSwitcherIcon.name = "light_mode";
        CSS.colorModeSwitcherIcon.toggle = "dark_mode";
    }
  }

  // On System Color Mode Changes - Listen To Color Mode Changes
  static #onColorModeChange(){window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", CSS.detectColorMode);}

  // Handles color mode switching to dark and light modes using x-icon in menu
  static #handleColorModeToggle(){
    // A Reminder to My Future Self :)
    // We do not have to apply name and toggle values like we did in CSS.detectColorMode().
    // Default toggler handles well icon changes since we are only using x-icon to toggle the color modes in this method

    CSS.colorModeSwitcherIcon.addEventListener("click", ()=>{
      switch(CSS.currentColorMode){
        case CSS.colorModes.DARK: CSS.#light(); break;
        // If we add more color modes we will uncommend the code below and add more cases
        // case CSS.colorModes.LIGHT:CSS.#dark(); break;
        default: CSS.#dark();
      }
    });
  }

  // Save color mode to the database or to the local storage
  static async #saveColorMode(){
    if("user" in window.session)
      await window.bridge("API", {for:"changeUserAppColorMode", colorMode: CSS.currentColorMode}, "application/json");

    else localStorage.setItem('x.app_color_mode', CSS.currentColorMode);
  }

  //////////// Modes
  static #dark(){
    Log.info("CSS.#dark()");

    CSS.currentColorMode = CSS.colorModes.DARK;
    CSS.#saveColorMode();

    const rootStyles = document.querySelector(':root');
    const hue = getComputedStyle(rootStyles).getPropertyValue("--color-main-hue");

    rootStyles.style.setProperty("--color-main-tint-1", `hsla(${hue}, 10%, 10%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-2", `hsla(${hue}, 10%, 15%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-3", `hsla(${hue}, 10%, 20%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-4", `hsla(${hue}, 10%, 25%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-5", `hsla(${hue}, 10%, 30%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-6", `hsla(${hue}, 10%, 35%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-7", `hsla(${hue}, 10%, 50%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-8", `hsla(${hue}, 10%, 65%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-9", `hsla(${hue}, 10%, 80%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-10", `hsla(${hue}, 10%, 95%, 1)`);

    rootStyles.style.setProperty("--color-text-primary", `hsla(${hue}, 15%, 95%, 1)`);
    rootStyles.style.setProperty("--color-text-secondary", `hsla(${hue}, 5%, 75%, 1)`);
    rootStyles.style.setProperty("--color-text-accent", `hsla(${hue}, ${CSS.getValue("--color-main-saturation")}, 5%, 1)`);

    rootStyles.style.setProperty("color-scheme", "dark");

    rootStyles.style.setProperty("--shadow", `0px 10px 10px -5px hsla(${hue} 50% 3% / 0.3)`);
  }

  static #light(){
    Log.info("CSS.#light()");

    CSS.currentColorMode = CSS.colorModes.LIGHT;
    CSS.#saveColorMode();

    const rootStyles = document.querySelector(':root');
    const hue = getComputedStyle(rootStyles).getPropertyValue("--color-main-hue");

    rootStyles.style.setProperty("--color-main-tint-1", `hsla(${hue}, 20%, 100%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-2", `hsla(${hue}, 20%, 95%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-3", `hsla(${hue}, 20%, 90%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-4", `hsla(${hue}, 20%, 85%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-5", `hsla(${hue}, 20%, 80%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-6", `hsla(${hue}, 20%, 75%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-7", `hsla(${hue}, 20%, 60%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-8", `hsla(${hue}, 20%, 45%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-9", `hsla(${hue}, 20%, 30%, 1)`);
    rootStyles.style.setProperty("--color-main-tint-10", `hsla(${hue}, 20%, 15%, 1)`);

    rootStyles.style.setProperty("--color-text-primary", `hsla(${hue}, ${CSS.getValue("--color-main-saturation")}%, 10%, 1)`);
    rootStyles.style.setProperty("--color-text-secondary", `hsla(${hue}, 30%, 30%, 1)`);
    rootStyles.style.setProperty("--color-text-accent", `hsla(${hue}, 15%, 95%, 1)`);

    rootStyles.style.setProperty("color-scheme", "light");

    rootStyles.style.setProperty("--shadow", `0px 10px 10px -5px hsla(${hue} 10% 2% / 0.2)`);
  }
}

// Make CSS Usable W/O Importing It
window.CSS = CSS;
