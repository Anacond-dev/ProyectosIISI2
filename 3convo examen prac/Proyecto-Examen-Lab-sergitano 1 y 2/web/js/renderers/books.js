"use strict";

import { parseHTML } from "../utils/parseHTML.js";

const bookRenderer={
    asCard : function(book){
        let html=`
        <div class="col-sm-4 card mb-1 p-3 ">

            <a href="create_books.html?bookId=${book.bookId}">
                <img src="${book.imageUrl}" class="card-img-top img-fluid w-100">
            </a>
        	
            <div class="card-body text-center m-0 p-3">
                <h5 class="card-title m-0">#${book.bookId} ${book.title}</h5>
                <p class="card-text m-0 ">${book.author}</p>
                <a href="create_books.html?bookId=${book.bookId}" class="btn btn-primary">Edit</a>
            </div>
        </div>`;
        let card = parseHTML(html);
        return card;
    }
}
export { bookRenderer };
