"use strict";

import { messageRenderer } from "./renderers/messages.js";
import { authAPI_auto } from "./api/_auth.js";
import { sessionManager } from "./utils/session.js";

let form = document.getElementById("register-form");
let diverrors = document.getElementById("errors");

async function main(){
    form.onsubmit = handleRegister;
}

async function handleRegister(event){
    

    let myFD = new FormData (event.target);
    event.preventDefault();
    diverrors.innerHTML = "";

    //Estas son las principales lineas para hacer un register o un login

    try{
        let loginData = await authAPI_auto.register(myFD);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;
        
        sessionManager.login(sessionToken, loggedUser);
        
        window.location.href = "projects.html";
    }catch(err){
        console.error(err);
    }

}


document.addEventListener("DOMContentLoaded", main);