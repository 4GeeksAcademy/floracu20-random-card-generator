/* eslint-disable */
import "bootstrap";
import "./style.css";
import "./assets/img/rigo-baby.jpg";
import "./assets/img/4geeks.ico";
window.onload = function() {
  //write your code here
  function generadorCartas() {
    let palos = ["♦", "♥", "♠", "♣"];
    let valores = [
      "A",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "J",
      "Q",
      "K"
    ];

    function palo(elem) {
      if (elem === "♥") return "heart";
      if (elem === "♦") return "diamond";
      if (elem === "♠") return "spades";
      if (elem === "♣") return "clubs";
    }

    let randomElement = array => {
      let numArray = Math.floor(Math.random() * array.length);
      return array[numArray];
    };
    let randomPalos = randomElement(palos);
    let randomValores = randomElement(valores);

    let colorPalo = palo(randomPalos);

    document.querySelector(
      "#card"
    ).innerHTML = `<div id="top-card" class="${colorPalo}">
      <p>${randomPalos}</p>
      </div>
      <div id="number-card">
      <p>${randomValores}</p>
      </div>
      <div id="foot-card" class="${colorPalo}">
      <p>${randomPalos}</p>
      </div>`;

    /* ******************************************** */
    /* Reto extra (altura y ancho de la carta) */
    const ASPECTO = 1.4; //aspecto height-width coincide con el de num-palo
    const aspectoHeightNum = 0.49;

    //(!) El tamaño de la card está en pixeles y el del texto en %.

    //Función que dada una altura, devuelve el ancho, respetando el aspecto.
    function ajustarWidth(height) {
      return height / ASPECTO;
    }
    //Función que dado un ancho, devuelve la altura, respetando el aspecto.
    function ajustarHeight(width) {
      return width * ASPECTO;
    }

    //Función que dada una altura, devuelve el tamaño que debería tener el número.
    function ajustarNum(height) {
      return height / aspectoHeightNum;
    }

    //Función que dado el tamaño del número, devuelve el tamaño del palo.
    function ajustarPalo(numSize) {
      return numSize / ASPECTO;
    }

    let carta = document.getElementById("card");

    // Función para cambiar el tamaño de la carta según los inputs
    function modificarCarta() {
      const heightInput = document.getElementById("height");
      const widthInput = document.getElementById("width");

      if (heightInput.value) {
        //si (hay valor en el input de la altura)
        carta.style.height = `${heightInput.value}px`;
        carta.style.width = `${ajustarWidth(heightInput.value)}px`;
        widthInput.disabled = true; //se deshabilita el otro input
      } else {
        widthInput.disabled = false; //se habilita el ancho si no hay altura
      }

      if (widthInput.value) {
        //si (hay valor en el input del ancho)
        carta.style.width = `${widthInput.value}px`;
        carta.style.height = `${ajustarHeight(widthInput.value)}px`;
        heightInput.disabled = true;
      } else {
        heightInput.disabled = false;
      }

      let topPalo = document.getElementById("top-card");
      let bottomPalo = document.getElementById("foot-card");
      let numCard = document.getElementById("number-card");

      numCard.style.fontSize = `${ajustarNum(parseFloat(carta.style.height))}%`;
      topPalo.style.fontSize = `${ajustarPalo(
        parseFloat(numCard.style.fontSize)
      )}%`;
      bottomPalo.style.fontSize = topPalo.style.fontSize;
    }

    //Cada vez que se escriba un valor en el input, se llama a la función
    document.getElementById("height").addEventListener("input", modificarCarta);
    document.getElementById("width").addEventListener("input", modificarCarta);

    //Estos son los valores por defecto cuando se carga la página
    carta.style.height = "420px";
    carta.style.width = "300px";

    /* ********************************************** */
  }

  /* Extras: botón de generar carta y temporizador para generar carta */
  document
    .getElementById("nuevaCarta")
    .addEventListener("click", generadorCartas);
  generadorCartas();
  setInterval(generadorCartas, 10000); //10 segundos
};
