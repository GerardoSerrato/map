// var map = L.map('map').setView([51.505, -0.09], 13);

// var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//   maxZoom: 19,
//   attribution: '© OpenStreetMap'
// }).addTo(map);


// document.getElementById("getFile").addEventListener("change", function() {
//   var impresion = (arrayFile) => {
//     console.log(arrayFile[0]);
//   }
//   var file_to_read = document.getElementById("getFile").files[0];
//   var fileread = new FileReader();
//   fileread.onload = function(e) {
//     var content = e.target.result;
//     var intern = JSON.parse(content); // parse json 
//     console.log(intern.features[0]); // You can index every object
//   };

//   fileread.readAsText(file_to_read)
//   console.log(file_to_read);
// });

// var polygon = L.polygon([
//   [51.509, -0.08],
//   [51.506, -0.07],
//   [51.503, -0.06],
//   [51.51, -0.047]
// ]).addTo(map);


var palabra = 'Esta es una palabra';
console.log(palabra.includes('Esta es',0));