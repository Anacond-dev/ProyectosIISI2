"use strict";

import { eventValidator } from "./validators/formValidator.js";
import { messageRenderer } from "./renderers/messages.js";
import { eventsAPI_auto } from "./api/_events.js";

async function main() {

    let formulario = document.getElementById("formulario");
    formulario.onsubmit = handleSubmitForm;

}


async function handleSubmitForm(event) {

    event.preventDefault();

    let formData = new FormData(event.target);

    let errors = eventValidator.validateEvent(formData);

    if (errors.length > 0) {

        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";

        for (let e of errors) {

            messageRenderer.showErrorMessage(e);

        }
    }

    else {
        try {

            let f = await eventsAPI_auto.create(formData);
            window.location.href = `index.html`;


        } catch (err) {
            messageRenderer.showErrorMessage(err);
        }
    }
}

document.addEventListener("DOMContentLoaded", main);