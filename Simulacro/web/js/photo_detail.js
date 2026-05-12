/*
    IISSI
    photo_detail.js. Controlador de photo_detail.html
    Mayo/2026
*/

"use strict";

import { photoRenderer } from "/js/renderers/photos.js";
import { photosAPI_auto } from "/js/api/_photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { v_votesAPI_auto } from "/js/api/_v_votes.js";

// Captura el parámetro photoId de la URL
const urlParams = new URLSearchParams(window.location.search);
const photoId = urlParams.get("photoId");

async function main() {
    // Comprobamos que exista el parámetro
    if (photoId === null) {
        messageRenderer.showErrorAsAlert("Please provide a photoId");
        return;
    }

    await loadPhotoDetails();
}

async function loadPhotoDetails() {
    try {

        let photoDetails = document.querySelector("#photo-details");

        // Obtener foto
        let photo = await photosAPI_auto.getById(photoId);

        // Renderizar detalles
        photoDetails.appendChild(
            photoRenderer.asDetails(photo)
        );

        // Obtener valoración pública
        let publicVote = await v_votesAPI_auto.getavgValueByPId(photoId);

        let rating = document.getElementById("public-vote");

        // innerText es una propiedad, no una función
        rating.innerText = publicVote;

        // Si no está logueado
        if (!sessionManager.isLogged()) {

            let botonAñadir = document.getElementById("btnAddRate");
            let botonActualizar = document.getElementById("btnUpdRate");
            let botonEliminar = document.getElementById("btnDelRate");
            let votoPrivado = document.getElementById("rating-input");

            botonAñadir.classList.add("disabled");
            botonActualizar.classList.add("disabled");
            botonEliminar.classList.add("disabled");
        }

    } catch (err) {

        messageRenderer.showErrorAsAlert(
            "Error loading photo: " + err
        );

        console.error(err);
    }
}

// Ejecutar cuando cargue el DOM
document.addEventListener("DOMContentLoaded", main);