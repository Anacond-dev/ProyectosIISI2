"use strict";

import { sessionManager } from "./utils/session.js";

let headerRegister = document.getElementById("navbar-register");
let headerLogin = document.getElementById("navbar-login");
let headerLogout = document.getElementById("navbar-logout");
let headerUpload = document.getElementById("navbar-upload");

function main(){
    showUser();
    addLogoutHandler();
}

//Para mostrar el usuario invitado o el nombre del usuario iniciado

function showUser(){

    let title = document.getElementById("showUserName");
    let text;

    if(sessionManager.isLogged()){
        
        let username = sessionManager.getLoggedUser().username;
        console.log(username);
        text = "Hi, @ " + username;

        //Aqui cambiamos el logout para los usuarios logueados

        //habilitamos

        headerLogout.classList.remove("disabled");
        headerUpload.classList.remove("disabled");

        //Deshabilitamos

        headerRegister.classList.add("disabled");
        headerLogin.classList.add("disabled");
    }else{
        text = "Guest";
    }

    title.innerText = text;
}

function addLogoutHandler(){
    let logoutbutton = document.getElementById("navbar-logout");

    logoutbutton.onclick = function() {
        sessionManager.logout();

        //Habilitamos

        headerRegister.classList.remove("disabled");
        headerLogin.classList.remove("disabled");

        //Deshabilitamos

        headerLogout.classList.add("disabled");
        headerUpload.classList.add("disabled");

        window.location.href = "index.html";
    }
}

document.addEventListener("DOMContentLoaded", main);