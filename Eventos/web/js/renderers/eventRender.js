"use strict";

import { parseHTML } from "../utils/parseHTML.js";

const eventRender = {

    render: function (evento) {

        let html = `

       
                <div class="borde row align-items-center mt-3 mb-5 ">
                    
                        <div class=" col-md-4 event-img">
                            <img src="${evento.imageUrl}" alt="imagen del evento" class="foto">
                        
                        </div>

                        <div class=" col-md-8 event-body mt-5 text-center">

                            <p class="event-name">Nombre: ${evento.name}</p>
                            <p class="event-date">Fecha: ${evento.eventDate}</p>
                            <p class="event-maxParticipants">Número máximo de participantes: ${evento.maxParticipants}</p>
                            <p class="event-place">Lugar: ${evento.place}</p>

                        </div>
                </div>`
            

        let parse = parseHTML(html);
        return parse;

    }

}

export { eventRender };