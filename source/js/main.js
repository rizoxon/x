"use strict";
///////////////////////////// SPA / Core
import Core from "./SPA/core.js";


///////////////////////////// Tools
// import Form from "./modules/tools.js";


// prefers-color-scheme TMP
// console.log(window.matchMedia("(prefers-color-scheme: dark)"));
// console.log(window.matchMedia("(prefers-color-scheme: dark)").matches);
// const mq = window.matchMedia("(prefers-color-scheme: dark)");
// mq.addEventListener('change', ({matches: isDark})=>{
//   console.log(matches);
//   console.log("Changed");
// });
// mq.dispatchEvent(new Event('change'));


///////////////////////////// CSS
// import styles from '../css/styles.css' assert {type: 'css'};
// console.log(styles.rules);
// styles.rules[0].style.color = "blue";
// console.log(styles.rules[0].style.color);


///////////////////////////// PWA serviceWorker
// if(document.readyState === "complete"){
//   if('serviceWorker' in navigator){
//     navigator.serviceWorker.register('../PWA/sw.js', {scope: '../PWA/'})
//     .then(reg => {console.log('Registration succeeded. Scope is ' + reg.scope);}) // registration succeeded
//     .catch(err => {console.error('Registration failed with ' + err);}); // registration failed
//   }
// }
