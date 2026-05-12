/*
	C.Arévalo
	header.js.  Control de header.html
	Marzo/2021
*/
"use strict ";
import { sessionManager } from "/js/utils/session.js";

document.addEventListener ("DOMContentLoaded", function () { // Control de la Cabecera
    document.title='Gallery '+window.location.pathname.split('/').pop(); // Título automático de la pestaña
	showUser(); // Analizar variables locales para mostrar usuario o Anónimo
    addLogoutHandler(); // Manejador del Logout
    hideHeaderOptions(); // Conmutar opciones en función de la conexión
});

function showUser() { // Mostrar usuario conectado o anónimo
    let title = document.getElementById("showUserName");
    let text; // Icono Font Awesome de usuarios conectados como
    if ( sessionManager.isLogged() ) { // Muestra datos del usuario conectado
            text = `<small class="fst-italic">
                        #${sessionManager.getLoggedUser().userId}
                        ${sessionManager.getLoggedUser().username}
                    </small> 
                    
            `;
    } else {
            text = `<small><i class="fa fa-hand-stop-o"></i> Guest</small>`; // Muestra usuario anónimo
    }
    title.innerHTML = text; // Muestra usuario anónimo
}

function addLogoutHandler () { // Borrar usuario y token, devolviendo control al inicio
    let logoutButton = document.getElementById ("navbar-logout");
    logoutButton.addEventListener ("click", function () { // Al Pulsar logout
        sessionManager.logout (); // Función que borra variables localStorage
        window.location.href = "index.html"; // Devuelve control al inicio
    });
}

function hideHeaderOptions () { // Conmutar opciones disponibles en función de usuario conectado
    let headerLogin = document.getElementById ("navbar-login");
    let headerLogout = document.getElementById ("navbar-logout");
    let headerRecent = document.getElementById ("navbar-recent");
    if ( sessionManager.isLogged() ) {
            headerLogin.style.display = "none";
    } else {
            headerRecent.style.display = "none";
            headerLogout.style.display = "none";
    }
}
 