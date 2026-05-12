/*
    index.jx  Controlador vista index.html
    Mar/2024
*/
"use strict"; // Control estricto de errores
// import { galleryPhotos } from "../js/utils/data.js"; // Array JSON de fotos
import { galleryRenderer } from "./renderers/gallery.js";
// import { photosAPI_auto } from "./api/_photos.js"; // Importar módulo API de acceso RESTful a photos
import { photoswithusersAPI_auto } from "./api/_photoswithusers.js"; // Importar módulo API para acceso a la vista con usuarios
import { messageRenderer } from "./renderers/messages.js";

 // Añadir un oyente de eventos para controlar documento cargado
 
 document.addEventListener("DOMContentLoaded",  async function()  {
    //alert ("Tengo control con index.js despues de DOMContentLoaded!"); // Comprobación de enlace a vista index.html
    try { 
        // let galleryPhotos = await photosAPI_auto.getAll(); // Recuperar todas las fotos
        let galleryPhotos = await photoswithusersAPI_auto.getAll(); // Recuperar todas las fotos desde la vista
        // console.log(galleryPhotos);
        let divGallery = document.getElementById("divGallery"); // Recuperar divGallery
        divGallery.appendChild ( galleryRenderer.asCardGallery(galleryPhotos) ); // Renderizador de la galería
    }
    catch (err) { // Dar un mensaje en caso de fallo
        messageRenderer.showErrorMessage(err.response.data.message);
    }
 });