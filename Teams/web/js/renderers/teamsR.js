"use strict";

import { teamsAPI_auto } from "../api/_teams.js";


//name, president, fieldCapacity, foundationDate, photoURL
const teamsRenderer = {
    asCard: function (team) {
        let html = `<thead>
        <tr>
          <th class="w-25">
          <img src="${team.photoURL}" class="img-fluid card-image embed-responsive-item">
          </th>
          <th scope="col">${team.name}</th>
          <th scope="col">${team.president}</th>
          <th scope="col">${team.fieldCapacity}</th>
          <th scope="col">${team.foundationDate}</th>
          <div class="card-footer w-100">
                                <a class="btn btn-success" href="/create_team.html?teamId=${team.teamId}">
                                ✏️</a>
                    </div>
        </tr>
      </thead>`;
        
        return html;
    },

    asCardGallery: async function () {
        let teams = await teamsAPI_auto.getAll();

        let html = '';

        for(let team of teams){
            html += this.asCard(team);
        }

        return html;
       
    }
};

export { teamsRenderer };