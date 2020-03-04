	
	export const convertDegreeToDirection = (deg) => {
		let directionsArray = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
		let index = parseInt((deg / 22.5) + .5);
		return directionsArray[index];
	}

	export const convertUnixToTime = (u, timezone) => {
		let timezoneDifference = timezone - (-18000);
		let date = new Date((u + timezoneDifference) * 1000);
		let hours = date.getHours();
		let minutes = ('0' + date.getMinutes()).slice(-2);
		
		if (hours < 12 && hours > 0) {
			return `${hours}:${minutes} a.m.`
		} else if (hours === 0) {
			return `12:${minutes} a.m.`
		} else if (hours === 12) {
			return (`12:${minutes} p.m.`)
		}
		else {
			return `${hours - 12}:${minutes} p.m.`
		}
	}

	export const dayCheck = (current, sunrise, sunset) => {
		if (current > sunrise && current < sunset) {
			return true;
		} else {
			return false;
		}
	}

	export const convertTemp = (k) => {
		return ((k - 273.15) * 9/5 + 32).toFixed(0);
	}

	export const getIdFirstDigit = (id) => {
		return parseInt(id / 100);
	}

	export const cities = [
	{
		lat: 41.8781136,
		lng: -87.6297982,
		city: "Chicago"
	},
	{
		lat: 25.7616798,
		lng: -80.1917902,
		city: "Miami"
	},
	{
		lat: 40.7127753,
		lng: -74.0059728,
		city: "New York City"
	},
	{
		lat: 33.7489954,
		lng: -84.3879824,
		city: "Atlanta"
	},
	{
		lat: 34.0522342,
		lng: -118.2436849,
		city: "Los Angeles"
	},
	{
		lat: 38.9071923,
		lng: -77.0368707,
		city: "Washington D.C."
	},
	{
		lat: 32.7766642,
		lng: -96.79698789999999,
		city: "Dallas"
	},
	{
		lat: 47.6062095,
		lng: -122.3320708,
		city: "Seattle"
	}
];

export const center = {
	lat: 44.6714,
	lon: -103.8521
}

export const defaultWeatherObj = {
	description: '- -',
	temperature: {
		current: '- -',
		high: '- -',
		low: '- -'
	},
	wind: {
		speed: ' - - ',
		direction: '- -'
	},
	location: '- -',
	humidity: '- -',
	time: {
		sunrise: '- -',
		sunset: '- -'
	}
}
