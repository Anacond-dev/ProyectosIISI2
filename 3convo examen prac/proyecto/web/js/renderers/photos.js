"use strict";
import { parseHTML } from "../utils/parseHTML.js";
import { tagsAPI_auto } from "../api/_tags.js";

const photoRenderer = {
	asCard: function (photo) {
		let html = `
		<div class="col-sm-4 card mb-1 p-1">
			<img class="card-img-top" src="${photo.url}" alt="Card Image">
			<div class="card-body text-center mt-1">
				<h5>#${photo.photoId}-${photo.title}</h5>
				<p class="card-text text-center fst-italic">${photo.description}</p>
				<button type="button" class="btn btn-danger mt-5 delete-btn">
					Delete Tag
				</button>
			</div>
			<div class="card-footer m-1 fw-light fs-6">
				#${photo.userId} ${photo.visibility} ${photo.name} ${photo.date}
			</div>
		</div>`;

		let card = parseHTML(html);
		card.querySelector(".delete-btn").addEventListener("click", async () => {
			try {
				await tagsAPI_auto.delete(photo.tagId);
				alert("Etiqueta eliminada correctamente");
				//card.remove(); // Elimina la tarjeta del DOM
			} catch (error) {
				console.error("Error eliminando la etiqueta:", error);
				alert("Error al eliminar la etiqueta");
			}
		});

		return card;
	}
};



export { photoRenderer };