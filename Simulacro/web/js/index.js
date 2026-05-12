/*
	C.Arévalo
	index.js.  Control de index.html
	Marzo/2021
*/
"use strict";						// Nivel elevado de control de errores
import { galleryRenderer } from '/js/renderers/gallery.js';// Renderizador de la galería
import { photosAPI_auto } from '/js/api/_photos.js';
import { messageRenderer } from '/js/renderers/messages.js';
async function main () {//Punto de entrada principal, haciéndolo asíncrono para poder llamar AJAX
	try { // Acceso con éxito a las fotos
		let photos = await photosAPI_auto.getAll(); // Recuperar array con todas las fotos. Llamada bloqueante
		let container = document.querySelector ("#divGallery"); 		/* Renderizador de fotos */
		container.appendChild (galleryRenderer.asCardGallery (photos));
	}
	catch(err) { // Dar mensaje de error
		messageRenderer.showErrorMessage(err.response.data.message);
	}
}
document.addEventListener ("DOMContentLoaded", main );