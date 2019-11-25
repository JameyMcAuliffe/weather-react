import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Radar from '../../Radar/Radar';
import CurrentDetails from './CurrentDetails/CurrentDetails';
import OutlookForDay from './OutlookForDay/OutlookForDay';
import HourlyForecast from './HourlyForecast/HourlyForecast';
import { convertTemp, convertDegreeToDirection, convertUnixToTime, dayCheck} from '../../Helper/Helper';
import { getCoordinates } from '../../Geocode/Geocode';
import './DashboardItem.css';

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

const apiKey = process.env.REACT_APP_API_KEY;

const DashBoardItem = ({getCondition, location}) => {	

	const [weatherObj, setWeatherObj] = useState(defaultWeatherObj);
	const [hourlyArray, setHourlyArray] = useState([]);
	const [searchedCoords, setSearchedCoords] = useState(null);
	const [dataFetched, setDataFetched] = useState(false);

	//async/await function that finds user's location, setting value as default of coordObject with useState

	let coordObject = searchedCoords === null ? 
		{latitude: 35.71, longitude: -82.63} :
		{latitude: searchedCoords.lat, longitude: searchedCoords.lng};
	
	const apiUrlCoord = `https://api.openweathermap.org/data/2.5/weather?lat=${coordObject.latitude}&lon=${coordObject.longitude}&appid=${apiKey}`;
	const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${coordObject.latitude}&lon=${coordObject.longitude}&appid=${apiKey}`;

	useEffect(() => {
		if(location !== null) {
			getCoordinates(location)
				.then(coords => {
					setSearchedCoords(coords);
				},
				err => {
					return err;
				});
		}
	},[location]);

	//Current conditions
	useEffect(() => {
		axios.get(apiUrlCoord)
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
				return err;
			});
	}, [apiUrlCoord])


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
			},
			err => {
				return err;
			});
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

	//console.log(weatherObj);


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

//useEffect(() => {
		//navigator.geolocation.getCurrentPosition(function(position) {
		  // let coordinatesObj = {
		  // 	lat: position.latitude,
		  // 	lon: position.longitude
		  // }  
		//});

		// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apiKey}`;

		// const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?zip=${zip}&appid=${apiKey}`;


