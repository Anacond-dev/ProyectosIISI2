"use strict";
import { gamesAPI_auto } from "/js/api/_games.js";
import { gamesRenderer } from "/js/renderers/juegos.js";
import { messageRenderer } from "/js/renderers/messages.js";


async function loadAllGames() {
    let gamesContainer = document.querySelector("div.container");
    try {
        let games = await gamesAPI_auto.getAll();
        let cardGames = gamesRenderer.asCardGames(games);
        
       gamesContainer.appendChild(cardGames);

    } catch (err) {
        messageRenderer.showErrorMessage("Error while loading games", err);
    }
}

function main() {

    loadAllGames();

}


document.addEventListener("DOMContentLoaded", main);