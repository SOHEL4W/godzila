import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/nav-logo.svg'
// This is the line that has been fixed
import navProfile from '../../assets/nav-Profile.png'

export const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className="nav-logo" />
      <img src={navProfile} alt="" className="nav-profile" />
    </div>
  )
}

export default Navbar