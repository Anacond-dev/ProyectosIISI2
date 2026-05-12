"use strict";

import { authAPI_auto } from "../js/api/_auth.js";
import { sessionManager } from "../js/utils/session.js";
import { messageRenderer } from "../js/renderers/messages.js";

async function main(){
    let loginForm = document.getElementById("login-form");
    loginForm.onsubmit = handleSubmitLogin;
}

async function handleSubmitLogin(event){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    //Recordar la contraseña no puede ser unicamente numeros porque el login no puede hacerle bien el hash

    try{
        let loginData = await authAPI_auto.login(formData);
        let sessionToken = loginData.sessionToken;
        let loggedUser = loginData.user;

        sessionManager.login(sessionToken, loggedUser);

        //Codigo para mensaje de exito al iniciar sesion

        messageRenderer.showSuccessMessage(`<h3 class='d-inline'>
            <i class='fa fa-check'></i>
                </h3>Todo Ok!\nSe simula el envío del formulario al servidor! 
            <h3 class='d-inline'>
                <i class='fa fa-spinner fa-spin'></i>
            </h3>`);
            //Se espera un tiempo y se regresa a la pagina principal
            setTimeout(function(){						// Durante 5 segundos
            window.location.href="index.html";		// Y se vuelve a la galería
            }, 
            1000)
    }catch(err){
        console.log(err);
    }
}

document.addEventListener("DOMContentLoaded",main);