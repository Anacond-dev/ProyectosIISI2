"use strict";

const eventValidator = {

    validateEvent: function (formData) {

        let errors = [];

        let name = formData.get("name");
        let eventDate = formData.get("eventDate");
        let maxParticipants = formData.get("maxParticipants");
        let place = formData.get("place");
        let imageUrl = formData.get("imageUrl");

        if (name.length < 3) {

            errors.push("El nombre ha de tener al menos 3 caracteres");
        }

        return errors;
    }
};

export { eventValidator };