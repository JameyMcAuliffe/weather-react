import React from 'react';

import DashboardItem from './DashboardItem/DashboardItem';
import './Dashboard.css';


const Dashboard = ({getCondition, searchedValue}) => {

	return (
		<div>
			<DashboardItem getCondition={getCondition} searchedValue={searchedValue}/>
		</div>
	);
}

export default Dashboard;
