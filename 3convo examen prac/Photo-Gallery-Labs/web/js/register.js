"use strict";

import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./validators/users.js";
import { usersAPI_auto } from "./api/_users.js";

document.addEventListener("DOMContentLoaded", function() {
    // Capturar el clic del botón
    document.getElementById("register-button").addEventListener("click", function() {
        // Obtener el formulario
        let registerForm = document.getElementById("register-form");
        
        // Desencadenar el evento submit del formulario
        registerForm.dispatchEvent(new Event("submit"));
    });
});


function main(){
    let registerForm = document.getElementById("register-form");
    registerForm.onsubmit = handleSubmitRegister;
}

async function handleSubmitRegister(event){
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);
    
    let errors = userValidator.validateRegister(new FormData(form));

    // Eliminar password2 del formData ya que no debe almacenarse en la BD
    let password2 = formData.get("password2");
    formData.delete("password2");

    if (errors.length > 0){
        // Mostrar errores de validación con SweetAlert2
        Swal.fire({
            title: 'Error en el formulario',
            html: errors.join('<br>'),
            icon: 'error',
            confirmButtonText: 'Entendido',
            timer: 10000, // Permanece visible 10 segundos
            timerProgressBar: true // Muestra una barra de progreso
        });
        
        // También mostrar en la interfaz para referencia visual
        let errorsDiv = document.getElementById("errors");
        errorsDiv.innerHTML = "";
        for (let error of errors){
            messageRenderer.showErrorMessage(error);
        }
    } else {
        try {
            // Corrección del nombre del campo Username -> username (minúsculas)
            if (formData.has("Username")) {
                let usernameValue = formData.get("Username");
                formData.delete("Username");
                formData.append("username", usernameValue);
            }

            // Intentar crear el usuario y manejar la respuesta
            let response = await usersAPI_auto.create(formData);
            
            // Mostrar mensaje de éxito
            messageRenderer.showSuccessMessage("User registered successfully!");
            
            // Redireccionar al login después de 2 segundos
            setTimeout(() => {
                window.location.href = "login.html";
            }, 2000);
            
        } catch (error) {
            // Mostrar mensaje de error con SweetAlert2
            console.error(error);
            let errorMessage = "Error creating user. Please try again.";
            
            if (error.response && error.response.data) {
                errorMessage = "Error: " + error.response.data.message;
            }
            
            Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Entendido',
                timer: 10000, // Permanece visible 10 segundos
                timerProgressBar: true // Muestra una barra de progreso
            });
            
            // También mostrar en la interfaz para referencia visual
            messageRenderer.showErrorMessage(errorMessage);
        }
    }
}

document.addEventListener("DOMContentLoaded", main);