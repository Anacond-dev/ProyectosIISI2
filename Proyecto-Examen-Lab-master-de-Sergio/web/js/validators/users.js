"use strict";

const userValidator = {
    validateRegister: function (formData) {
        let errors = [];

        let title = formData.get("title");
        let developer = formData.get("developer");
        let reviewScore = Number(formData.get("reviewScore"));

        if (reviewScore < 0 || reviewScore > 100) {
            errors.push("La nota debe estar entre 0 y 100");
        }

        if (developer.length === title.length) {
            errors.push("La longitud del desarrollador debe ser diferente a la del titulo");
        }

        return errors;
    }
};

export { userValidator };
