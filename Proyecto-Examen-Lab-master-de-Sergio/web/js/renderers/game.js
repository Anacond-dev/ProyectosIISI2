"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";

const gameRenderer = {
    asCard: function (game) {

        //if(!game.reviewScore % 10 === 0){

        /*let html = `<div class="col-md-4">
<div class="card bg-dark text-light">
<h3 class="card-title text-center">${game.title}</h3>
<a href="create_game.html?gameId=${game.gameId}">
<img src="${game.imageUrl}" class="card-img-top">
</a>
<div class="card-body">
<h5 class="card-propiedad1 text-center"> Desarrollador: ${game.developer}</h5>
<h5 class="card-propiedad2 text-center"> Fecha: ${game.releaseDate}</h5>
<h5 class="card-propiedad2 text-center"> Nota: ${game.reviewScore}</h5>
</div>
</div>
</div>`;*/

    let html = 
    `<div class="row align-items-center">
        <div class="card bg-dark text-light m-2">
            <div class="col-md-4 my-3">
                <a href="create_game.html?gameId=${game.gameId}">
                    <img src=${game.imageUrl} class="card-img w-50">
                </a>
            </div>
            <div class="col-md-8">
                
            </div>
        </div>
    </div>`

    //}else{}
        let card = parseHTML(html);
        return card;
    },

    /*
    asDetails: function (photo) {
        let html = `<div class="photo-details">
<h3>${photo.title}</h3>
<h6>${photo.description}</h6>
<p>Uploaded by <a href="user_profile.html" class="user-link">User ${photo.userId}
</a> on ${photo.date}</p>
<hr>
<img src="${photo.url}" class="img-fluid">
</div>`;
        let photoDetails = parseHTML(html);
        return photoDetails;
    }*/
};

export { gameRenderer };
