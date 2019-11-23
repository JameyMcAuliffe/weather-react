import React, {useState} from 'react';

import './Search.css';

const Search = ({passUpValue}) => {

	const [searchedInput, setSearchedInput] = useState('');

	let updateSearchedInput = (e) => {
		setSearchedInput(e.target.value);
	}

	let formSubmit = (e) => {
		passUpValue(searchedInput);
		setSearchedInput('');
		e.preventDefault();
	}

	let disabled = searchedInput.trim('') === '' ? true : false;

	return (
		<form onSubmit={formSubmit}>
			<div className="search-div">
				<input
					value={searchedInput}
					onChange={updateSearchedInput} 
					type="text"
					placeholder="Enter a zip, city, or location..."
					className="form-control search-input"/>
				<button className="btn text-white search-btn" disabled={disabled}>
					Show Me
				</button>
			</div>

		</form>
	);
}

export default Search;

// <span className="oi oi-magnifying-glass"></span>
