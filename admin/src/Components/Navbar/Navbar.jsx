
import './Navbar.css'
import logo from '../../assets/logo.png'
import navProfile from '../../assets/nav-profile.png'


export const Navbar = () => {
  return (
    <div className='navbar'>
        <div className='nav_logo'>
                <img src={logo} alt="logo" />
                <p>GODZILA</p>
              </div>
        <img src={navProfile} alt="" className="nav-profile" />

        
    </div>
  )
}
export default Navbar;