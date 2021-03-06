/**
 * Created by bepa on 24.10.16.
 */

var directionsDisplay;
var directionsService;
var autocompleteOrigin, autocompleteDestination;
var map;
var markers = [];
// var points = [];
var latlngbounds;

function initMap(el_id) {
    var kyiv = new google.maps.LatLng(50.450100000000035,30.523400000000045);
    var mapOptions = {
        zoom:10,
        center: kyiv
    };
    map = new google.maps.Map(el_id, mapOptions);
    // map = new google.maps.Map(document.getElementById('map'), mapOptions);
    // map.fitBounds(new google.maps.LatLngBounds(
    //     new google.maps.LatLng(50.587295, 30.228517),
    //     new google.maps.LatLng(50.245800, 30.886731)));

    var trafficLayer = new google.maps.TrafficLayer();
    trafficLayer.setMap(map);

    directionsService = new google.maps.DirectionsService();
    directionsDisplay = new google.maps.DirectionsRenderer();
    directionsDisplay.setMap(map);

    latlngbounds = new google.maps.LatLngBounds();

    var input = document.getElementById('origin-input');
    var destination = document.getElementById('destination-input');

    autocompleteOrigin = NewAutocompleteField(input, 0);
    autocompleteDestination = NewAutocompleteField(destination, 1);
    RegAutocomplete();

    google.maps.event.addListener(map, "dblclick", function (event) {
        SetMarker(event);
    });

    console.log("Init map: COMPLETE");
}

function SetMarker(event) {
    var lat = event.latLng.lat();
    var lng = event.latLng.lng();
    NewMarker(lat, lng);
}

function calcRoute() {
    var response = {};
    var res = {};

    markers.forEach(function (m) {
        m.setVisible(false);
    });

    var start = autocompleteOrigin.getPlace().geometry.location;
    var end = autocompleteDestination.getPlace().geometry.location;

    console.log(start);
    console.log(end);

    var request = {
        origin:start,
        destination:end,
        // key: 'AIzaSyCaDbK3Euwvlvh39XWABpxHW_sgWsxjjMc',
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
        drivingOptions: {
            departureTime: new Date(Date.now())
            // trafficModel: "optimistic"
        }
    };
    directionsService.route(request, function(result, status) {
        // console.log(result);
        if (status == google.maps.DirectionsStatus.OK) {

            res.start = [result.routes[0].legs[0].start_location.lat(),result.routes[0].legs[0].start_location.lng()];
            res.end = [result.routes[0].legs[0].end_location.lat(),result.routes[0].legs[0].end_location.lng()];
            res.polyline = result.routes[0].overview_polyline;

            directionsDisplay.setDirections(result);
        }
    });
    response.user = userName;
    response.result = res;
    return response;
}

function NewAutocompleteField(input, marker) {
    var autoField = new google.maps.places.Autocomplete(input);
    autoField.bindTo('bounds', map);

    markers.push(new google.maps.Marker({
        map: map,
        anchorPoint: new google.maps.Point(0, -29)
    }));

    autoField.addListener('place_changed', function() {
        markers[marker].setVisible(false);
        var place = autoField.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        // If the place has a geometry, then present it on a map.
        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          // map.setZoom(17);  // Why 17? Because it looks good.
        }

        markers[marker].setIcon(/** @type {google.maps.Icon} */({
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(35, 35)
        }));

        markers[marker].setPosition(place.geometry.location);
        markers[marker].setVisible(true);

        // markers.push(marker);
    });
    return autoField;
}

function NewMarker(lat, lng) {
    var marker = new google.maps.Marker({
        map: map,
        position: {lat: lat, lng: lng}
    });

    markers.push(marker);
    latlngbounds.extend(marker.position);

    map.setCenter( latlngbounds.getCenter(), map.fitBounds(latlngbounds));

    return marker;
}

function RegAutocomplete() {
    var input = document.getElementById('reg-city');
    var autoField = new google.maps.places.Autocomplete(input);

    autoField.addListener('place_changed', function () {
        var place = autoField.getPlace();
        if (!place.geometry) {
            window.alert("Autocomplete's returned place contains no geometry");
            return;
        }

        var attrib = document.getElementById('reg-city-attrib');
        // attrib.value = place.vicinity + ";" + place.geometry.location.lat() + ";" + place.geometry.location.lng();
        attrib.value = place.geometry.location.lat() + ";" + place.geometry.location.lng();
    });
}

function showRoute(u_start, u_end) {
    markers.forEach(function (m) {
        m.setVisible(false);
    });

    var start = new google.maps.LatLng(u_start[0], u_start[1]);
    var end = new google.maps.LatLng(u_end[0], u_end[1]);

    var request = {
        origin:start,
        destination:end,
        // key: 'AIzaSyCaDbK3Euwvlvh39XWABpxHW_sgWsxjjMc',
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: false,
        drivingOptions: {
            departureTime: new Date(Date.now())
            // trafficModel: "optimistic"
        }
    };
    directionsService.route(request, function(result, status) {
        // console.log(result);
        if (status == google.maps.DirectionsStatus.OK) {
             directionsDisplay.setDirections(result);
        }
    });
}

function getDurations(routes) {
    var counter = 0;

    return new Promise(function(resolve, reject) {
        routes.forEach((item) => {
            var start = new google.maps.LatLng(item.start[0], item.start[1]);
            var end = new google.maps.LatLng(item.end[0], item.end[1]);
            item.date = new Date(Date.now());

            var request = {
                origin:start,
                destination:end,
                // key: 'AIzaSyCaDbK3Euwvlvh39XWABpxHW_sgWsxjjMc',
                travelMode: google.maps.TravelMode.DRIVING,
                provideRouteAlternatives: false,
                drivingOptions: {
                    departureTime: item.date
                    // trafficModel: "optimistic"
                }
            };

            directionsService.route(request, function(result, status) {

                if (status == google.maps.DirectionsStatus.OK) {
                    counter++;

                    item.dur = result.routes[0].legs[0].duration_in_traffic.value;
                    if(counter === routes.length) resolve(routes);
                }
            });

        });
    });
}