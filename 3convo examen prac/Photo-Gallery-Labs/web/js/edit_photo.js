"use strict";

import { photosAPI_auto } from "/js/api/_photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
/*
document.addEventListener("DOMContentLoaded", function() {
    // Capturar el clic del botón
    document.getElementById("send-button").addEventListener("click", function() {
        // Obtener el formulario
        let registerForm = document.getElementById("form-photo-upload");
        
        // Desencadenar el evento submit del formulario
        registerForm.dispatchEvent(new Event("submit"));
    });
});
*/
async function main() {
    let registerForm = document.getElementById("form-photo-upload");
    registerForm.onsubmit = handleSubmitPhoto;
    let urlParams = new URLSearchParams(window.location.search);
    let photoId = urlParams.get("photoId");
   

    if(photoId !== null){
        loadCurrentPhoto();
    }
}

async function handleSubmitPhoto(event){
    let currentPhoto = null;
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);

    if (currentPhoto === null){
        formData.append("userId",1);

        try{
            let resp = await photosAPI_auto.create(formData);
            let newId = resp.lastId;
            window.location.href = `photo_detail.html?photoId=${newId}`;
        }catch(err){
            messageRenderer.showErrorAsAlert(err.response.data.message);
        }
    }else{
        formData.append("userId",currentPhoto.userId);
        formData.append("date",currentPhoto.date);

        try{
            await photosAPI_auto.update(formData, photoId);
            window.location.href = `photo_detail.html?photoId=${photoId}`;
        } catch(err){
            messageRenderer.showErrorAsAlert(err.response.data.message);
        }
    }
}

async function loadCurrentPhoto(){
    let pageTitle = document.getElementById("page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let visibilityInput = document.getElementById("input-visibility");

    pageTitle.textContent = "Editing photo";

    try{
        currentPhoto = await photosAPI_auto.getById(photoId);
        urlInput.value = currentPhoto.url;
        titleInput.value = currentPhoto.title;
        descriptionInput.value = currentPhoto.description;
        visibilityInput.value = currentPhoto.visibility;
    }catch(err){
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded", main);