/**
 * gallery.js  Renderizador de la galería de fotos recientes
 * 
 */
"use strict";
import { parseHTML } from "../utils/parseHTML.js"; // Generador de objetos DOM
import { photoRenderer } from "./photos.js"; // Renderizador de fotos

//Esta funcion va a consistir en ir obteniendo las fotos, aplicar la funcion de renderizado y añadirlas al contenedor que va a tener la propia galeria 

const galleryRenderer = {
    asCardGallery : function(photos) {// Para cada elemento de la galería, renderizarlo como una foto
        let galleryContainer = parseHTML ('<div class="photo-gallery row p-2 bg-light"> </div>'); // Div a incrustar en contenedor de la galería
        for (let photo of photos ) {
            // Generar objeto DOM tipo card a inscrustar en la galería
            galleryContainer.appendChild( photoRenderer.asCard(photo) ); // Renderiza una foto (fuente)
        }
        return galleryContainer;
    }
}

export { galleryRenderer }