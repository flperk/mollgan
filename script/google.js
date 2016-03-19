function initialize(){
	var paris = new google.maps.LatLng(48.85661400000001, 2.3522219000000177);
	var myLatLng = new google.maps.LatLng(48.859054,2.347448);
	var map = new google.maps.Map(document.getElementById("map"),{
		center: myLatLng,
		zoom: 18,
		disableDefaultUI: true,
		scrollwheel: false
	});

	 // Specify location, radius and place types for your Places API search.
	var request = {
		location: paris,
		radius: '500',
		types:['café']
	};

	var yourPositionMarker = new google.maps.Marker({
    	position: myLatLng,
    	map: map,
  	});
 

	// Create the PlaceService and send the request.
  	// Handle the callback with an anonymous function.
 	
 	var service = new google.maps.places.PlacesService(map);
 	var infowindow = new google.maps.InfoWindow();
  	// service.nearbySearch(request, function(result,status){
  	// 	if(status == google.maps.places.PlacesServiceStatus.OK){
  	// 		console.log('place')
  	// 		for (var i = 0; i < result.length; i++) {
  	// 			var place = result[i];
  				
  	// 			// If the request succeeds, draw the place location on
   //      		// the map as a marker, and register an event to handle a
   //     			// click on the marker.

   //     			var marker = new google.maps.Marker({
   //     				map: map,
   //     				position: place.geometry.location
   //     			});
  	// 		}
  	// 	}
  	// });
  	google.maps.event.addListener(yourPositionMarker, 'click', function() {
    infowindow.setContent('Your current postion');
       infowindow.open(map, this);
    });

  	    service.getDetails({
          placeId: 'ChIJteaq8B5u5kcRCMBrKiKFA0U'
        }, function(place, status) {
          if (status == google.maps.places.PlacesServiceStatus.OK) {
            var marker = new google.maps.Marker({
              map: map,
              position: place.geometry.location
            });
            google.maps.event.addListener(marker, 'click', function() {
              infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                place.formatted_address + '</div>');
              infowindow.open(map, this);
            });
          }
        });

}
function placeDetailsByPlaceId(service, map, infowindow) {
  // Create and send the request to obtain details for a specific place,
  // using its Place ID.
  var request = {
    placeId: document.getElementById('place-id').value
  };

  service.getDetails(request, function (place, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      // If the request succeeds, draw the place location on the map
      // as a marker, and register an event to handle a click on the marker.
      var marker = new google.maps.Marker({
        map: map,
        position: place.geometry.location
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
          'Place ID: ' + place.place_id + '<br>' +
          place.formatted_address + '</div>');
        infowindow.open(map, this);
      });

      map.panTo(place.geometry.location);
    }
  });
}

// Run the initialize function when the window has finished loading.
google.maps.event.addDomListener(window, 'load', initialize);