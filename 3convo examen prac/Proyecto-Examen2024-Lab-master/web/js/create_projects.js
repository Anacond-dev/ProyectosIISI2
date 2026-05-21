"use strict";

import { messageRenderer } from "./renderers/messages.js";
import { validateProject } from "./validators/project_validator.js";
import { projectsAPI_auto } from "./api/_projects.js";
import { sessionManager } from "./utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let projectId = urlParams.get('id');

//let projectId = null;

// Asegurarse de que el documento está completamente cargado
document.addEventListener("DOMContentLoaded", function() {

    if(projectId !== null){
        loadCurrentProject();
    }

    // Adjuntar el evento al formulario
    document.getElementById("formid").addEventListener("submit", handleFormSubmit);
});

async function loadCurrentProject(){
    let nombre = document.getElementById("name");
    let liderproyecto = document.getElementById("projectleader");
    let fechafinal = document.getElementById("endDate");
    let presupuesto = document.getElementById("budget");
    let descripcion = document.getElementById("description");
    let imagen = document.getElementById("image");

    //pageTitle.textContent = "Editing a project #"+projectId;
    try{
        let currentproject = await projectsAPI_auto.getById(projectId);
        nombre.value = currentproject.name;
        liderproyecto.value = currentproject.projectleader;
        fechafinal.value = currentproject.endDate;
        presupuesto.value = currentproject.budget;
        descripcion.value = currentproject.description;
        imagen.value = currentproject.image;
    }catch(err){
        console.error(err);
    }
}

function getUrlParameter(name){
    const url = window.location.search;
    const urlParams = new URLSearchParams(url);
    return urlParams.get(name);
}

// Función para manejar el envío del formulario
async function handleFormSubmit(e) {
    e.preventDefault();

    // Limpiar mensajes de error anteriores
    document.getElementById("errors").innerHTML = "";

    let form = document.getElementById("formid");
    let formData = new FormData(form);

    const errors = validateProject.validatenewproject(formData);

    if(errors.length > 0){
        // Mostrar errores de validación
        for(let error of errors){
            messageRenderer.showErrorMessage(error);
        }
    } else {
        try {
            
            let response;

            if(projectId){
                response = await projectsAPI_auto.update(formData, projectId);
                messageRenderer.showSuccessMessage("Proyecto actualizado con exito")
            }else{//Aqui añadimos el id de usuario
                let userId = sessionManager.getLoggedId();
                console.log(userId);
                console.log(formData.values());//Comprobar que este el projectleader
                formData.append("userId",userId);
                response = await projectsAPI_auto.create(formData);
                messageRenderer.showSuccessMessage("Proyecto registrado con éxito");
            }

            // Limpiar el formulario
            form.reset();
            
            // Redireccionar a la página de proyectos después de 2 segundos
            setTimeout(() => {
                window.location.href = "projects.html";
            }, 2000);
            
        } catch (error) {
            console.error("Error al crear el proyecto:", error);
            
            // Extraer mensaje de error detallado si está disponible
            let errorMessage = "El formulario no ha sido enviado correctamente";
            
            if (error.response && error.response.data && error.response.data.message) {
                errorMessage = error.response.data.message;
            }
            
            messageRenderer.showErrorMessage(errorMessage);
        }
    }
}
