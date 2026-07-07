"use strict";

import { rendComment } from "../js/renderers/index2.js";
import { commentsAPI_auto } from "./api/_comments.js";
import { usersAPI_auto } from "./api/_users.js";

async function findusers(){
    try{
        let comments = await commentsAPI_auto.getAll();
        let users = await usersAPI_auto.getAll();
        let container = document.getElementById("contenedor");
        for(let comment of comments){
            let authorUser = users.find(u => u.userId === comment.authorUserId).username;
            let targetUser = users.find(u => u.userId === comment.targetUserId).username;
            let imageUrl = users.find(u => u.userId === comment.authorUserId).avatarUrl;
            //debugger;
            let html = rendComment.asComment(comment,imageUrl,authorUser,targetUser);
            //debugger;
            container.appendChild(html);
        }
    }catch(err){
        console.error(err);
    }

}

function main(){
    
    findusers();

}

document.addEventListener("DOMContentLoaded",main);