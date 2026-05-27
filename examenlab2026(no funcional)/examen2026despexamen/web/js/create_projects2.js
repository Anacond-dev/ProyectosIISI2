"use strict";

import { validateProject } from "/js/validators/create_project.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { projectsAPI_auto } from "/js/api/_projects.js";

async function main(){
    console.log("Antes de subir");
    let form = document.getElementById("formid");
    form.onsubmit = handleSubmit; 
}

async function handleSubmit(){
    e.preventDefault();
    console.log("Dentro de la funcion");
    document.getElementById("errors").innerHTML = "";
    let form = document.getElementById("formid");
    let formData = new FormData(form);

    console.log("Intentamos logeo");
        try{
            let userId = sessionManager.getLoggedId();
            formData.append("userId",userId);
            await projectsAPI_auto.create(formData);
            window.location.href = "projects.html";
        }catch(err){
            console.error(err);
        }

    /*const errors = validateProject.validatenewproject(formData);

    if(errors.length > 0){
        for(let error of errors){
            messageRenderer.showMessageAsAlert(error);
        }
    }else{
        console.log("Intentamos logeo");
        try{
            let userId = sessionManager.getLoggedId();
            formData.append("userId",userId);
            await projectsAPI_auto.create(formData);
            window.location.href = "projects.html";
        }catch(err){
            console.error(err);
        }
    }*/
}

document.addEventListener("DOMContentLoaded",main);