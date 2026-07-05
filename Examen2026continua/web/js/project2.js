"use strict";

import { cardProject } from "./renderers/projects.js";
import { projectsAPI_auto } from "./api/_projects.js";


async function main(){
    let contenedor = document.getElementById("contenedor");
    try{
        let lista = [];
        let projects = await projectsAPI_auto.getAll();
        for(let project of projects){
            let carta = cardProject(project);
            lista.push(project.budget);
            contenedor.appendChild(carta,projects);
        }
        resaltarMayorBudget(lista, projects);
    }catch(err){
        console.error(err);
    }
}

function resaltarMayorBudget(budgets,projects){
    budgets.sort();
    let b = budgets[0];
    /*
    
    */
    let id = projects.find(p => Number(p.budget) === Number(b)).projectId;
    let maxbudget = document.getElementById(id);
    maxbudget.classList.add("bg-warning");
}

document.addEventListener("DOMContentLoaded",main);