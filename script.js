colorsSelection = ['green', 'red', 'yellow', 'blue', 'pink', 'brown', 'purple', 'grey', 'white', 'orange']


var map = L.map('map').setView([19.41, -99.15], 11);

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);

function uplFile() {
  document.getElementsByClassName("selectionSection")[0].style.display = 'block';
}

function nameCorrection(nameInput) {
  var myName = []
  var myName = nameInput.split(/(?=[A-Z])/);
  switch (myName[1]) {
    case 'Saul':
       myName[1] = 'Saúl';
       break
  default:
    break;
  }
  switch (myName[0]) {
    case 'miercoles':
    myName[0] = 'Miércoles'
    break;
    
    default:
      break;
    }
  myName[0] = myName[0][0].toUpperCase() + myName[0].slice(1);
  return myName
}

function cambiarColor(valueInput) {
  var getInput = document.getElementById(valueInput);
  if (getInput.checked== true) {
    console.log("Sí está activo");
    var file_to_read = document.getElementById("uploadFile").files[0];
    var fileread = new FileReader();
    fileread.readAsText(file_to_read);
    fileread.onload = function(e) {
      var content = e.target.result;
      var intern = JSON.parse(content);
      var nameValue = nameCorrection(valueInput);
      var coordList = [];
      var points;
      for (let x=0; x < intern.features.length; x++){
        var coordMod = [];
        var coordActual = intern.features[x].geometry.coordinates;
        var nameActual = intern.features[x].properties.name;
        if (nameActual.includes(nameValue[0]) && nameActual.includes(nameValue[1])){
          coordMod= turf.point([coordActual[1],coordActual[0]]);
          coordList.push(coordMod);
        } else {
          continue
        }
      };
      points = turf.featureCollection(coordList);
      var hull = turf.convex(points)
      console.log(hull);
      var polygon = L.polygon(hull.geometry.coordinates[0],{"color":"#ffb6c1"}).addTo(map);


    };
  }else {
    console.log("No está activo, " + valueInput);
  }
}


  
























