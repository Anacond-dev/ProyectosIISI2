"use strict";

import { authAPI_auto } from "../js/api/_auth.js";
import { sessionManager } from "../js/utils/session.js";
import { messageRenderer } from "../js/renderers/messages.js";

const loginForm = document.getElementById("login-form");
const errorsDiv = document.getElementById("errors");

async function main(){
    loginForm.onsubmit = handleSubmitLogin;
}

async function handleSubmitLogin(event){
    event.preventDefault();
    errorsDiv.innerHTML = "";
    let form = event.target;
    let formData = new FormData(form);
    sendLogin(formData);
}

async function sendLogin(formData){
    try{
        //Tened mucho cuidado aqui authAPI_auto devuelve un Object con sessiontokens y otro object con la informacion de usuario
        //Es necesario en el sessionManager.login añadir el nombre de usuario para eso acceder al objeto user y despues username
        let loginData = await authAPI_auto.login(formData);
        sessionManager.login(loginData.sessionToken, loginData.user);
        window.location.href = "index.html";
    }catch (error){
        messageRenderer.showErrorMessage(error.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded", main);