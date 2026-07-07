"use strict";

import { parseHTML } from "../utils/parseHTML.js";

const rendComment = {
    asComment: function(comment, imageUrl, authorUser, targetUser){
        

        let html = `
            <div class="row bg-custom mt-4 py-2 ps-2 border rounded">
                <img src="${imageUrl}" class="rounded-circle" style="width: 150px; height: 150px">

                <div class="col-md">
                    <h3>${authorUser}</h3>
                    <p>${comment.commentText}</p>
                    <footer>${comment.createdAt}</footer>
                    <span>@${targetUser}</span>
                    <button type="button" class="btn btn-success" onclick="window.location.href='index.html?commentId=${comment.commentId}'">Edit</button>
                </div>
            </div>

        `;

        return parseHTML(html);
    }
}

export { rendComment };