var cardDestinosCreadas = 0;
var elementoClonado = false;
var ultimoClonCard;
const numPxEspaciado = 50;

function clickCard(card) {
    // Añadir overlay primero
    addOverlay();

    // Resto del código para clonar y estilizar la tarjeta...
    var clonedCard = card.cloneNode(true);
    clonedCard.removeAttribute("onclick")
    clonedCard.removeAttribute("class")
    clonedCard.setAttribute("class", "card-destinos-recomendados-clon")

    clonedCard.id = "clonedCard"
    clonedCard.style.position = 'fixed';
    clonedCard.style.top = '50%';
    clonedCard.style.left = '50%';
    clonedCard.style.transform = 'translate(-50%, -50%)';
    clonedCard.style.zIndex = '1000';
    clonedCard.style.boxShadow = '0 4px 8px rgba(0,0,0,0.5)';
    clonedCard.style.width = "650px"
    clonedCard.style.height = "450px"


    document.body.appendChild(clonedCard);

    var descripcion = clonedCard.querySelector('.descripcion');
    if (descripcion) {
        descripcion.style.display = 'block';
    }


}

function addOverlay() {
    // Crear el elemento overlay
    var overlay = document.createElement('div');
    overlay.setAttribute("onclick", "removeOverlay()")
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.7)'; // Color negro con opacidad
    overlay.style.zIndex = '999'; // Menor que el z-index de la tarjeta clonada
    overlay.id = 'overlay'; // ID para referenciar o remover más tarde

    // Añadir el overlay al cuerpo del documento
    document.body.appendChild(overlay);
}

function removeOverlay() {
    document.body.removeChild(document.getElementById("clonedCard"))
    var overlay = document.getElementById('overlay');
    if (overlay) {
        overlay.parentNode.removeChild(overlay);
    }
}




function crearCardDestino(rutaImagen, nombre, descripcion) {

    cardDestinosCreadas = cardDestinosCreadas + 1;


    var divCard = document.createElement("div");
    divCard.setAttribute("class", "card-destinos-recomendados");
    divCard.setAttribute("style", "background-image: url('" + rutaImagen + "'); display:none;");
    divCard.setAttribute("onmouseover", "overCard(this)");
    divCard.setAttribute("onmouseout", "outCard(this)");
    divCard.setAttribute("onclick", "clickCard(this)");
    divCard.setAttribute("n-card", cardDestinosCreadas);




    var divNombre = document.createElement("div");
    divNombre.setAttribute("class", "nombre");

    divNombre.appendChild(document.createTextNode(nombre));

    var divDescripcion = document.createElement("div");
    divDescripcion.setAttribute("class", "descripcion");
    divDescripcion.appendChild(document.createTextNode(descripcion));

    divCard.appendChild(divNombre);
    divCard.appendChild(divDescripcion);

    var contenedor = document.getElementById("destinos-recomendados");
    if (contenedor) {
        contenedor.appendChild(divCard);
    } else {
        console.error("error");
    }
};


function cargarDestinos() {
    $.ajax({
        url: "/DATA/destinos.json",
        type: "GET",
        dataType: "json",
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                crearCardDestino(data[i].imagen, data[i].titulo, data[i].descripcion)
            }
        }
    })
}




document.addEventListener("DOMContentLoaded", (event) =>{
    const elementoObservado = document.querySelector(".s1");
    const observador = new IntersectionObserver((entries, observador) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                $(".texto-a-aparecer-1").fadeIn(200);

            }
        });
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });
    observador.observe(elementoObservado);



    const elementoObservado2 = document.querySelector(".fotos-destinos");
    const observador2 = new IntersectionObserver((entries, observador2) => {
        entries.forEach(entry => {

            if (entry.isIntersecting) {
                $(".foto-destino").slideDown(200);
                $(".foto-destino-2").slideDown(300);
                $(".texto-a-aparecer-2").fadeIn(500);

            } else {
                $(".foto-destino").hide();
                $(".foto-destino-2").hide();
                $(".texto-a-aparecer-2").hide();
            }
        });
    }, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    });
    observador2.observe(elementoObservado2);

    const elementoObservado3 = document.getElementById("s3");
    const observador3 = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => { // Itera sobre cada entrada
            if (entry.isIntersecting) { // Verifica si el elemento está intersectando
                const cards = $(".card-destinos-recomendados");

                // Anima cada tarjeta individualmente con un retraso
                cards.each(function(index) {
                    // Introduce un delay basado en el índice del elemento
                    $(this).delay(index * 100).fadeIn(200);
                });
            } else {
                $(".card-destinos-recomendados").hide();
            }
        });
    }, {
        root: null, // null significa que el viewport será el contenedor de referencia para la intersección
        rootMargin: "0px", // No hay margen adicional alrededor del root
        threshold: 0.1 // Al menos el 10% del elemento debe estar visible para considerarse intersectado
    });
    
    observador3.observe(elementoObservado3); // Inicia la observación del elemento especificado
    

});




function startAnimation() {
    const container = document.getElementById('scrollContainer');
    const containerHeight = container.offsetHeight;
    let items = document.querySelectorAll('.scrollItem');
    let itemHeight = 90; // Asegúrate de que esto coincida con la altura real de tus elementos
  
    // Inicia los elementos en la parte inferior del contenedor
    items.forEach((item, index) => {
      item.style.top = `${containerHeight + index * itemHeight}px`;
    });
  
    let counter = 0;
    function animateItems() {
        counter++;
        if (counter % 8 === 0) { // 8 Actualiza la posición de los elementos cada dos cuadros
            items.forEach(item => {
                item.style.top = `${parseInt(item.style.top) - 1}px`;
            });
        }
    
        if (parseInt(items[0].style.top) + itemHeight < 0) {
            let lastItem = items[items.length - 1];
            let lastItemTop = parseInt(lastItem.style.top);
            items[0].style.top = `${lastItemTop + itemHeight}px`;
            container.appendChild(items[0]);
            items = document.querySelectorAll('.scrollItem');
        }
    
        requestAnimationFrame(animateItems);
    }
  
    animateItems();
  }
  
  startAnimation();
  
  
  
  




