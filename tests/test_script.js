var map = L.map('map').setView([51.505, -0.09], 13);

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

document.getElementById("getFile").addEventListener("change", function() {
  var file_to_read = document.getElementById("getFile").files[0];
  var fileread = new FileReader();
  fileread.onload = function(e) {
    var content = e.target.result;
    var intern = JSON.parse(content); // parse json 
    console.log(intern); // You can index every object
  };
  fileread.readAsText(file_to_read)
  console.log(file_to_read);
});