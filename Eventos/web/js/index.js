"use strict" ;

import { eventRender } from "./renderers/eventRender.js";
import {eventsAPI_auto} from "./api/_events.js";

async function main(){

    let container = document.getElementById("container");

    let eventos = await eventsAPI_auto.getAll();

    for( let e of eventos){
        
        container.appendChild(eventRender.render(e));
    }

}

document.addEventListener("DOMContentLoaded", main);