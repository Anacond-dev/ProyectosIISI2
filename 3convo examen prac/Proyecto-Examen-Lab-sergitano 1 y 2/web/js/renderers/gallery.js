"use strict";

import { parseHTML } from "../utils/parseHTML.js";
import { bookRenderer } from "../renderers/books.js";

const galleryrenderer ={
    asCardGallery: function(books){
        
        let galleryContainer= parseHTML('<div class="book-gallery row p-5 bg-light"> </div>');

        for (let book of books){
            let rendbook = bookRenderer.asCard(book);
            galleryContainer.appendChild(rendbook);
    
        }
        return galleryContainer;
    }
};

export{ galleryrenderer }