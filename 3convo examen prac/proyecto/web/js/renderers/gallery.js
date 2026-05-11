"use strict";

import { parseHTML } from "../utils/parseHTML.js";
import { photoRenderer } from "./photos.js";
import { sessionManager } from "../utils/session.js";

const galleryRenderer = {
    asCardGallery : function(photos){
        let galleryContainer = parseHTML ('<div class="photo-gallery row p-2 bg-light"> </div>');
        for(let photo of photos){
            if(sessionManager.isLogged() && sessionManager.getLoggedUser().userId === photo.userId){
                galleryContainer.appendChild(photoRenderer.asCard(photo));

            }else if(sessionManager.isLogged() === false){
                galleryContainer.appendChild(photoRenderer.asCard(photo));
            }     
        }
        return galleryContainer;
    }
}

export { galleryRenderer };