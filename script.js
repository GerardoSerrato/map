function cambiarColor(valueInput) {
  var getInput = document.getElementById(valueInput);
  console.log("se oprimió botón");
  console.log(getInput.value);
  if (getInput.checked== true) {
    console.log("Esta encendido");
  }else {
    console.log("No está encendido");
  }
}