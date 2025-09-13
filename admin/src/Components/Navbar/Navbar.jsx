import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
// This is the line that has been fixed
import navProfile from '../../assets/nav-Profile.png'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="nav-logo" >
        <img src={navlogo} alt="logo" />
        <p>GODZILA</p>
      </div>
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  )
}

export default Navbar
/*<div className={Classes.nav_logo}>
        <img src={logo} alt="logo" />
        <p>GODZILA</p>
      </div> <img src={navlogo} alt="" className="nav-logo" />*/