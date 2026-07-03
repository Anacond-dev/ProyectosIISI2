"use strict";
import { photosAPI_auto } from "../api/_photos.js";
import { photoRenderer } from "./photos.js";
import { messageRenderer } from "../renderers/messages.js";
import { sessionManager } from "../utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let photoId = urlParams.get("photoId");

async function main(){
    if(photoId === null){
        messageRenderer.showErrorMessage("Please, provide a photoId");
        return;
    }

    loadPhotoDetails();

    let deleteBtn = document.querySelector("#button-delete");
    deleteBtn.onclick = handleDelete;

    let editBtn = document.querySelector("#button-edit");
    editBtn.onclick = handleEdit;
}

async function loadPhotoDetails(){
    let photoContainer = document.querySelector("#photo-details-column");

    try{
        let photo = await photosAPI_auto.getById(photoId);
        let photoDetails = photoRenderer.asDetails(photo);
        photoContainer.appendChild(photoDetails);
    } catch (err){
        messageRenderer.showErrorMessage("Error loading photo",err);
    }
}

async function handleDelete(event){

    let photouserId = await photosAPI_auto.getById(photoId);
    let id = photouserId.userId;

    if(id === sessionManager.getLoggedId()){
        let answer = confirm("Do you really want to deleate this photo?");

        if (answer){
            try{
                await photosAPI_auto.delete(photoId);
                window.location = "/index.html";
            } catch(err){
                messageRenderer.showErrorMessage(err.response.data.message);
            }
        
        }
    }else{
        messageRenderer.showErrorMessage("Esta intentando borrar la foto de otro usuario");
    }
    
}

async function handleEdit(event){
    let photouserId = await photosAPI_auto.getById(photoId);
    let id = photouserId.userId;
    if(id === sessionManager.getLoggedId()){
        window.location.href = "edit_photo.html?photoId="+photoId;
    }else{
        messageRenderer.showErrorMessage("Esta intentando editar la foto de otro usuario");
    }
}

document.addEventListener("DOMContentLoaded", main);