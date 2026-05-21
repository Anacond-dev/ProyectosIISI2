"use strict";

import { gamesAPI_auto } from "/js/api/_games.js";
import { messageRenderer } from "/js/renderers/messages.js";
import { sessionManager } from "/js/utils/session.js";
import { userValidator } from "/js/validators/users.js";


let urlParams = new URLSearchParams(window.location.search);
let gameId = urlParams.get("gameId");
let currentGame = null;



async function loadCurrentGame() {
    let imageUrlInput = document.getElementById("input-image-url");
    let titleInput = document.getElementById("input-title");
    let developerInput = document.getElementById("input-developer");
    let releaseDateInput = document.getElementById("input-release-date");
    let reviewScoreInput = document.getElementById("input-review-score");

    try {
        currentGame = await gamesAPI_auto.getById(gameId);
        imageUrlInput.value = currentGame.imageUrl;
        titleInput.value = currentGame.title;
        developerInput.value = currentGame.developer;
        releaseDateInput.value = currentGame.releaseDate.slice(0, 10);
        reviewScoreInput.value = currentGame.reviewScore;
    } catch (err) {
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}




async function handleSubmitGame(event) {
    event.preventDefault();

    let form = event.target;
    let formData = new FormData(form);
    let errorsDiv = document.getElementById("errors");
    errorsDiv.innerHTML = "";

    let errors = userValidator.validateRegister(formData);
    if (errors.length > 0) {
        for (let error of errors) {
            messageRenderer.showErrorMessage(error);
        }
        return;
    }
    if (currentGame === null) {
        formData.append("userId", sessionManager.getLoggedId());
    } else {
        formData.append("userId", currentGame.userId);
    }
    try {
        if (currentGame === null) {
            await gamesAPI_auto.create(formData);
        } else {
            await gamesAPI_auto.update(formData, gameId);
        }
        window.location.href = "games.html";
    } catch (err) {
        messageRenderer.showErrorMessage(err.response.data.message);
    }
}

async function main() {
    if (gameId !== null) {
        await loadCurrentGame();
    }

    let gameForm = document.getElementById("form-game-create");
    gameForm.onsubmit = handleSubmitGame;
}

document.addEventListener("DOMContentLoaded", main);
