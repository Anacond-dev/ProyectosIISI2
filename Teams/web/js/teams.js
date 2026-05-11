"use strict";

import { teamRender } from "./renderers/teamRenderer.js";

async function main(){

    let insert = document.getElementById("tbody");
  
    insert.innerHTML = await teamRender.finalResult();


}

document.addEventListener("DOMContentLoaded", main);