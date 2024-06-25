function cargarMapa() {
    var punto = new google.maps.LatLng(42.529220338983, 1.53365432098762);
	
    var opciones = {
        zoom: 6,
        center: punto,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    
    var mapa = new google.maps.Map(
        document.getElementById("mapa"),
        opciones
    );

    var marca = new google.maps.Marker({
        position: punto,
        map: mapa,
        title: "Travel Snaps"
    });
}