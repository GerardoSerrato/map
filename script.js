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