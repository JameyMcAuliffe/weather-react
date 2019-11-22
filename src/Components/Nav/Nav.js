import React from 'react';
// import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBFormInline, MDBBtn, MDBIcon } from 'mdbreact';
//import { MDBIcon } from 'mdbreact';

import './Nav.css';

const Nav = () => {

	return (
		<nav className="navbar navbar-dark nav align-items-center">
			<p className="navbar-brand">Weather</p>
		</nav>
	);
}

export default Nav;

/*<form className="form-inline row">
	      <input className="form-control col-xs-4" type="search" placeholder="Search" aria-label="Search"/>
	      <button className="btn btn-outline-white col-xs-6" type="submit">
	      	Search
	      </button>
	    </form>

<MDBBtn 
              	color="elegant"
              	type="submit"
              	onSubmit={submitSearch}><MDBIcon className="white-text" icon="search-retro" /></MDBBtn>

		<MDBNavbar dark className="nav">
			<MDBNavbarBrand>
        <strong className="white-text">Weather</strong>
      </MDBNavbarBrand>
      <MDBNavbarNav right>
        <MDBNavItem className="">
          <MDBFormInline>
            <div className="md-form my-0 row d-flex">
              <input 
              	className="form-control mr-sm-2" 
              	type="text" 
              	placeholder="Search" 
              	aria-label="Search"
              	onChange={updateSearchValue}
              	value={searchValue}/>
              
            </div>
          </MDBFormInline>
        </MDBNavItem>
      </MDBNavbarNav>
		</MDBNavbar>*/
