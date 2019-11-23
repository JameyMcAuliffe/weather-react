import Geocode from "react-geocode";

Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);

export const getCoordinates = (input) => {
	return Geocode.fromAddress(input).then(coord => {
		const { lat, lng } = coord.results[0].geometry.location;
    return {lat, lng};
	});
}
