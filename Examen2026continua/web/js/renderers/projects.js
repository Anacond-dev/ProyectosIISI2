"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

function cardProject(project){
    let html = 
    `<div class="row" id="${project.projectId}">
        <ul class="ms-5">
            <li>
                ${project.name}
                <img src="${project.imageUrl}" class="w-25"></img>
            </li>
            <li>
                Lider del Proyecto: ${project.projectLeader}
            </li>
            <li>
                Fecha de finalizacion: ${project.endDate}
            </li>
            <li>
                Presupuesto: ${project.budget}
            </li>
            <li>
                Descripcion: ${project.description}
            </li>
        </ul>
    </div>`
    ;

    let card = parseHTML(html);
    return card;
}

export{ cardProject };