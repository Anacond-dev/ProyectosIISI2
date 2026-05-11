"use strict";

import { messageRenderer } from "../renderers/messages.js";
import { teamsAPI_auto } from "../api/_teams.js";

let currentTeam;
let urlParams = new URLSearchParams(window.location.search);
let teamId = urlParams.get("teamId");

async function main(){

    if(teamId !== null){
        loadCurrentTeam();
    }

    let registerForm = document.getElementById("regTeam");
    registerForm.onsubmit = handleSubmit;
}

async function handleSubmit(event){

    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    let er = false;

    let presidente = formData.get("president");

    let aforo = formData.get("fieldCapacity");

    //En caso de que el equipo tuviese userid para hacer el truco le insertamos un userid cualquiera
    //formData.append("userId",1);

    if(presidente.length < 3 && presidente.length %5 !== 0){

        //El id del contenedor de los errores debe de estar en plural

        er = true;

        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        messageRenderer.showErrorMessage("El nombre del presidente del equipo debe de tener una logitud de al menos 3 letras y que su longitud sea multiplo de 5");
    }

    if(aforo < 100 || aforo > 200000){

        er = true;

        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        messageRenderer.showErrorMessage("El aforo del estado debe de estar comprendido entre 100 y 200000");
    }

    if(er === false){
        //Para poder subir un nuevo equipo o actualizarlo sin iniciar sesion cambiar en el json auth true, y si es necesario pasar manualmente el id de usuario
        if(teamId === null){
            try{
                let resp = await teamsAPI_auto.create(formData);
                window.location.href = `teams.html`;
            }catch (err){
                console.log(err);
            }
        }else{
            try{
                await teamsAPI_auto.update(formData,teamId);
                window.location.href = `team.html`;
            }catch(err){
                console.log(err);
            }
        }
    }

}

async function loadCurrentTeam(){

    let pageTitle = document.getElementById("page-title");
    let nameInput = document.getElementById("input-name");
    let presidentInput = document.getElementById("input-president");
    let fieldCapacityInput = document.getElementById("input-fieldCapacity");
    let foundationDateInput = document.getElementById("input-foundationDate");
    let urlInput = document.getElementById("input-photoURL");

    pageTitle.textContent = "Editando el equipo";

    try{

        currentTeam = await teamsAPI_auto.getById(teamId);
        nameInput.value = currentTeam.name;
        presidentInput.value = currentTeam.president;
        fieldCapacityInput.value = currentTeam.fieldCapacity;
        foundationDateInput.value = currentTeam.foundationDate;
        urlInput.value = currentTeam.photoURL;

    } catch (err){
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded",main);