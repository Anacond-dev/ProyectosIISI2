"use strict";

//Comprobar siempre que se hayan importado bien los js
//Comprobar siempre .js

import { usersAPI_auto } from "./api/_users.js";
import { messageRenderer } from "./renderers/messages.js";
import { rendUser } from "./renderers/card.js";

const userDiv = document.getElementById("container");

async function main(){
    let users = await usersAPI_auto.getAll();
    let userCards = rendUser.asCardGallery(users);
    userDiv.append(userCards);
}


document.addEventListener("DOMContentLoaded",main);