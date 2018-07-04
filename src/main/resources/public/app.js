	var map = L.map('mapid').setView([49.0139, 31.2858], 6);

	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
			'<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);

    loadAll();

	var popup = L.popup();

    var currentMarker = {};

	function onMapClick(e) {
        lat = e.latlng.lat;
        lng = e.latlng.lng;

        if (currentMarker != undefined) {
              map.removeLayer(currentMarker);
        };

        currentMarker = L.marker([lat, lng]).addTo(map);

        document.getElementsByClassName("jsCurLat")[0].innerHTML = lat.toFixed(6);
        document.getElementsByClassName("jsCurLng")[0].innerHTML = lng.toFixed(6);
	}

	map.on('click', onMapClick);

	function loadAll() {

        var url = '/places';

        fetch(url)
        .then(function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                return;
            }

            response.json().then(function(data) {
              data.forEach(function(element) {
                    L.marker([element.latitude, element.longitude]).addTo(map)
              		    .bindPopup("<b>" + element.title + "</b><br />" + element.description).openPopup();
              });
            });
        })
        .catch(error => console.error('Error:', error))
        .then(response => console.log('Success:', response));
	}

	function onSave(e) {
	    var url = '/places';
        var data = {
                        title : document.getElementById("title").value,
                        latitude : document.getElementsByClassName("jsCurLat")[0].innerHTML,
                        longitude : document.getElementsByClassName("jsCurLng")[0].innerHTML,
                        description : document.getElementById("description").value
                    }

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers:{
              'Content-Type': 'application/json'
            }
        }).then(res => res)
        .catch(error => {
            alert("Something went wrong!");
        })
        .then(response => {
            currentMarker.bindPopup("<b>" + data.title + "</b><br />" + data.description).openPopup();
            currentMarker = {};

            document.getElementById("title").value = "";
            document.getElementsByClassName("jsCurLat")[0].innerHTML = "";
            document.getElementsByClassName("jsCurLng")[0].innerHTML = "";
            document.getElementById("description").value = "";
        });
	}

	document.getElementsByClassName("jsSave")[0].addEventListener('click', onSave);

	function onClear(e) {
	    map.removeLayer(currentMarker);
	    currentMarker = {};

	    document.getElementById("title").value = "";
        document.getElementsByClassName("jsCurLat")[0].innerHTML = "";
        document.getElementsByClassName("jsCurLng")[0].innerHTML = "";
        document.getElementById("description").value = "";
	}

	document.getElementsByClassName("jsClear")[0].addEventListener('click', onClear);