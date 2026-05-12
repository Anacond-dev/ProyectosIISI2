/*
	IISSI2
	index.js.  Controlador de index.html
	Mayo/2025
*/
"use strict";						// Nivel elevado de control de errores

import { galleryRenderer } from "./renderers/gallery.js";
import { messageRenderer } from "./renderers/messages.js";
import { photoswithtagsAPI_auto } from "./api/_photoswithtags.js";
import { sessionManager } from "./utils/session.js";

document.addEventListener("DOMContentLoaded", async function(){
	try{
		if(sessionManager.isLogged()){
			let titulo = document.getElementById("pageTitle");
			titulo.innerText = "My Tags Management";
		}
		let galleryPhotos = await photoswithtagsAPI_auto.getAll();
		let divGallery = document.getElementById("divGallery");
		divGallery.appendChild(galleryRenderer.asCardGallery(galleryPhotos));
	}catch(err){
		messageRenderer.showErrorMessage(err.response.data.message);
	}

});
