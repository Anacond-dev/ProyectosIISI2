"use strict";

const formValidator = {

    validate: function (formData) {

        let errors = [];

        let name = formData.get("name");
        let president = formData.get("president");
        let fieldCapacity = formData.get("fieldCapacity");
        let foundationDate = formData.get("foundationDate");
        let photoURL = formData.get("photoURL");

        if (president.length < 3 || president.length % 5 != 0) {

            errors.push("El nombre del presidente ha de tener al menos 3 carácteres y ser múltiplo de 5");
        }

        if(fieldCapacity < 100 || fieldCapacity > 200000){

            errors.push("El aforo ha de ser como mínimo de 100 y como máximo de 200000");
        }

        return errors;
    }

};

export { formValidator };