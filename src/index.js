import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./App.css";
import "@fontsource/roboto";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store, { rrfProps } from "./store";
import { ReactReduxFirebaseProvider } from "react-redux-firebase";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <App />
      </ReactReduxFirebaseProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

if ("serviceWorker" in navigator) {
  navigator.serviceWorker
    .register(`${process.env.PUBLIC_URL}/firebase-messaging-sw.js`)
    .catch((err) => {
      console.log("Service worker registration failed, error:", err);
    });
}

console.log(` __    __  __                      __                      __           
|  \\  |  \\|  \\                    |  \\                    |  \\          
| $$\\ | $$ \\$$ __   __   __   ____| $$  ______    ______   \\$$  ______  
| $$$\\| $$|  \\|  \\ |  \\ |  \\ /      $$ /      \\  /      \\ |  \\ /      \\ 
| $$$$\\ $$| $$| $$ | $$ | $$|  $$$$$$$|  $$$$$$\\|  $$$$$$\\| $$|  $$$$$$\\
| $$\\$$ $$| $$| $$ | $$ | $$| $$  | $$| $$    $$| $$   \\$$| $$| $$  | $$
| $$ \\$$$$| $$| $$_/ $$_/ $$| $$__| $$| $$$$$$$$| $$ __   | $$| $$__/ $$
| $$  \\$$$| $$ \\$$   $$   $$ \\$$    $$ \\$$     \\| $$|  \\  | $$ \\$$    $$
 \\$$   \\$$ \\$$  \\$$$$$\\$$$$   \\$$$$$$$  \\$$$$$$$ \\$$ \\$$   \\$$  \\$$$$$$ 
                                                                        
                                                                        
                                                                                                                                 
| | _ __ _|_   _|_ _     _  _ __ _|_ __ o |_    _|_ _   )
|^|(_|| | |_    |_(_)   (_ (_)| | |_ |  | |_)|_| |_(/_ o  

   .-.                           ___         
 /    \\                        (   )        
 | .\`. ;    .--.    ___ .-.     | |   ___   
 | |(___)  /    \\  (   )   \\    | |  (   )  
 | |_     |  .-. ;  | ' .-. ;   | |  ' /    
(   __)   | |  | |  |  / (___)  | |,' /     
 | |      | |  | |  | |         | .  '.     
 | |      | |  | |  | |         | | \`. \\    
 | |      | '  | |  | |         | |   \\ \\   
 | |      '  \`-' /  | |         | |    \\ .  
(___)      \`.__.'  (___)       (___ ) (___) 
                                            
                                             
     .
       .
   . ;.
    .;
     ;;.
   ;.;;
   ;;;;.
   ;;;;;
   ;;;;;
   ;;;;;
   ;;;;;
   ;;;;;
 ..;;;;;..
  ':::::'
    ':\``);

console.log(
  "%c https://github.com/Niweera/niwder.git",
  "font-weight: bold; text-decoration: none; font-size: 30px;color: red; text-shadow: 3px 3px 0 rgb(217,31,38) , 6px 6px 0 rgb(226,91,14) , 9px 9px 0 rgb(245,221,8) , 12px 12px 0 rgb(5,148,68) , 15px 15px 0 rgb(2,135,206) , 18px 18px 0 rgb(4,77,145) , 21px 21px 0 rgb(42,21,113)"
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
