"use strict";

import { formValidator } from "./validators/validador.js";
import { messageRenderer } from "./renderers/messages.js";
import { teamsAPI_auto } from "./api/_teams.js";
import { sessionManager } from "./utils/session.js";


let URLParams = new URLSearchParams(window.location.search);
let teamId = URLParams.get("teamId");
let userId = sessionManager.getLoggedId();


async function handleSubmitForm(event) {

    event.preventDefault();

    let formData = new FormData(event.target);
    let errors = formValidator.validate(formData);

    if (errors.length > 0) {

        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = " "; //Inicializamos vacío x si acaso(?)

        for (let e of errors) {

            messageRenderer.showErrorMessage(e);
        }

    }

    else {

        if (teamId == null) {

            createTeam(formData);
        }

        else {

            updateTeam(formData);

        }
    }
}

async function updateTeam(formData) {

    console.log(formData);
    
    try {

        let update = await teamsAPI_auto.update(formData, teamId);
        window.location.href = "teams.html";
    } catch (err) {

        console.log(err);
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

async function createTeam(formData) {

    try {

        let register = await teamsAPI_auto.create(formData);
        window.location.href = "teams.html";
    } catch (err) {

        messageRenderer.showErrorMessage(err.response.data.message);
    }

}

async function loadTeamDetails() {

    let pageTitle = document.querySelector(".page-title");
    let name = document.getElementById("name-input");
    let president = document.getElementById("president-input");
    let fieldCapacity = document.getElementById("fieldCapacity-input");
    let foundationDate = document.getElementById("foundationDate-input");
    let photoURL = document.getElementById("photoURL-input");

    pageTitle.textContent = "Edita tu equipo...";

    try {

        let currentTeam = await teamsAPI_auto.getById(teamId);
        console.log(currentTeam);
        name.value = currentTeam.name;
        president.value = currentTeam.president;
        fieldCapacity.value = currentTeam.fieldCapacity;
        foundationDate.value = currentTeam.foundationDate;
        photoURL.value = currentTeam.photoURL;
    } catch (err) {

        console.log(err);
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

async function main() {

    if (userId === null) {

        messageRenderer.showErrorMessage("No se puede registrar ni editar ningún equipo si no estás loggeado");
        return;
    }

    else {

        if (teamId != null) {

            loadTeamDetails();
        }

        let formulario = document.getElementById("formulario");
        formulario.onsubmit = handleSubmitForm;


    }


}

document.addEventListener("DOMContentLoaded", main);