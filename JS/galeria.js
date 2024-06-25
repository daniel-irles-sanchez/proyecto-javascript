var filasGaleria = document.querySelectorAll('.fila-galeria-i');

filasGaleria.forEach(function(row) {
    var maxScrollLeft = row.scrollWidth - row.clientWidth; // Calcula el máximo scroll horizontal posible
    row.scrollLeft = maxScrollLeft - 1;
});



document.addEventListener('scroll', function() {
    var verticalScroll = window.pageYOffset;  // Captura el desplazamiento vertical
    var filasGaleria = document.querySelectorAll('.fila-galeria');

    filasGaleria.forEach(function(row) {
        row.scrollLeft = verticalScroll;  // Asigna el desplazamiento vertical al horizontal de cada fila
    });
});

document.addEventListener('scroll', function() {
    var verticalScroll = window.pageYOffset;
    var filasGaleria = document.querySelectorAll('.fila-galeria-i');

    filasGaleria.forEach(function(row) {
        var maxScrollLeft = row.scrollWidth - row.clientWidth; // Calcula el máximo scroll horizontal posible
        row.scrollLeft = maxScrollLeft - verticalScroll;
    });
});
