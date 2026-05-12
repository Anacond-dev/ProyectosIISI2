"use strict";

import { projectsRenderer } from "./renderers/projects.js";
import { messageRenderer } from "./renderers/messages.js";
import { projectswithusersAPI_auto } from "./api/_projectswithusers.js";

async function main() {
    // Main function that will run when the page is ready
    loadprojects();
}

async function loadprojects(){

    try{
        let projects = await projectswithusersAPI_auto.getAll();
        let divGallery = document.getElementById("divGallery");

        for (let project of projects){
            let card = projectsRenderer.asCard(project);
            divGallery.appendChild(card)
        }
    }catch(err){
        messageRenderer.showErrorMessage("Error",err);
    }
}

document.addEventListener("DOMContentLoaded", main);