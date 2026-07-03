"use strict";

import { sessionManager } from "../js/utils/session.js";

const navitem = document.getElementById("username");
const logout = document.getElementById("out");

function main(){
    if(sessionManager.isLogged()){
        //En este caso em vez de cambiar la clase de bootstrap usando disabled he cambiado el atributo style a block
        //De normal cuando no haya ningun usuario iniciado no se vera se aplicara visibility:hidden
        logout.style = 'visibility:block';
        handleHeader();
        logout.onclick = out;
    }
}

async function handleHeader(){
    try{//Obtenemos el username del JSON
        let name = sessionManager.getLoggedUser().username;
        navitem.innerText = "@"+name;
    }catch(err){
        console.error(err);
    }
    
}

async function out(){
    sessionManager.logout();
}

document.addEventListener("DOMContentLoaded",main);