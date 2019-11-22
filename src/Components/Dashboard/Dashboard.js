import React from 'react';
//import { MDBInput } from "mdbreact";

import DashboardItem from './DashboardItem/DashboardItem';
import './Dashboard.css';


const Dashboard = ({getCondition, location}) => {

	//const zip = '28701';
	const zip = {
		longitude: -82.63,
		latitude: 35.71
	};

	return (
		<div>
			<DashboardItem zip={zip} getCondition={getCondition} location={location}/>
		</div>
	);
}

export default Dashboard;
