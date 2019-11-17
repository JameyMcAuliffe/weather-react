import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Radar from '../../Radar/Radar';
import Icon from './Icon';
import './DashboardItem.css';

const DashBoardItem = ({zip, getCondition}) => {	

	const defaultWeatherObj = {
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

	const [weatherObj, setWeatherObj] = useState(defaultWeatherObj);
	const [dataFetched, setDataFetched] = useState(false);

	const apiKey = process.env.REACT_APP_API_KEY;
	const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;
	const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${apiKey}`;

	let convertTemp = (k) => {
		return ((k - 273.15) * 9/5 + 32).toFixed(0);
	}

	let convertDegreeToDirection = (deg) => {
		let directionsArray = ["N","NNE","NE","ENE","E","ESE", "SE", "SSE","S","SSW","SW","WSW","W","WNW","NW","NNW"];
		let index = parseInt((deg / 22.5) + .5);
		return directionsArray[index];
	}

	let convertUnixToTime = (u) => {
		let date = new Date(u * 1000);
		let hours = date.getHours();
		let minutes = ('0' + date.getMinutes()).slice(-2);
		
		if (hours < 12) {
			return `${hours}:${minutes} a.m.`
		} else {
			return `${hours - 12}:${minutes} p.m.`
		}
	}

	let dayCheck = (current, sunrise, sunset) => {
		if (current > sunrise && current < sunset) {
			return true;
		} else {
			return false;
		}
	}

	useEffect(() => {
		axios.get(apiUrl)
			.then(({data}) => {
			  //console.log(data);
				let currentTemp = convertTemp(data.main.temp);
				let highTemp = convertTemp(data.main.temp_max);
				let lowTemp = convertTemp(data.main.temp_min);
				let direction = convertDegreeToDirection(data.wind.deg);
				let dayResult = dayCheck(data.dt, data.sys.sunrise, data.sys.sunset);
				let sunrise = convertUnixToTime(data.sys.sunrise);
				let sunset = convertUnixToTime(data.sys.sunset);

				setWeatherObj({
					description: data.weather[0].main,
					id: data.weather[0].id,
					icon: data.weather[0].icon,
					temperature: {
						current: currentTemp,
						high: highTemp,
						low: lowTemp
					},
					wind: {
						speed: data.wind.speed.toFixed(0),
						direction: direction
					},
					location: data.name,
					humidity: data.main.humidity,
					coord: {
						lon: data.coord.lon,
						lat: data.coord.lat
					},
					time: {
						current: data.dt,
						sunrise: sunrise,
						sunset: sunset,
						day: dayResult
					}
				});

				setDataFetched(true);
			})
			.catch(err => {
				return err
			});
			// eslint-disable-next-line
	}, [])

	useEffect(() => {
		axios.get(forecastUrl)
			.then(({data}) => {
				//console.log(data);
			})
	}, [forecastUrl]);

	useEffect(() => {
		if(dataFetched) {
			getCondition({
				id: weatherObj.id,
				day: weatherObj.time.day
			});
		}
	}, [weatherObj.id, weatherObj.time.day, dataFetched, getCondition]);

	// console.log(weatherObj);

	const {location, temperature, description, wind, humidity, time} = weatherObj;
	
	return (	
		<div>
			<div className="details-div rounded">
				<h1 className="text-white">{location}</h1>
				<h1 className="text-white">{temperature.current}° F</h1>
				<h3 className="text-white text-capitalize">{description}</h3>
				{dataFetched ? <Icon id={weatherObj.icon} day={weatherObj.time.day}/> : null}
				<h3 className="text-white">Wind: {wind.direction} {wind.speed}mph</h3>
				<h3 className="text-white">Humidity: {humidity}%</h3>
			</div>
			<div className="details-div row justify-content-around rounded">
				<div>
					<h5 className="text-white"><u>High</u></h5>
					<h5 className="text-white">{temperature.high}</h5>
					<h5 className="text-white"><u>Sunrise</u></h5>
					<h5 className="text-white">{time.sunrise}</h5>
				</div>
				<div>
					<h5 className="text-white"><u>Low</u></h5>
					<h5 className="text-white">{temperature.low}</h5>
					<h5 className="text-white"><u>Sunset</u></h5>
					<h5 className="text-white">{time.sunset}</h5>
				</div>
			</div>
			{dataFetched ? <Radar day={weatherObj.time.day} coord={weatherObj.coord}/> : null}
			
		</div>		
	);
}

export default DashBoardItem;
