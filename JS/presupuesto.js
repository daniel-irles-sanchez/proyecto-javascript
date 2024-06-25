let nombreActual = "";
let apellidosActual = "";
let telefonoActual;
let emailActual;

let servicioMarcado = false;
let fechaMarcada = false;


var precioOpcionServicio = 0;
var precioExtras = 0;




function recibirInformacion(elemento) {
    switch (elemento.id) {
        case "nombre":

            nombreActual = elemento.value;
            document.getElementById("nombre-apellidos-info").textContent = nombreActual + " " + apellidosActual;
            break;

        case "apellidos":

            apellidosActual = elemento.value;
            document.getElementById("nombre-apellidos-info").textContent = nombreActual + " " + apellidosActual;
            break;

        case "telefono":

            telefonoActual = elemento.value;
            document.getElementById("telefono-info").textContent = telefonoActual;
            break;

        case "email":

            emailActual = elemento.value;
            document.getElementById("email-info").textContent = emailActual;
            break;
    }
}

function infoRadio() {
    var seleccionado = document.querySelector(".selector-radio:checked").value
    switch (seleccionado) {
        case "1":

            document.getElementById("servicio").textContent = "Fotos para tu viaje: 180€";
            precioOpcionServicio = 180;
            servicioMarcado = true;
            actualizarTotal();
            break;
        case "2":

            document.getElementById("servicio").textContent = "Fotos en uno de nuestros viajes: 120€";
            precioOpcionServicio = 120;
            servicioMarcado = true;
            actualizarTotal();
            break;
        case "3":

            document.getElementById("servicio").textContent = "Sesión de fotos: 80€";
            precioOpcionServicio = 80;
            servicioMarcado = true;
            actualizarTotal();
            break;
    }
}

function infoExtras() {
    var extras = document.getElementsByClassName("extra");
    precioExtras = 0;

    while (document.getElementById("extras").firstChild) {
        document.getElementById("extras").removeChild(document.getElementById("extras").firstChild)
    }
    document.getElementById("extras").appendChild(document.createTextNode("Extras"));

    for (var i = 0; i < extras.length; i++) {

        if (extras[i].checked) {
            switch (extras[i].id) {
                case "extra-1":
                    precioExtras = precioExtras + 38;
                    var elementoExtra = document.createElement("div");
                    elementoExtra.setAttribute("class", "info-js");
                    var textoExtra = document.createTextNode("Impresión de fotos: 38€");
                    elementoExtra.appendChild(textoExtra)

                    document.getElementById("extras").appendChild(elementoExtra)
                    break;

                case "extra-2":
                    precioExtras = precioExtras + 80;
                    var elementoExtra = document.createElement("div");
                    elementoExtra.setAttribute("class", "info-js");
                    var textoExtra = document.createTextNode("Grandes distancias: 80€");
                    elementoExtra.appendChild(textoExtra)

                    document.getElementById("extras").appendChild(elementoExtra)
                    break;

                case "extra-3":
                    precioExtras = precioExtras + 56;
                    var elementoExtra = document.createElement("div");
                    elementoExtra.setAttribute("class", "info-js");
                    var textoExtra = document.createTextNode("Libro de fotos: 56€");
                    elementoExtra.appendChild(textoExtra)

                    document.getElementById("extras").appendChild(elementoExtra)
                    break;

                case "extra-4":
                    precioExtras = precioExtras + 115;
                    var elementoExtra = document.createElement("div");
                    elementoExtra.setAttribute("class", "info-js");
                    var textoExtra = document.createTextNode("Fotografía con dron: 115€");
                    elementoExtra.appendChild(textoExtra)

                    document.getElementById("extras").appendChild(elementoExtra)
                    break;

            }
        }
    }

    actualizarTotal();
}

function actualizarTotal() {

    document.getElementById("precio-total").textContent = "Total: " + (precioOpcionServicio + precioExtras) + "€";
}

function comprobacionFecha(campo) {
    var dia;
    var mes;
    var anyo;


    switch (campo.id) {
        case "dia":

            if (campo.value > 31) {
                document.getElementById("dia").value = "";
            }
            if (campo.value.length >= 2) {
                document.getElementById("mes").focus();
            }
            break;

        case "mes":
            if (campo.value > 12) {
                document.getElementById("mes").value = "";
            }
            if (campo.value.length >= 2) {
                document.getElementById("anyo").focus();
            }

            break;
        case "anyo":

            if (campo.value.length >= 4) {
                document.getElementById("anyo").blur();
                anyo = document.getElementById("anyo").value;
                mes = document.getElementById("mes").value;
                dia = document.getElementById("dia").value;

                document.getElementById("fecha-mostrar").appendChild(document.createTextNode(dia + " / " + mes + " / " + anyo))
                fechaMarcada = true;
            }
            break;
    }
    
}


function comprobarCondicionesAceptadas(casillaAceptar) {
    if (casillaAceptar.checked) {
        $("#boton-contratar").fadeIn(90);
    } else {
        $("#boton-contratar").fadeOut(80);
    }
}
function contratar() {

    var nombre = (document.getElementById("nombre").value != "") ? true : false;
    var apellidos = (document.getElementById("apellidos").value != "") ? true : false;
    var telefono = (document.getElementById("telefono").value != "") ? true : false;
    var email = (document.getElementById("email").value != "") ? true : false;
    


    if (nombre && apellidos && telefono && email && servicioMarcado && fechaMarcada) {
        window.location = "/HTML/paga.html"
    } else {
        alert("Debes rellenar todos los campos para enviar el formulario.")
    }

    
}