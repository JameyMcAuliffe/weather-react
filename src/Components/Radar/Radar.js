import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import './Radar.css';

class Radar extends Component {


  componentDidMount() {

  	const apiKey = process.env.REACT_APP_API_KEY;
  	const lon = this.props.coord.lon;
  	const lat = this.props.coord.lat;

  	console.log(lon);
  	console.log(lat);
  	
  	let mapMode = this.props.day !== true ? 'night' : 'day';
  	
    mapboxgl.accessToken = 'pk.eyJ1IjoiamFtZXl1Z2EiLCJhIjoiY2sycGFma2hwMDI5ODNvczM2em9pZGlmeiJ9.slQp-T33wWQvLqIF_ju6rg';

    let map = new mapboxgl.Map({
      container: this.container,
      style: `mapbox://styles/mapbox/navigation-guidance-${mapMode}-v4`,
	    zoom: 7,
	    center: [lon, lat],
	    scrollZoom: false,
	    touchZoomRotate: false   
    });

    let nav = new mapboxgl.NavigationControl({showCompass: false});
		map.addControl(nav, 'top-left');

    map.on('load', () => {
    	map.addLayer({
		    "id": "simple-tiles",
		    "type": "raster",
		    "source": {
		      "type": "raster",
		      "tiles": [`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`],
		      "tileSize": 256
		    },
		    "minzoom": 0,
		    "maxzoom": 10
		  });
    })
    
  }

  render() {

    return (
	      <div className="map radar-div rounded" ref={(x) => { this.container = x }}>
	      </div>	   	
    )
  }
}

export default Radar;

// center: [-82.63, 35.71]

//  map.addSource("radar", {
	    // 	 type: "image",
	    // 	 url: `https://tile.openweathermap.org/map/precipitation_new/10/35.71/-82.63.png?appid=${apiKey}`,
	    // 	 coordinates: [
	    // 	 		[-82.63, 35.71]
	    // 	 ]
	     
	    //  });
	    //  map.addLayer({
		   //   	id: "radar-layer",
					// "type": "raster",
					// "source": "radar",
					// "paint": {
					// 	"raster-fade-duration": 0
					// }
	    //  })

    	// map.addLayer({
    	// 	"id": "simple-tiles",
		   //  "type": "raster",
		   //  "source": {
		   //    "type": "raster",
		   //    "tiles": [`https://tile.openweathermap.org/map/precipitation_new/10/35.71/-82.63.png?appid=${apiKey}`],
		   //    "tileSize": 256
		   //  },
		   //  "minzoom": 0,
		   //  "maxzoom": 22
    	// })


// style: {
//       	"version": 8,
//       	"sources": {
//       		"raster-tiles": {
//       			"type": "raster",
//       			"tiles": [`https://tile.openweathermap.org/map/precipitation_new/{z}/{x}/{y}.png?appid=${apiKey}`],
//       			"tileSize": 256,
//       			"attribution": 'OpenWeatherMap'
//       		}
//       	},
//       	"layers": [{
//       		"id": "simple-tiles",
// 					"type": "raster",
// 					"source": "raster-tiles",
// 					"minzoom": 0,
// 					"maxzoom": 22
//       	}]
//       },
//       center: [-82.63, 35.71],
//       zoom: 8

//const Radar = () => {

// 	MapboxGl.accessToken = 'pk.eyJ1IjoiamFtZXl1Z2EiLCJhIjoiY2sycGFma2hwMDI5ODNvczM2em9pZGlmeiJ9.slQp-T33wWQvLqIF_ju6rg';

// 	const container = useRef();

// 	let map = new MapboxGl.Map({
// 		container: container,
//     style: 'mapbox://styles/mapbox/navigation-guidance-day-v4',
//     zoom: 10,
//     center: [35.71, -82.63]
// 	});

// 	return(
// 		<div id="map" ref={container}>
			
// 		</div>
// 	);
// }
