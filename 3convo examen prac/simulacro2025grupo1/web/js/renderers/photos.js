"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const photoRenderer = {
    asBaseCard: function(photo) {
        return parseHTML(`
            <div class="container col-md-4 mb-4">
                <div class="card text-light bg-dark">
                    <img src="${photo.url}" class="card-img-top">
                    <div class="card-body">
                        <h5 class="card-title text-center">${photo.title} #${photo.photoId}</h5>
                        <div class="card-text" id="photo${photo.photoId}"></div>
                    </div>
                </div>
            </div>
        `);
    }
};

export { photoRenderer };