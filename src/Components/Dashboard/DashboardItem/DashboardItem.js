import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Radar from '../../Radar/Radar';
import CurrentDetails from './CurrentDetails/CurrentDetails';
import OutlookForDay from './OutlookForDay/OutlookForDay';
import HourlyForecast from './HourlyForecast/HourlyForecast';
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
	const [hourlyArray, setHourlyArray] = useState([]);
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

	let convertUnixToTime = (u, timezone) => {
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

	let dayCheck = (current, sunrise, sunset) => {
		if (current > sunrise && current < sunset) {
			return true;
		} else {
			return false;
		}
	}

	//Current conditions
	useEffect(() => {
		axios.get(apiUrl)
			.then(({data}) => {
			  //console.log(data);
				let currentTemp = convertTemp(data.main.temp);
				let highTemp = convertTemp(data.main.temp_max);
				let lowTemp = convertTemp(data.main.temp_min);
				let direction = convertDegreeToDirection(data.wind.deg);
				let dayResult = dayCheck(data.dt, data.sys.sunrise, data.sys.sunset);
				let sunrise = convertUnixToTime(data.sys.sunrise, data.timezone);
				let sunset = convertUnixToTime(data.sys.sunset, data.timezone);

				setWeatherObj({
					description: data.weather[0].description,
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

	//future forecast
	useEffect(() => {
		axios.get(forecastUrl)
			.then(({data}) => {
				//console.log(data);
				let tempArray = [];
				for(let i = 0; i <= 4; i++) {
					let item = data.list[i];
					let time = convertUnixToTime(item.dt, data.city.timezone);
					let avgTemp = (item.main.temp_min + item.main.temp_max) / 2;
					let temp = convertTemp(avgTemp);
					let itemObj = {
						time: time,
						temp: temp,
						humidity: item.main.humidity,
						description: item.weather[0].main
					}
					tempArray.push(itemObj);
				}
				setHourlyArray(tempArray);
			})
	}, [forecastUrl]);

	//function to pass data up to App.js
	useEffect(() => {
		if(dataFetched) {
			getCondition({
				id: weatherObj.id,
				day: weatherObj.time.day
			});
		}
	}, [weatherObj.id, weatherObj.time.day, dataFetched, getCondition]);

	// console.log(weatherObj);


	return (	
		<div>
			<CurrentDetails weatherObj={weatherObj}/>
			<OutlookForDay weatherObj={weatherObj}/>
			{dataFetched ? <Radar day={weatherObj.time.day} coord={weatherObj.coord}/> : null}	
			<HourlyForecast hourlyArray={hourlyArray}/>	
		</div>		
	);
}

export default DashBoardItem;
