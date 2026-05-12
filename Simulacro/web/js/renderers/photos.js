/*
	IISSI
	photos.js.  Renderización de Fotos
	Mayo/2026
*/

"use strict";
import { parseHTML } from "/js/utils/parseHTML.js"; // Función para crear elementos del DOM
const photoRenderer = { 
	// 5.2 Devuelve Card para la galería
	asCard: function (photo) { // El parámetro es un objeto photo
	 let html = `<div class="col-sm-4 card mb-1 p-1">
					<div class="">
						<a href="photo_detail.html?photoId=${photo.photoId}">
							<img src="${photo.url}" class="img-fluid card-image w-100 ">
						</a>
					</div>	
					<div class="card-body text-center m-0 p-0">
						<h6 class="card-title m-0">(#${photo.photoId}) ${photo.title}</h6>
						<p class="card-text m-0 py-0 "><small>${photo.description}</small></p>
						<p class="card-text text-end fst-italic"><small>
							<small class="m-0 py-0">(User @${photo.userId})
							<small class="badge bg-secondary text-white">${photo.visibility}</small>
						</p>
					</div>
					
				</div>`;
	 let card = parseHTML (html);
	 return card;
	},
	// Detalles de la foto
	asDetails: function (photo) {
		let html = `<div class="row">
			<div class="col-md-6">
				<img src="${photo.url}" class="img-fluid rounded">
			</div>
			<div class="col-md-6 p-0">
			  <div clas="row p-0">
				<h5>#${photo.photoId} ${photo.title}</h5>
				<h6>${photo.description}</h6>
				<p><small> Uploaded by (User 
					<a href="user_profile.html" class="user-link">@${photo.userId} </a>)
				</small>
				</p>
				<h5 class="float-start badge bg-secondary text-white col-md-4">${photo.visibility} visibility</h5>
				
		   </div>	
		</div>`;

		let photoDetails = parseHTML (html);
		return photoDetails;
		},
};
export { photoRenderer };