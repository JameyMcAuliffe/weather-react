import Geocode from "react-geocode";

Geocode.setApiKey('AIzaSyAgiCgzbfrwYUIBdTh4gnE8Lrie5tFuT8E');

export const getCoordinates = (input) => {
	Geocode.fromAddress(input).then(coord => {
		const { lat, lng } = coord.results[0].geometry.location;
    console.log(lat, lng);
    return {lat, lng};
	});
}
