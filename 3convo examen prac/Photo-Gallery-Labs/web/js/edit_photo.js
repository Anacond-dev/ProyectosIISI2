"use strict";

import { photosAPI_auto } from "/js/api/_photos.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "./utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");


async function main() {
    let registerForm = document.getElementById("form-photo-upload");

    if(photoId !== null){
        loadCurrentPhoto();
    }

    registerForm.onsubmit = handleSubmitPhoto;
}

async function handleSubmitPhoto(event){

    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    let currentPhoto = (photoId !== 0) ? await photosAPI_auto.getById(photoId) : null;

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

        formData.append("userId",sessionManager.getLoggedId());

        //Aqui crearemos un objeto de tipo Date y lo pasaremos a string

        let today = new Date().toISOString().slice(0, 10);

        formData.append("date",today);

        try{
            await photosAPI_auto.update(formData, photoId);
            window.location.href = "index.html";
        } catch(err){
            console.error(err);
        }
    }
}

async function loadCurrentPhoto(){
    let currentPhoto = await photosAPI_auto.getById(photoId);
    let pageTitle = document.getElementById("page-title");
    let urlInput = document.getElementById("input-url");
    let titleInput = document.getElementById("input-title");
    let descriptionInput = document.getElementById("input-description");
    let visibilityInput = document.getElementById("input-visibility");

    pageTitle.innerHTML = "Editing photo";

    try{
        urlInput.value = currentPhoto.url;
        titleInput.value = currentPhoto.title;
        descriptionInput.value = currentPhoto.description;
        visibilityInput.value = currentPhoto.visibility;
    }catch(err){
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded", main);