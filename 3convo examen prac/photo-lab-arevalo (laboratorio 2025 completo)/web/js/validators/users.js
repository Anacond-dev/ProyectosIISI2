/**
 * users.js Módulo validador de registro de usuarios
 */
"use strict";

//Lo usaremos para validar los usuarios

const userValidator = {
    validateRegister: function (fData) {
		let errors = []; // Inicializa array de errores
        let email_pattern = /^(\w+@(alum\.)?us.es)$/; //Patron para un email
        // Validación repetición passwords
        //Exigimos un tamaño minimo para el nombre
        if (fData.get("firstName").length<3 || fData.get("lastName").length<3 ) {
            errors.push ("[err-1] firstName and lastName must be a length greater than 3!");
        }
        //Ponemos a prueba el patron de email
        if (!email_pattern.test(fData.get("email"))) {
            errors.push ("[err-3] It is not a Seville University email!");
        } 
        //Se comprueba que la contraseña introducida es la correcta en ambos casos
        if (fData.get("password") != fData.get("password2") ) {
            errors.push ("[err-2] Passwords mismatch!");
        }
        return errors;
    }
}

export { userValidator };