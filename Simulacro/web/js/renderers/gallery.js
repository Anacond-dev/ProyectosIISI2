/*
	C.Arévalo
	gallery.js.  Renderizador de la galería, para un array JSON de photos
	Marzo/2022
*/
"use strict";
import { parseHTML } from "/js/utils/parseHTML.js"; // Función para crear elementos del DOM
import { photoRenderer } from "/js/renderers/photos.js"; // Renderizador de una photo

const galleryRenderer = {
	asCardGallery: function (photos) {
		let galleryContainer = parseHTML ('<div class="photo-gallery row"> </div>'); // Div a incrustar en contenedor de la galería
		for ( let photo of photos ) { // Creación del Grid. Sin contador, cada Card ocupa 4 columnas
			galleryContainer.appendChild(photoRenderer.asCard(photo)); // Añade cards al contenedor
		}
		return galleryContainer; // Devuelve el div con todas las fotos. Se incrustará en el conteenedor de la galería
		}
	}
export { galleryRenderer };