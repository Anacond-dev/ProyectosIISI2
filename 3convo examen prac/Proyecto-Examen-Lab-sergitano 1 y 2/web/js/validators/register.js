"use strict";

import { authAPI_auto } from "../api/_auth.js";
import { sessionManager } from "../utils/session.js";
import { messageRenderer } from "../renderers/messages.js";

async function main(){
    let registerForm = document.getElementById("register-form");
    registerForm.onsubmit = handleSubmitRegister;
}

async function handleSubmitRegister(){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    //Con este if comprobamos si las contraseñas se han introducido correctamente

    if(formData.get("password") !== formData.get("password2")){
        console.log(formData.get("password"));
        console.log(formData.get("password2"));
        alert("Constraseñas diferentes");
    }else{
        try{//Eliminamos la segunda contraseña del form
            formData.delete("password2");
            let loginData = await authAPI_auto.register(formData);
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;

            sessionManager.login(sessionToken, loggedUser);
            window.location.href = "index.html";

        }catch(err){
            console.error(err);
        }
    }


}

document.addEventListener("DOMContentLoaded",main);