/*
    edit_photo.jx  Controlador vista edit_photo.html
    Mar/2024
*/
"use strict"; // Control estricto de errores
// import { galleryPhotos } from "../js/utils/data.js";
import { photosAPI_auto } from "./api/_photos.js"; // Importar módulo API de acceso RESTful a photos
import { messageRenderer } from "./renderers/messages.js";
const urlParams = new URLSearchParams(window.location.search); // Objeto query de la ventana
const photoId = urlParams.get('photoId'); // Extrae el parámetro
let currentPhoto = null; // Para controlar Inserción o edición

 // Añadir un oyente de eventos para controlar documento cargado
 document.addEventListener("DOMContentLoaded",  async () => {
    // alert ("Tengo control con edit_photo.js despues de DOMContentLoaded!"); // Comprobación de enlace a vista index.html
    
    if (photoId !== null) { loadCurrentPhoto(); } // Edición de la foto
    let form = document.getElementById("form-photo-upload"); // Capturar formulario
    form.onsubmit = handleSubmit; // Capturar submit
    
 });

 async function loadCurrentPhoto() { // Cargar los datos de la foto si estamos en edición
    let pageTitle = document.getElementById("page-title"); // Para modicar título en edición
    let urlInput = document.getElementById("input-url");
	let titleInput = document.getElementById("input-title");
	let descriptionInput = document.getElementById("input-description");
	let PublicVisibility = document.getElementById("Public_visibility");
	let PrivateVisibility = document.getElementById("Private_visibility");
    let imgEdit = document.getElementById("img-edit");

    pageTitle.textContent = "Editing photo #"+photoId; // Cambia el título

    try {   currentPhoto = await photosAPI_auto.getById(photoId);
		    urlInput.value = currentPhoto.url; 
            titleInput.value = currentPhoto.title;
		    descriptionInput.value = currentPhoto.description;
            PublicVisibility.checked = (currentPhoto.visibility=="Public") ? true : false; // Activar radio
		    PrivateVisibility.checked = (currentPhoto.visibility=="Private") ? true : false; // Activar radio
            imgEdit.src = currentPhoto.url;
    } catch (err) { messageRenderer.showErrorAsAlert(err.response.data.message);
    }
 }

 async function handleSubmit(event) {
    event.preventDefault(); // Cancelar el submit
    // alert ("Tengo control del Submit!"); // Comprobación de enlace a vista index.html
    let fData = new FormData(event.target); // Crea formData con el formulario que provoca el submit
    fData.append("userId",1); // Usuario por defecto
    let ahora = (new Date()).toLocaleString("ja-JP").replaceAll("/","-");
	fData.append("date", ahora); // Add the current date

    if (currentPhoto === null) { // Creating a new photo
        try {         //
            let resp = await photosAPI_auto.create(fData); // Inserta y recupera objeto response
            let newId = resp.lastId; // Recupera clave añadida
            // alert ("Añadida la photoId: "+newId);
            window.location.href="index.html"; // Recircular a la galería
        }
        catch (err) { // Dar un mensaje en caso de fallo
            messageRenderer.showErrorMessage(err.response.data.message);
        } 
    } 
    else { // Modificar foto
        try {	await photosAPI_auto.update(fData, photoId); // API REST para actualizar la foto
                window.location.href = `photo_detail.html?photoId=${photoId}`;
        } catch (err) { messageRenderer.showErrorAsAlert(err.response.data.message); }
    }

 }