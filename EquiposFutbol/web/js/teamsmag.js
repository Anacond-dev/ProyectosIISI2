"use strict";

import { rendTeams } from "../js/renderers/teams.js";
import { teamsAPI_auto } from "../js/api/_teams.js";
//import { messageRenderer } from "../js/renderers/messages.js";

async function main(){
    let contenedor = document.getElementById("tbody");
    let tabla = ``;

    try{
        let equipos = await teamsAPI_auto.getAll();
        for(let equipo of equipos){
            tabla += rendTeams.asTable(equipo);
            contenedor.innerHTML = tabla;
            //parseHTML falla al parsear las etiquetas <tr></tr>
            //Por ello almacenamos cada uno de los datos pasados a string en la variable tabla y despues lo pasamos a html en el contenedor deseado usando innerHTML
        }
    }catch(error){
        console.log(error);
    }
}

document.addEventListener("DOMContentLoaded",main);