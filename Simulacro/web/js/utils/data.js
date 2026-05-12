/*
	C.Arévalo
	data.js.  Array JSON de photos para renderizar galería y detalles
	Marzo/2022
*/
'use strict';

// 5.3 Fotos de la galería. Se le añade el id a la photo
const galleryPhotos = [
    {	photoId:0,
        title:"Samoyed",
        description:"A very good boy.",
        userphotoId: 1, date:"22/12/2016",
        url:"https://i.ibb.co/tY1Jcnc/wlZCfCv.jpg",
		userId: "1: Carlos"
		
    },
    {	photoId:1,
        title:"Spanish tortilla",
        description:"With onion",
        userphotoId: 2,date:"22/12/2017",
        url:"https://cdn1.cocina-familiar.com/recetas/thumb/tortilla-de-patata-con-cebolla.jpg",
		userId: "2: Margarita"
    },
    {	photoId:2,
        title:"Seville",
        description:"The beautiful city of Seville",
        userphotoId: 3,date:"22/12/2018",
        url:"images/sevilla.jpg",
		userId: "3: David"
    },
    {	photoId:3,
        title:"Alaska mountains",
        description:"Lake at Alaska Mountains",
        userphotoId: 4,date:"22/12/2019",
        url:"images/example.jpg",
		userId: "4: Inma"
    },
];

export { galleryPhotos };
