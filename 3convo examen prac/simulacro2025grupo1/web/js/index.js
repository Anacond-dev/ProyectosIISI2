/*
	IISSI2
	index.js.  Controlador de index.html
	Mayo/2025
*/
"use strict";						// Nivel elevado de control de errores
// Renderizadores necesarios 
// Controladores de API necesarios para accesos Ajax a la BD
// Gestión del Login/Logout y de la Sesión y Local Storage en Cliente

// Manejadores de eventos y/o listeners para satisfacer requisitos
// Accesos a la BD mediante controladores API Rest
// Presentación mediante módulos de renderización
// Captura de errores y renderización en contenedor de errores

import { messageRenderer } from "/js/renderers/messages.js";
import { photosAPI_auto } from "../js/api/_Photos.js";
import { photoRenderer } from "/js/renderers/photos.js";
import { photoswithtagsAPI_auto } from "/js/api/_PhotoswithTags.js";
import { tagRenderer } from "/js/renderers/tags.js";
import { sessionManager } from "/js/utils/session.js";
import { photostagsAPI_auto } from "/js/api/_PhotosTags.js";

async function main() {
	loadPhotos();
	loadTags();
	changeTitle();
}

async function loadPhotos() {
	try {
		let container = document.getElementById("divGallery");

		let photos = await photosAPI_auto.getAll();
		for(let photo of photos) {
			if(
				( //usuario normal
					!sessionManager.isLogged()
				)
				||
				( //usuario con la sesión iniciada
					sessionManager.isLogged()
					&&
					photo.visibility === "Private"
				)
			) {
				let fotoRenderizada = photoRenderer.asBaseCard(photo);
				container.appendChild(fotoRenderizada);
			}
		}
	} catch(err) {
		messageRenderer.showErrorMessage(err);
	}
}

async function loadTags() {
	try {
		let photoTags = await photoswithtagsAPI_auto.getAll();
		for(let photoTag of photoTags) {
			if(
				( //usuario normal
					!sessionManager.isLogged()
				)
				||
				( //usuario con la sesión iniciada
					sessionManager.isLogged()
					&&
					photoTag.visibility === "Private"
				)
			) {
				//renderizar la etiqueta
				let container = document.getElementById(`photo${photoTag.photoId}`);
				let etiquetaRenderizada = tagRenderer.asTag(photoTag);
				container.appendChild(etiquetaRenderizada);

				//añadir evento
				if(sessionManager.isLogged()) {
					etiquetaRenderizada.addEventListener("click", async function(){
						let confirmacion = confirm(`¿Seguro que quiere eliminar la etiqueta ${photoTag.name}?`);
						if(confirmacion) {
							await photostagsAPI_auto.delete(photoTag.photoTagId);
							window.location = "/index.html";
						}
					});
				}
			}
		}
	} catch(err) {
		messageRenderer.showErrorMessage(err);
	}
}

function changeTitle() {
	try {
		if(sessionManager.isLogged) {
			let titulo = document.getElementById("pageTitle");
			titulo.innerHTML = "My Tags' Management";
		}
	} catch(err) {
		messageRenderer.showErrorMessage(err);
	}
}

document.addEventListener("DOMContentLoaded", main);