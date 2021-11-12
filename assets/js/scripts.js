// Las palabras ["Palabra", "Pista"]
var palabras = [
  ["Portátil", "Es un dispositivo muy útil que se puede llevar a cualquier parte mientras tengas batería."],
  ["Ratón", "Puede ser un periférico para interactuar con el ordenador, o simplemente un pequeño animal escurridizo que es capaz de robarte el queso."],
  ["Apple", "Es una empresa tecnológica que fue fundada por un tal Steve Jobs."],
  ["Playstation", "Es el nombre que recibe la consola principal de la empresa Sony."],
  ["Piano", "Es un instrumento compuesto por 49 teclas o más que suena gracias a los martillos de piel golpeando cuerdas robustas de metal u otro material."],
  ["Windows", "Es un sistema operativo desarrollado por Microsoft."],
  ["Ubuntu", "Es un sistema operativo de software libre y código abierto."],
  ["Mcdonalds", "Es un restaurante de comida rápida, fundado el 15 de abril de 1955 en San Bernardino, California, Estados Unidos."],
  ["Nike", "Es una marca de zapatillas muy conocida."],
  ["Publicidad", "Se utiliza para vender algún producto, ya sea en la TV, radio, carteles, etc."],
  ["Coche", "Se utiliza para desplazarse de un punto a otro."],
  ["Enero", "Es uno de los 12 meses del año."],
  ["Netflix", "Es una aplicación web que permite visualizar contenido en streaming."],
  ["Cocacola", "Es una bebida que tiene su receta de forma distribuida por todo el mundo en 9 partes diferentes"],
  ["Pizza", "Masa redondeada con tomate y con suplementos como queso, bacon, etc."],
  ["Tesla", "Es una marca automovilística fundada por el Señor Elon Musk"],
  ["Instagram", "Es una aplicación muy utilizada para colgar fotografías en la nube."],
  ["Spotify", "Es una aplicación muy utilizada para escuchar música en streaming."],
  ["Seat", "Es una marca automovilística muy conocida y nacida en España."],
  ["DaftPunk", "Fueron dos robots que se dedicaban a hacer música electrónica y punk."],
  ["Xbox", "Es el nombre que recibe la consola principal de la empresa Microsoft."],
  ["Montserrat", "Es una montaña muy conocida que se encuentra en Baix Llobregat."],
  ["Sergio", "Es el nombre que tiene el desarrollador que ha hecho esté juego."]
];

var palabra = "";
var num_random;
var palabra_oculta = [];
var hueco = document.getElementById("palabra");
var cont = 6;
var buttons = document.getElementsByClassName('letra');
var btnInicio = document.getElementById("reset");



// Escoger palabra al azar
function generaPalabra() {
  num_random = (Math.random() * 23).toFixed(0);
  palabra = palabras[num_random][0].toUpperCase();
  console.log(palabra);
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {
  for (var i = 0; i < num; i++) {
    palabra_oculta[i] = "_";
  }
  hueco.innerHTML = palabra_oculta.join("");
}

//Generar abecedario
function generaABC(a, z) {
  document.getElementById("abcdario").innerHTML = "";
  var i = a.charCodeAt(0),
    j = z.charCodeAt(0);
  var letra = "";
  for (; i <= j; i++) {
    letra = String.fromCharCode(i).toUpperCase();
    document.getElementById("abcdario").innerHTML += "<button value='" + letra + "' onclick='intento(\"" + letra + "\")' class='letra' id='" + letra + "'>" + letra + "</button>";
    if (i == 110) {
      document.getElementById("abcdario").innerHTML += "<button value='Ñ' onclick='intento(\"Ñ\")' class='letra' id='" + letra + "'>Ñ</button>";
    }
  }
}

// Chequear intento
function intento(letra) {
  document.getElementById(letra).disabled = true;
  if (palabra.indexOf(letra) != -1) {
    for (var i = 0; i < palabra.length; i++) {
      if (palabra[i] == letra) palabra_oculta[i] = letra;
    }
    hueco.innerHTML = palabra_oculta.join("");
    document.getElementById("acierto").innerHTML = "GOOD JOB!";
    document.getElementById("acierto").className += "acierto verde";
  } else {
    cont--;
    document.getElementById("intentos").innerHTML = cont;
    document.getElementById("acierto").innerHTML = "TRY AGAIN :(";
    document.getElementById("acierto").className += "acierto rojo";
    document.getElementById("image" + cont).className += "fade-in";
  }
  compruebaFin();
  setTimeout(function () {
    document.getElementById("acierto").className = "";
  }, 800);
}

// Obtener pista
function pista() {
  document.getElementById("hueco-pista").innerHTML = palabras[num_random][1];
}

// Compruba si ha finalizado
function compruebaFin() {
  if (palabra_oculta.indexOf("_") == -1) {
    document.getElementById("msg-final").innerHTML = "GOOD JOB!";
    document.getElementById("msg-final").className += "zoom-in";
    document.getElementById("palabra").className += " encuadre";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Voler a empezar";
    btnInicio.onclick = function () {
      location.reload()
    };
  } else if (cont == 0) {
    document.getElementById("msg-final").className += "zoom-in";
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
    document.getElementById("reset").innerHTML = "Empezar";
    btnInicio.onclick = function () {
      location.reload()
    };
  }
}

// Restablecer juego
function inicio() {
  generaPalabra();
  pintarGuiones(palabra.length);
  generaABC("a", "z");
  cont = 6;
  document.getElementById("intentos").innerHTML = cont;
}

// Iniciar
window.onload = inicio();

