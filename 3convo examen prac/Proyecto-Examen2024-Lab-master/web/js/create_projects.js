"use strict";

import { messageRenderer } from "./renderers/messages.js";
import { validateProject } from "./validators/project_validator.js";
import { projectsAPI_auto } from "./api/_projects.js";
import { sessionManager } from "./utils/session.js";

let urlParams = new URLSearchParams(window.location.search);
let projectId = urlParams.get('id');
let formulario = document.getElementById("formid");

// Asegurarse de que el documento está completamente cargado
async function main(){

    if(projectId !== null && sessionManager.isLogged()){
        loadCurrentProject();
    }else if(!sessionManager.isLogged()){//Para evitar que un usuario que no ha iniciado sesion trate de editar un proyecto
        messageRenderer.showErrorMessage("No ha iniciado sesion");
    }

    formulario.onsubmit = handleFormSubmit;
}

async function loadCurrentProject(){
    let nombre = document.getElementById("name");
    let liderproyecto = document.getElementById("projectLeader");
    let fechafinal = document.getElementById("endDate");
    let presupuesto = document.getElementById("budget");
    let descripcion = document.getElementById("description");
    let imagen = document.getElementById("imageUrl");

    try{
        let currentproject = await projectsAPI_auto.getById(projectId);
        nombre.value = currentproject.name;
        liderproyecto.value = currentproject.projectLeader;
        fechafinal.value = currentproject.endDate;
        presupuesto.value = currentproject.budget;
        descripcion.value = currentproject.description;
        imagen.value = currentproject.imageUrl;
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
async function handleFormSubmit(event) {
    event.preventDefault();

    // Limpiar mensajes de error anteriores
    document.getElementById("errors").innerHTML = "";

    let form = event.target;
    let formData = new FormData(form);

    //Hago el siguiente for para ver los entries de mi formData ver que datos contiene y asi ver que ocurre

    /*for(var pair of formData.entries()){
        console.log(pair[0] + ', ' + pair[1]);
    }*/

    const errors = validateProject.validatenewproject(formData);

    //Añado el userid a los campos del formData ya que si la base de datos no lo recibe no puede crear el nuevo proyecto

    formData.append("userId",sessionManager.getLoggedId());

    if(errors.length > 0){
        // Mostrar errores de validación
        for(let error of errors){
            messageRenderer.showErrorMessage(error);
        }
    } else {
        try {

            if(projectId === null){
                await projectsAPI_auto.create(formData);
            }else{
                await projectsAPI_auto.update(formData,projectId);
            }
            
            //window.location.href = "projects.html";
            
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

document.addEventListener("DOMContentLoaded",main);