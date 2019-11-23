import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';

import './Radar.css';

const apiKey = process.env.REACT_APP_API_KEY;
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;

class Radar extends Component {

  drawMap = () => {
  	let mapMode = this.props.day !== true ? 'night' : 'day';
		let lon = this.props.coord.lon;
	  let lat = this.props.coord.lat;

	  let map = new mapboxgl.Map({
      container: this.container,
      style: `mapbox://styles/mapbox/navigation-guidance-${mapMode}-v4`,
	    zoom: 6,
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

  componentDidMount() { 
  	this.drawMap();
  }

  componentDidUpdate() {
  	this.drawMap();
  }

  render() {

    return (
	      <div className="map radar-div rounded" ref={(x) => { this.container = x }}>
	      </div>	   	
    )
  }
}

export default Radar;
