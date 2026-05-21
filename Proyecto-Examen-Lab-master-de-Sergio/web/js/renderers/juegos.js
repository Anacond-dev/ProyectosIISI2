"use strict";
import { parseHTML } from "/js/utils/parseHTML.js";
import { gameRenderer } from "/js/renderers/game.js";



const gamesRenderer = {
    asCardGames: function (games) {
        let gamesContainer = parseHTML('<div class="photo-gallery"></div>');
        let row = parseHTML('<div class="row justify-content-center"></div>'); //añadir justify-content-center al class si queremos poner fotos en el chentro o con -end para la derecha
        gamesContainer.appendChild(row);

        let counter = 0; //Contador de fotos por fila
        for (let game of games) {
            let card = gameRenderer.asCard(game);

            row.appendChild(card);
            counter += 1;
            if (counter % 1 === 0) { //Modificar el 3 si queremos poner menos fotos por fila
                row = parseHTML('<div class="row justify-content-center"></div>'); //añadir justify-content-center tambien aqui
                gamesContainer.appendChild(row);
            }
        }
        return gamesContainer;
    }
};
export { gamesRenderer };