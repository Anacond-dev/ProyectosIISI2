/*
    index.jx  Controlador vista index.html
    Mar/2024
*/
"use strict"; // Control estricto de errores
// import { galleryPhotos } from "../js/utils/data.js";
import { photoRenderer } from "./renderers/photos.js"; // Renderizador de fotos
import { photosAPI_auto } from "./api/_photos.js"; // Importar módulo API de acceso RESTful a photos
//import { photoswithusersAPI_auto } from "./api/_photoswithusers.js"; // Importar módulo API para acceso a la vista con usuarios

import { parseHTML } from "./utils/parseHTML.js";

import { messageRenderer } from "./renderers/messages.js";

import { sessionManager } from "./utils/session.js";

const urlParams = new URLSearchParams(window.location.search); // Objeto query de la ventana
const photoId = urlParams.get('photoId'); // Extrae el parámetro
const deleteBtn = document.querySelector("#button-delete");
const editBtn = document.querySelector("#button-edit");

 // Añadir un oyente de eventos para controlar documento cargado
 
 document.addEventListener("DOMContentLoaded",  async function() 
{
    //alert ("Tengo control con photo_detail.js despues de DOMContentLoaded!"); // Comprobación de enlace a vista index.html
    try { 
        // let photo = await photosAPI_auto.getById(photoId); // Recupera de la BD la photo con PK photoId
        let photo = await photosAPI_auto.getById(photoId);//Justo en esta linea no se ejecuta correctamente el codigo debido a que no encuentra el id de la foto // Recupera de la BD la photo con PK photoId
        let container = document.getElementById("main-photo"); // Recuperar div photo-detail

        //Aqui pondre los ifs para activar y desactivar las opciones de editado

        if(sessionManager.isLogged()){
            let botonEdicion = document.getElementById("button-edit");
            let botonEliminacion = document.getElementById("button-delete");

            botonEdicion.classList.remove("disabled");
            botonEliminacion.classList.remove("disabled");
        }

        let imagen = parseHTML(`<img src="${photo.url}" class="imagen img-fluid">`);

        container.appendChild(imagen); // Renderizador de la galería
        deleteBtn.onclick = handleDelete;	// Assign the handler function to the delete button
        editBtn.onclick = handleEdit;		// Assign the handler function to the edit button
        //console.log("El codigo funciona");
    }
    catch (err) { // Dar un mensaje en caso de fallo
        //console.log("Ha ocurrido un error");
        console.log(err);
    }
});

 async function handleDelete() {
    let answer = confirm("Do you really want to delete this photo?"); //Nos aparece un mensaje para confirmar si queremos que se realice la operacion, devuelve un valor bool
    if (answer) {
        try {   await photosAPI_auto.delete(photoId); // Elimina la foto
                window.location = "/index.html";
        }
        catch (err) { // Dar un mensaje en caso de fallo
            messageRenderer.showErrorMessage(err.response.data.message);
        }
        // Borrar la foto      
    }
 }

function handleEdit() {
    //Nos el objeto windows podemos usarlo para iteractuar con la url de la pagina actual
    if(sessionManager.isLogged()){


    }
	window.location.href = "edit_photo.html?photoId=" + photoId;
}