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
import { votesAPI_auto } from "./api/_votes.js";

// Captura el parámetro photoId de la URL
let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");
let divError = document.getElementById("errors");

async function main() {
    // Comprobamos que exista el parámetro
    if (photoId === null) {
        messageRenderer.showErrorAsAlert("Please provide a photoId");
        return;
    }

    //loadAllphotos cargara los detalles de la foto y ademas comprobara si estamos logueados para permitirnos utilizar ciertos botones

    await loadPhotoDetails();

    //Cogemos el boton Delete y le añadimos el listener de que cuando sea clikado se ejecutara la funcion handleDelete

    let deleteButton = document.getElementById("btnDelRate");
    deleteButton.onclick = handleDelete;
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

        //console.log(publicVote.avgValue);

        //Cogemos la etiqueta donde ira el voto publico

        let rating = document.getElementById("public-vote");

        //Cambiamos el contenido de la etiqueta y MUY IMPORTANTE accedemos al valor del Object publicVote, de lo contrario estariamos intentando introducir una especie de diccionario dentro de esa etiqueta {avgValue:3.4} por ejemplo

        rating.textContent = publicVote.avgValue;

        // Si no está logueado
        if (!sessionManager.isLogged()) {

            //Como no estamos logueados se eliminara la etiqueta input del documento html

            document.getElementById("rating-input").remove();

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

async function handleDelete(){

    //Ventana de confirmacion de borrado

    let conf = confirm("¿Desea borrar sus votos privados sobre esta foto?");

    //Cogemos el id de usuario que esta iniciado

    let userId = sessionManager.getLoggedId();

    if(conf){

        //Una vez que confirmamos que si cogemos todos los votos de la vista v_votes
        try{
            let allVotes = await v_votesAPI_auto.getAll();

            //Los filtramos y cogemos el primero con el metodo find segun el userId y el id de la foto que estamos viendo

            let vote = allVotes.find(v => Number(v.userId) === Number(userId) && Number(v.photoId) === Number(photoId));

            //En caso de que no exista voto lo que es normal con el usuario 99 que nos dan devolver un mensaje de advertencia

            if(vote.voteId === null){
                messageRenderer.showMessageAsAlert("Este usuario no tiene votos privados en dicha foto","danger",1);
                return;
            }

            //En caso de que si exista dicho voto en la tabla votes lo eliminamos

            await votesAPI_auto.delete(vote.voteId);
        }catch(err){
            console.error(err);
        }
    }
}

// Ejecutar cuando cargue el DOM
document.addEventListener("DOMContentLoaded", main);