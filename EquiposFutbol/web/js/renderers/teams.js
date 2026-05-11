"use strict";

import { parseHTML } from "../utils/parseHTML.js";

const rendTeams = {
    asTable: function(team){
        let html =`
        <tr>
            <td class="text-center">
                <div class="d-flex flex-column align-items-center">
                    <img class="imagen img-fluid mb-3" src="${team.photoURL}">
                    <a href="registerTeam.html?teamId=${team.teamId}" class="btn btn-primary">
                        Edit
                    </a>
                </div>
            </td>
            <td>
                ${team.name}
            </td>
            <td>
                ${team.president}
            </td>
            <td>
                ${team.fieldCapacity}
            </td>
            <td>
                ${team.foundationDate}
            </td>
        </tr>`;

        //parseHTML falla cuando trata de parsear las etiquetas <tr></tr>
        //let table = parseHTML(html);

        return html;
    }

    /*asMainTable: function(teams){
        
        let html = `<table id="tabla" class="table">
            <thead>
                <tr>
                    <th scope="col">Logo</th>
                    <th scope="col">Name</th>
                    <th scope="col">President</th>
                    <th scope="col">Field capacity</th>
                    <th scope="col">Foundation Date</th>
                </tr>
            </thead>
            <tbody id="tbody">
            </tbody>
        </table>`;

        let mtable = parseHTML(html);

        let sol = mtable.getElementById("tbody");

        for(team of teams){
            let table = this.asTable(team);
            sol.appendChild(table);
        }

        return sol;

    }*/

    
}

export { rendTeams };