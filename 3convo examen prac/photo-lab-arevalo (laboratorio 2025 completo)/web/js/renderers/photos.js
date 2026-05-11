/*
    photos.js   Renderizador de una foto
    Mar/2024
*/ 

"use strict";
import { parseHTML } from "../utils/parseHTML.js"; // Generador de objetos DOM

const photoRenderer = {
    asCard : function(photo) {// Renderizador de photo tipo card
        //Basicamente crea la carta de la foto, donde se iran añadiendo los parametros url
        //Destacar que para añadir un parametro en una url usamos ?photoId=${photo.photoId}
        //La estructura de la carta es como cualquier otra aplicando el cuerpo y los titulos y cada uno de sus atributos
        let html = `<div class="col-sm-4 card mb-1 p-1">
                        <div class="">
                            <a href="photo_detail.html?photoId=${photo.photoId}">
                                <img src="${photo.url}" class="img-fluid w-100">
                            </a>
                        </div>	
                        <div class="card-body text-center m-0 p-0">
                            <h5 class="card-title m-0">#${photo.photoId} ${photo.title}</h5>
                            <p class="card-text m-0 ">${photo.description}</p>
                            <p class="card-text text-end fst-italic">
                                <small>User @${photo.userId} ${photo.username}  <small>
                                <img src="${photo.avatarUrl}" class="photo-avatarUrl">
                                <small class="badge bg-secondary text-white">${photo.visibility}</small>
                            </p>
                        </div>
                    </div>
        `;
        return parseHTML(html);
    },

    //En esta parte se describe la descripcion de la foto en si
    asDetail : function(photo) {
        let html = ` <div class= "card mb-3">
                        <img class="img-fluid" src="${photo.url}">
                        <h3 class="m-0 p-0">#${photo.photoId} ${photo.title}</h3>
                        <h6 class="m-0 p-0">${photo.description}</h6>	
                        <p class="card-text text-end fst-italic">
                            <small>User @${photo.userId} ${photo.username}  <small>
                            <img src="${photo.avatarUrl}" class="photo-avatarUrl">
                            <small class="badge bg-secondary text-white">${photo.visibility}</small>
                        </p>
                    </div>
        `;
        return parseHTML(html);
    }
 }

 export { photoRenderer };
