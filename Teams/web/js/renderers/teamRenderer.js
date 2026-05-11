"use strict";

import { teamsAPI_auto } from "../api/_teams.js";

const teamRender = {

    renderer: function (team) {

        let html = `
                   
                        <tr>
                            <td class = "text-center">
                                <div class="d-flex flex-column align-items-center">
                                        <img src ="${team.photoURL}" class = "imagen img-fluid mb-3">
                                        <a href = "create-team.html?teamId=${team.teamId}">
                                            <button type="submit" class = "btn btn-primary"> 
                                                Edit 
                                            </button>
                                        </a>
                                </div>
                            </td>
                            <td>${team.name}</td>
                            <td> ${team.president}</td>
                            <td>${team.fieldCapacity}</td>
                            <td> ${team.foundationDate}</td>
                        </tr>
                
            `;

        return html;

    },

    finalResult: async function () {

        let teams = await teamsAPI_auto.getAll();

        let parseo = "";

        for (let team of teams) {

            parseo += teamRender.renderer(team);
        }

        return parseo;

    }


};

export { teamRender };