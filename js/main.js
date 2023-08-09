//Codigo para el efecto parallax

window.addEventListener('scroll', function() {
    let scrolled = window.scrollY;
    document.querySelector('#portada').style.backgroundPositionY = scrolled * 0.4 + 'px';
    document.querySelector('#panoramico').style.backgroundPositionY = scrolled * 0.4 + 'px';
  });

//Parrafo noticias

  const paragraphs = document.querySelectorAll('#parrano'); // Selecciona todos los párrafos con la clase "parrano"
  const maxLength = 80; // Define el límite máximo de caracteres

  paragraphs.forEach(paragraph => {
    if (paragraph.textContent.length > maxLength) {
      paragraph.textContent = paragraph.textContent.slice(0, maxLength) + '... Leer más';
    }
  });

//Efecto de la portada de maquina de escribir

const text = "Dominus Pax Nostra";
const typedTextElement = document.getElementById("typed-text");
//const blinkingCursor = document.getElementById("blinking-cursor");

let charIndex = 0;

function typeText() {
  if (charIndex < text.length) {
    typedTextElement.textContent += text.charAt(charIndex);
    charIndex++;
    setTimeout(typeText, 100); // Adjust typing speed here
  } else {
    blinkingCursor.style.display = "none";
    setInterval(() => {
      blinkingCursor.style.display = (blinkingCursor.style.display === "none") ? "inline" : "none";
    }, 500); // Blinking speed
  }
}

typeText();



// Texto que quieres mostrar en la animación de máquina de escribir
// const textoAnimacion = "Dominus Pax Nostra";
// let index = 0;
// const velocidadEscritura = 50; // Velocidad de escritura (en milisegundos)
// const pausaFinal = 1000; // Pausa final después de completar la animación (en milisegundos)

// function escribirTexto() {
//     if (index < textoAnimacion.length) {
//         document.getElementById("frase").textContent += textoAnimacion.charAt(index);
//         index++;
//         setTimeout(escribirTexto, velocidadEscritura);
//     } else {
//         setTimeout(borrarTexto, pausaFinal);
//     }
// }

// function borrarTexto() {
//     if (index >= 0) {
//         let textoActual = document.getElementById("frase").textContent;
//         textoActual = textoActual.slice(0, -1);
//         document.getElementById("frase").textContent = textoActual;
//         index--;
//         setTimeout(borrarTexto, velocidadEscritura / 2);
//     } else {
//         index = 0;
//         setTimeout(escribirTexto, velocidadEscritura);
//     }
// }

// escribirTexto();




//Contador

//       // Función para animar un contador hacia un número fijo
//       function animateCounter(elementId, targetNumber, duration) {
//         const startNumber = parseInt(document.getElementById(elementId).innerText);
//         const startTime = Date.now();
    
//         function updateCounter() {
//             const currentTime = Date.now();
//             const timeElapsed = currentTime - startTime;
//             const progress = timeElapsed / duration;
    
//             if (progress < 1) {
//                 const currentNumber = Math.floor(startNumber + (targetNumber - startNumber) * progress);
//                 document.getElementById(elementId).innerText = currentNumber;
//                 requestAnimationFrame(updateCounter);
//             } else {
//                 document.getElementById(elementId).innerText = targetNumber;
//             }
//         }
    
//         updateCounter();
//     }

// var timer = 3500;

// // Llamamos a la función para cada contador con los valores deseados
// animateCounter('contador1', 65, timer); // Contador1: 0 -> 1000 en 2 segundos
// animateCounter('contador2', 4, timer);  // Contador2: 0 -> 500 en 1.5 segundos
// animateCounter('contador3', 118, timer); // Contador3: 0 -> 3000 en 3 segundos
// animateCounter('contador4', 1, timer);  // Contador4: 0 -> 750 en 2.5 segundos

const contadorElements = document.querySelectorAll('#contador1');
const targetNumbers = [65, 4, 118, 1]; // Números objetivos para los contadores
const animationDuration = 2500; // Duración de la animación en milisegundos

// Función para animar un contador hacia un número fijo
function animateCounter(element, target, duration) {
    let start = null;
    const step = timestamp => {
        if (!start) start = timestamp;
        const progress = Math.min((timestamp - start) / duration, 1);
        const currentNumber = Math.floor(progress * target);
        element.innerText = currentNumber;
        if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
}

// Crear un observador de intersección para cada contador
const observers = [];
contadorElements.forEach((element, index) => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Reiniciar la animación del contador
                element.innerText = '0';
                animateCounter(element, targetNumbers[index], animationDuration);
                // Dejar de observar el elemento para evitar reinicios múltiples
                observers[index].unobserve(entry.target);
            }
        });
    });
    observers.push(observer);
    observer.observe(element);
});