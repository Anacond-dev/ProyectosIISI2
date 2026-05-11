"use strict";

import { sessionManager } from "../js/utils/session.js";
import { authAPI_auto } from "../js/api/_auth.js";

async function main(){
    let registerForm = document.getElementById("form-login");
    registerForm.onsubmit = handleSubmit;
}

async function handleSubmit(event){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    sendRegister(formData);
}



async function sendRegister(formData){
    try{
        let loginData = await authAPI_auto.login(formData);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.username;

        sessionManager.login(sessionToken, loggedUser);
        window.location.href = "index.html";
    }catch(err){
        console.log(err);
    }
}

document.addEventListener("DOMContentLoaded",main);