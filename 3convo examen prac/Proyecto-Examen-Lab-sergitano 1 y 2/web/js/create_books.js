"use strict";


import {messageRenderer} from "./renderers/messages.js";
import { booksAPI_auto } from "./api/_books.js";

let currentBook;
let urlParams = new URLSearchParams(window.location.search);
let bookId = urlParams.get("bookId");

async function main(){

    if(bookId !== null){
        loadCurrentBook();
    }

    let registerForm = document.getElementById("formId");
    registerForm.onsubmit = sendRegister;
}


async function sendRegister(event){

    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    //El inicio de sesion para crear o actualizar la base de datos esta desactivado, se cambia desde el json

    try {
        if(bookId === null){
            await booksAPI_auto.create(formData);
            window.location.href = "index.html";
        }else{
            await booksAPI_auto.update(formData,bookId);
            window.location.href = "index.html";
        }

    } catch (err) {
        console.log(err);
    }
}

async function loadCurrentBook(){
    let title = document.getElementById("title-input");
    let author = document.getElementById("autor-input");
    let releaseDate = document.getElementById("releaseDate-input");
    let numPages = document.getElementById("numPages-input");
    let url = document.getElementById("imageUrl-input");
    let boton = document.getElementById("boton");

    boton.innerText = "Editar libro";
    try{
        currentBook = await booksAPI_auto.getById(bookId);
        title.value = currentBook.title;
        author.value = currentBook.author;
        releaseDate.value = currentBook.releaseDate;
        numPages.value = currentBook.numPages;
        url.value = currentBook.imageUrl;
    }catch (err){
        messageRenderer.showErrorMessage('Error al editar el libro: ' + err.response.data.message);
    }
}

document.addEventListener("DOMContentLoaded", main);