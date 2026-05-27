"use strict";

const validateProject = {

    validatenewproject: function (formData){
        let errors = [];
        
        let projectleader = formData.get("projectLeader");
        let name = formData.get("name");
        let budget = formData.get("budget");

        if(projectleader.length === name.length){
            errors.push("EL nombre del proyecto y el del lider no puede tener la misma cantidad de caracteres");
        }
        if(budget < 1000 || budget > 1000000){
            errors.push("El presupuesto debe de estar entre 1000 y 1000000");
        }

        return errors;
    }

}

export { validateProject };