"use strict";

import { rendComment } from "../js/renderers/index2.js";
import { commentsAPI_auto } from "./api/_comments.js";
import { usersAPI_auto } from "./api/_users.js";
import { sessionManager } from "../js/utils/session.js";

async function findusers(){
    try{
        let comments = await commentsAPI_auto.getAll();
        let users = await usersAPI_auto.getAll();
        let container = document.getElementById("contenedor");
        let authorUser;
        let targetUser = sessionManager.getLoggedId();
        let imageUrl;
        let html;

        for(let comment of comments){
            
            if(comment.authorUserId !== null){
                authorUser = users.find(u => u.userId === comment.authorUserId).username;
                targetUser = users.find(u => u.userId === comment.targetUserId).username;
                imageUrl = users.find(u => u.userId === comment.authorUserId).avatarUrl;
            }else{
                authorUser = "Guest";
                targetUser = users.find(u => u.userId === comment.targetUserId).username;
                imageUrl = "https://img.icons8.com/nolan/1200/user-default.jpg";

            }
            
            html = rendComment.asComment(comment,imageUrl,authorUser,targetUser);
            
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