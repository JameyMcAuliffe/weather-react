	
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
		} else {
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
