import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Radar from '../../Radar/Radar';
import Loading from './Loading/Loading';
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

const DashBoardItem = ({getCondition, searchedValue}) => {	

	const [weatherObj, setWeatherObj] = useState(defaultWeatherObj);
	const [hourlyArray, setHourlyArray] = useState([]);
	const [coords, setCoords] = useState(null);
	const [dataFetched, setDataFetched] = useState(false);
	const [locationFound, setLocationFound] = useState(false);
	
	const apiUrlCoord = locationFound ? `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}` : null;
	const forecastUrl = locationFound ? `https://api.openweathermap.org/data/2.5/forecast?lat=${coords.latitude}&lon=${coords.longitude}&appid=${apiKey}` : null;

	useEffect(() => {
		navigator.geolocation.getCurrentPosition(function(position) {
		  let coordinatesObj = {
		  	latitude: position.coords.latitude,
		  	longitude: position.coords.longitude
		  }

		  setCoords(coordinatesObj);
		  setLocationFound(true);
		});
	}, []);

	useEffect(() => {
		if(searchedValue !== null) {
			//function available from Geocode
			getCoordinates(searchedValue)
				.then(coordsObj => {
					let newCoordsObject = {
						longitude: coordsObj.lng,
						latitude: coordsObj.lat
					}
					setCoords(newCoordsObject);
				},
				err => {
					return err;
				});
		}
	},[searchedValue]);

	//Current conditions
	useEffect(() => {
		if(locationFound) {
			axios.get(apiUrlCoord)
			.then(({data}) => {
				let currentTemp = convertTemp(data.main.temp);
				let highTemp = convertTemp(data.main.temp_max);
				let lowTemp = convertTemp(data.main.temp_min);
				let direction = convertDegreeToDirection(data.wind.deg);
				let dayResult = dayCheck(data.dt, data.sys.sunrise, data.sys.sunset);
				let sunrise = convertUnixToTime(data.sys.sunrise, data.timezone);
				let sunset = convertUnixToTime(data.sys.sunset, data.timezone);
				let currentTime = convertUnixToTime(data.dt, data.timezone);

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
						current: currentTime,
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
		}
		
	}, [apiUrlCoord, locationFound]);


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


	return (	
		<div>	
			{dataFetched ?
				<div> 
					<CurrentDetails weatherObj={weatherObj}/>
					<OutlookForDay weatherObj={weatherObj}/>
					<Radar day={weatherObj.time.day} coord={weatherObj.coord}/> 
					<HourlyForecast hourlyArray={hourlyArray}/>
				</div>
				: <Loading message="Finding location..."/>}		
		</div>		
	);
}

export default DashBoardItem;


