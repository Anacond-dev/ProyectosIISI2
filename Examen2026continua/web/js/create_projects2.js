"use strict";

import { validateProject } from "/js/validators/create_project.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { projectsAPI_auto } from "/js/api/_projects.js";

async function main(){
    let form = document.getElementById("formid");
    form.onsubmit = handleSubmit;
}

//NO OLVIDAR EL EVENT

async function handleSubmit(event){

    //MUY IMPORTANTE NO OLLVIDAR EL EVENT

    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    let divErrors = document.getElementById("errors");
    divErrors.innerHTML = "";


    const errors = validateProject.validatenewproject(formData);

    if(errors.length > 0){
        for(let error of errors){
            messageRenderer.showMessageAsAlert(error,"danger");
        }
    }else{
        try{
            let userId = sessionManager.getLoggedId();
            formData.append("userId",userId);
            await projectsAPI_auto.create(formData);
            window.location.href = "projects.html";
        }catch(err){
            console.error(err);
        }
    }

    /*
    For para mostrar contenido del formData

    for (const [clave, valor] of formData.entries()){
        console.log(clave,valor);
    }
    debugger;*/
}

document.addEventListener("DOMContentLoaded",main);