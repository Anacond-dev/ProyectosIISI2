"use strict";

import { parseHTML } from "/js/utils/parseHTML.js";

const tagRenderer = {
    asTag: function(phototag) {
        return parseHTML(`
            <span class="badge bg-primary me-1">${phototag.name}</span>
        `);
    }
};

export { tagRenderer };