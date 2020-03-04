import React from 'react';

import Radar from '../../Radar/Radar';
import '../DashboardItem/DashboardItem.css';
import { center } from '../../Helper/Helper';

import './DefaultDashboard.css';

const DefaultDashboard = () => {

	return (
		<div className="default-dashboard-div">
			<Radar day={true} coord={center} zoom="2"/>
		</div>
	);
}

export default DefaultDashboard;

/*<div className="details-div rounded">
				{renderedDetails.length >= 7 ? 
					renderedDetails : <Loading message="Fetching weather..."/>}
			</div>*/

	/*let renderedDetails = cityDetails.map((city, i) => {
		let iconUrl = `http://openweathermap.org/img/wn/${city.icon}.png`;
		return (
			<div key={i} className="row justify-content-center align-items-center">
				<h4 className="text-white font-weight-bold">{city.name} - {city.temp}°</h4>
				<Icon id={city.icon} className="icon-default"/>
			</div>
		)
	})*/

	/*	useEffect(() => {

		let citiesArray = [];
		cities.map(city => {
			let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lng}&units=imperial&appid=${apiKey}`;
			return axios.get(apiUrl)
				.then(({data}) => {
					let temp = data.main.temp.toFixed(0);
					let name = data.name;
					let icon = data.weather[0].icon;
					console.log(icon);
					citiesArray.push({temp, name, icon});
				})
				.then(() => {
					setCityDetails([...citiesArray]);
				})
		})
	}, []); */
