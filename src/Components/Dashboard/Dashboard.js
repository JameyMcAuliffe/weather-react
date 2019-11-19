import React from 'react';

import DashboardItem from './DashboardItem/DashboardItem';

const Dashboard = ({getCondition}) => {

	const zip = '28701';

	return (
		<div>
			<DashboardItem zip={zip} getCondition={getCondition}/>
		</div>
	);
}

export default Dashboard;
