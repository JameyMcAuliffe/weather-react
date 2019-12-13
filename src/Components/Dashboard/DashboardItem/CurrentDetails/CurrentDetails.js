import React from 'react';

import Icon from '../Icon'
import '../DashboardItem.css';

const CurrentDetails = ({weatherObj}) => {

	const {location, temperature, description, wind, humidity, icon, time} = weatherObj;

	return (
		<div className="details-div rounded">
			<h1 className="text-white">{location}</h1>
			<h1 className="text-white">{temperature.current}° F</h1>
			<h3 className="text-white text-capitalize">{description}</h3>
			{icon ? <Icon id={icon}/> : null}
			<h4 className="text-white">Wind: {wind.direction} {wind.speed}mph</h4>
			<h4 className="text-white">Humidity: {humidity}%</h4>
			<p className="text-white">Last updated at {time.current}</p>
		</div>
	);
}

export default CurrentDetails;

// <Loading message={message}/>
