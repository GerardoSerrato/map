colorSelection = ['#000000', '#0000FF', '#008000', '#800080', '#FF0000', '#FF69B4',
'#B22222', '#FF7F50', '#F0F8FF', '#32a840', '#8da832', '#32a6a8']


var map = L.map('map').setView([19.41, -99.15], 11);

var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '© OpenStreetMap'
}).addTo(map);


group = L.featureGroup().addTo(map);

pointsGroup = L.featureGroup().addTo(map);

pointsGroup.bringToFront();

function nameObject(nameInput) {
  var myName = []
  var myName = nameInput.split(' ')
  return myName[myName.length-1]
}

function nameValidation(nameInput) {
  var myName = []
  var myName = nameInput.split('')
  var numbers = ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20']
  var nameTemp = myName[myName.length-1]
  return nameTemp in numbers
}

function random(min, max) {
  return Math.floor((Math.random() * (max - min + 1)) + min);
}
    
function cambiarColor(valueInput) {
  var getInput = document.getElementById(valueInput);
  if (getInput.checked== true) {
    /*Lectura de documento cargado*/
    var file_to_read = document.getElementById("uploadFile").files[0];
    var fileread = new FileReader();
    fileread.readAsText(file_to_read);
    fileread.onload = function(e) {
      /*Se nombran variables locales*/
      var content = e.target.result;
      var intern = JSON.parse(content);
      var coordList = [];
      var points;
      pointsTemp = L.featureGroup();
      /*Se recorre array para encontrar coincidencias*/
      for (let x=0; x < intern.features.length; x++){
        /*Reseteo de variables*/
        var coordMod = [];
        var coordActual = intern.features[x].geometry.coordinates;
        var nameActual = intern.features[x].properties.name;
        var nameFinal = nameObject(nameActual);
        /*Condición de concordancia entre nombres*/
        if (valueInput == nameFinal){
          /*Se agregan coordenadas a lista*/
          coordMod= turf.point([coordActual[1],coordActual[0]]);
          coordList.push(coordMod);
          /*Se crea marcador de lugar dentro de grupo temporal*/
          L.marker([coordActual[1],coordActual[0]], {title: nameActual}).addTo(pointsTemp)
        } else {
            continue
        }
      };
      console.log(coordList);
      /*Se agregan detalles de grupo de marcadores*/
      feature = pointsTemp.feature = pointsTemp.feature || {};
      feature.type = feature.type || "Feature"; 
      var props = feature.properties = feature.properties || {};
      props.myId = valueInput;
      /*Se agrega grupo de puntos temporal a grupo general de puntos*/
      pointsTemp.addTo(pointsGroup);
      /*Se calcula polígono con coordenadas*/
      points = turf.featureCollection(coordList);
      var hull = turf.concave(points, {maxEdge: 3})
      var polygon = L.polygon(hull.geometry.coordinates[0],{"color":colorSelection[random(0,7)]});
      /*Se agregan detalles del polígono*/
      var layer = polygon;
      feature = layer.feature = layer.feature || {};
      feature.type = feature.type || "Feature"; 
      var props = feature.properties = feature.properties || {};
      props.myId = valueInput;
      /*Se agreaga polígono a grupo*/
      polygon.addTo(group);
  };
  }else {
    group.eachLayer(function(layer){
      if (layer.feature.properties.myId === valueInput) {
        group.removeLayer(layer);
      }});
    pointsGroup.eachLayer(function(layer) {
      if (layer.feature.properties.myId === valueInput) {
        pointsGroup.removeLayer(layer);
      }
    })
  }
}
function uplFile() {
  document.getElementsByClassName("selectionSection")[0].style.display = 'block';
}

function sinRuta(valueInput) {
  var getInput = document.getElementById(valueInput);
  if (getInput.checked== true) {
    /*Lectura de documento cargado*/
    var file_to_read = document.getElementById("uploadFile").files[0];
    var fileread = new FileReader();
    fileread.readAsText(file_to_read);
    fileread.onload = function(e) {
      /*Se nombran variables locales*/
      var content = e.target.result;
      var intern = JSON.parse(content);
      var coordList = [];
      pointsTemp = L.featureGroup();
      /*Se recorre array para encontrar coincidencias*/
      for (let x=0; x < intern.features.length; x++){
        /*Reseteo de variables*/
        var coordMod = [];
        var coordActual = intern.features[x].geometry.coordinates;
        var nameActual = intern.features[x].properties.name;
        /*Condición de concordancia entre nombres*/
        if (nameValidation(nameActual) === false){
          /*Se agregan coordenadas a lista*/
          coordMod= turf.point([coordActual[1],coordActual[0]]);
          coordList.push(coordMod);
          /*Se crea marcador de lugar dentro de grupo temporal*/
          L.marker([coordActual[1],coordActual[0]], {title: nameActual}).addTo(pointsTemp)
        } else {
            continue
        }
      };
      /*Se agregan detalles de grupo de marcadores*/
      feature = pointsTemp.feature = pointsTemp.feature || {};
      feature.type = feature.type || "Feature"; 
      var props = feature.properties = feature.properties || {};
      props.myId = valueInput;
      /*Se agrega grupo de puntos temporal a grupo general de puntos*/
      pointsTemp.addTo(pointsGroup);
  };
  }else {
    pointsGroup.eachLayer(function(layer) {
      if (layer.feature.properties.myId === valueInput) {
        pointsGroup.removeLayer(layer);
      }
    })
  }
}
// Final
