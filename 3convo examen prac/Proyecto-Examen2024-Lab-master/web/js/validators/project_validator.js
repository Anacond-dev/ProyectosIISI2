"use strict";

import { sessionManager } from "/js/utils/session.js";

const validateProject = {

    validatenewproject: function (formData){
        let errors = [];
        
        let loggedUser = sessionManager.getLoggedUser();
        let projectleader = formData.get("projectleader");
        let budget = formData.get("budget");
        
        if(projectleader !== loggedUser.username){
            console.log(loggedUser);
            errors.push("El lider de proyecto debe de ser el usuario que se encuentra conectado actualmente");
        }
        if(projectleader.length === 0){
            errors.push("El nombre del lider del proyecto no puede estar vacio o tener un numero de letras multiplo de 5");
        }
        if(budget < 1000 || budget > 1000000){
            errors.push("El presupuesto debe de estar comprendido entre 1000 y 1000000");
        }

        return errors;
    }

}

export { validateProject };