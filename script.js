var listActive = [];

function cambiarColor(valueInput) {
  var getInput = document.getElementById(valueInput);
  if (getInput.checked== true) {
    listActive.push(valueInput);
    console.log(listActive);
  }else {
    var removeElement = listActive.indexOf(valueInput);
    listActive.splice(removeElement,1)
    console.log(listActive);
  }
}

function llamadoAsi() {
  console.log(listActive);
}

var map = L.map('map').setView([19.41, -99.15], 11);

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);