"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

//La clase que permite que se vean las cartas asi es d-flex align-items-center

const projectsRenderer = {
    asCard: function(project){
        let html = `<div class="card mb-3 p-3">
                <div class="row g-3">
                    <div class="col-md-2 d-flex align-items-center">
                        <div class="image-box">
                            <img src="${project.imageUrl}" class="img-fluid" alt="Imagen">
                        </div>
                    </div>

                    <div class="col-md-10">
                        <h3 class="card-title">${project.name}</h3>
                        <p class="card-text"> ${project.description}</p>
                        <div class="d-flex align-items-center user-info mt-3">
                        <div class="user-icon">
                            <img src="${project.avatarUrl}" alt="avatar" class="img-fluid rounded-circle me-5 object-fit">
                        </div>
                        <span><strong>@${project.username}</strong> -Edad: ${project.age}</span>
                        <a href="create_projects.html?id=${project.projectId}" class="btn btn-primary ms-3" id="editButton">Modificar</a>
                    </div>
                    </div>
                </div>
        </div>`
        let card = parseHTML(html);
        return card;
    }
};

export { projectsRenderer };