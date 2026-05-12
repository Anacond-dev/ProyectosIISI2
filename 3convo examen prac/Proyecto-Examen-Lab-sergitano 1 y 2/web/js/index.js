"use strict";

import {galleryrenderer} from "../js/renderers/gallery.js";
import {messageRenderer} from "../js/renderers/messages.js";
import {booksAPI_auto} from "../js/api/_books.js";

async function main(){
    try{
        let galleryBooks = await booksAPI_auto.getAll();
        let divGallery = document.getElementById("content");
        let rend = galleryrenderer.asCardGallery(galleryBooks);
        divGallery.appendChild(rend);
    }catch(err){
        console.log(err);
    }
}

document.addEventListener("DOMContentLoaded",main);
