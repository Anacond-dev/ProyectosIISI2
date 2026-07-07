"use strict";

import { commentsAPI_auto } from "./api/_comments.js";
import { usersAPI_auto } from "./api/_users.js";

let urlParams = new URLSearchParams(window.location.search);
let commentId = urlParams.get("commentId");
let currentComment = null;

function main(){
    let form = document.getElementById("comment-form");
    if(commentId !== null){
        loadComment();
    }
    //debugger;
    form.onsubmit = handleSubmit;
}

async function handleSubmit(event){
    //debugger;
    event.preventDefault();
    let form = event.target;
    let formData = new FormData(form);

    let users = await usersAPI_auto.getAll();

    let authoruser = users.find(u => u.username === formData.get("authorUserId")).userId;
    let targetuser = users.find(u => u.username === formData.get("targetUserId")).userId;

    formData.set("authorUserId",authoruser);
    formData.set("targetUserId",targetuser);

    try{
        //Para poder ver los valores del form
        /*for(let [key,value] of formData.entries()){
            console.log(key);
            console.log(value);
        }*/
        //debugger;
        if(commentId === null){
            await commentsAPI_auto.create(formData);
            window.location = "index2.html"
        }else{
            await commentsAPI_auto.update(formData, commentId);
            window.location = "index2.html";
        }
        
    }catch(err){
        console.error(err);
    }
}

async function loadComment(){
    let authoruser = document.getElementById("authorusername-input");
    let targetuser = document.getElementById("target-input");
    let date = document.getElementById("date-input");
    let comment = document.getElementById("comment-input");

    try{
        let currentComment = await commentsAPI_auto.getById(commentId);
        let users = await usersAPI_auto.getAll();
        let authorname = users.find(u => u.userId === currentComment.authorUserId).username;
        let targetname = users.find(u => u.userId === currentComment.targetUserId).username;

        authoruser.value = authorname;
        targetuser.value = targetname;
        date.value = currentComment.createdAt;
        comment.value = currentComment.commentText;
    }catch(err){
        console.error(err);
    }
}

document.addEventListener("DOMContentLoaded",main);