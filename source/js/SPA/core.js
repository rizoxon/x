//////////////// SPA - Single Page Application
"use strict";

///////////////////////////// Brideg / Fetch
import bridge from "../modules/bridge.js";

///////////////////////////// Brideg / Fetch
// import bridge from "./modules/bridge.js";

//// Custom Elements
import El from "./elements/el.js";
// import Form from "./elements/form.js";
// import Toast from "./elements/toast.js";

// import CSS from "./css.js";
// document.head.innerHTML += `<style>${CSS}</style>`;

//// Core Classes
import Dom from "./dom.js";
// import Title from "./title.js";
import Router from "./router.js";
import Form from "./form.js";
// import Cover from "./cover.js";
import Hyperlink from "./hyperlink.js";
import Loading from "./loading.js";
import Menu from "./menu.js";
// import Nav from "./nav.js";

export default class Core{
  static {
    // Try To Load Global Data Then Init The Methods
    Core.#getGlobalData()
    .then(()=>{
      Core.#firstLoad();
      Core.#onLoad();
      Core.#onUrlChange();
      Core.#onHashChange();
      Core.#onHistoryButtonClicked();
      Core.#onDomChange();

    });


  }

  /////// Global Data
  static async #getGlobalData(){
      let response = await bridge("bridge", {for:"globalData"});
      window.conf = response["conf"];
      window.session = response["session"];
      window.langCode = response["langCode"];
      window.langDict = response["langDict"];
      // window.languages = response["languages"];
      // window.currencies = response["currencies"];
  }

  /////// Event Handlers
  static #firstLoad(){
    // console.log("firstLoad");

    Menu.init();
    Menu.setActive();

    Router.handle();

    Loading.done();

  }

  static #onLoad(){
    document.addEventListener('readystatechange', ()=>{
      if(event.target.readyState === 'loading') return;
      if(event.target.readyState === 'interactive') return;
      // if(event.target.readyState === 'complete');

      // window.dispatchEvent(new Event('load'));
      console.log("onLoad");

      Router.handle();

      Menu.setActive();

      Loading.done();

    });
  }

  static #onUrlChange(){
    window.addEventListener('locationchange', ()=>{
      // window.dispatchEvent(new Event('locationchange'));
      // console.log("onUrlChange");

      Router.handle();

      Menu.setActive();

    });
  }

  static #onHashChange(){
    window.addEventListener('hashchange', ()=>{
      // window.dispatchEvent(new Event('hashchange'));
      // console.log("onHashChange");

      // Nav.setActive();

    });
  }

  static #onHistoryButtonClicked(){
    window.addEventListener('popstate', ()=>{
      // window.dispatchEvent(new Event('popstate'));
      // console.log("onHistoryButtonClicked");

      Router.handle();

    });
  }

  static #onDomChange(){
    window.addEventListener('domChange', ()=>{
      // window.dispatchEvent(new CustomEvent('domChange'));
      // window.dispatchEvent(new CustomEvent("domChange", {detail:"menu"}));
      // console.log("onDomChange");

      // Dom Change For body > menu
      if(!!event.detail === true && event.detail == "menu") Menu.build();

      // Dom Change For body > header
      // Dom Change For body > main
      // Dom Change For body > footer

      // Globals
      Hyperlink.collect();
      Form.collect();

    });
  }

};
