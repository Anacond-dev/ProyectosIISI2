/**
 * register.js Controlador de la vista register.html
 * C Arévalo, Abr/2024
 */
"use strict"; // Control estricto de errores
import { messageRenderer } from "./renderers/messages.js";
import { userValidator } from "./validators/users.js";
import { usersAPI_auto } from "./api/_users.js";
import { authAPI_auto } from "./api/_auth.js";
import { sessionManager } from "./utils/session.js";

const form = document.getElementById("register-form"); //Obtenemos en un diccionario todos los datos del formulario
const divErrors = document.getElementById("errors"); //Obtenemos el contenido del contenedor de errores


async function main() {
    // alert ("Tengo control con register.js, después de DOMContentLoaded!");
    // messageRenderer.showSuccessMessage("Tengo control con register.js, después de DOMContentLoaded!");
    form.onsubmit = validateForm; // Esperar a que se realice la subida del formulario y entonces llamar a la funcion con este evento
}

async function validateForm(event) {
    let myFD = new FormData (event.target); // Transforma form DOM en formData
    event.preventDefault(); // Cancela el submit
    divErrors.innerHTML=""; // Limpia caja de errores
    // messageRenderer.showSuccessMessage("Me has pulsado Submit! y firstName = "+myFD.get("firstName"));
    let errors = userValidator.validateRegister(myFD); //aplicamos la funcion para validar nuestro usuario
    if (errors.length!=0) {//Se crea un mensaje de error dentro de la etiqueta <small>error</small>
        messageRenderer.showErrorMessage("<small>"+errors.join("; &emsp; ")+"</small>"); // Prueba de enlace al validador
    } else {//En el caso de que no haya ningun mensaje de error se manda un mensaje de exito

        try{

            myFD.delete("password2");

            let loginData = await authAPI_auto.register(myFD);
            let sessionToken = loginData.sessionToken;
            let loggedUser = loginData.user;

            sessionManager.login(sessionToken, loggedUser);

            messageRenderer.showSuccessMessage(`<h3 class='d-inline'>
            <i class='fa fa-check'></i>
                </h3>Todo Ok!\nSe simula el envío del formulario al servidor! 
            <h3 class='d-inline'>
                <i class='fa fa-spinner fa-spin'></i>
            </h3>`);
            //Se espera un tiempo y se regresa a la pagina principal
            setTimeout(function(){						// Durante 5 segundos
            window.location.href="index.html";		// Y se vuelve a la galería
            }, 
            1000);
        }catch(err){
            console.log(err);
        }
    }
  

}

document.addEventListener("DOMContentLoaded", main); //Esperamos a que se realice algun evento en el documento