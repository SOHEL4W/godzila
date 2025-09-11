import React, { useContext, useEffect, useState } from "react";
import Classes from "./navbar.module.css";
import logo from "../Assets/logo.png";
import cart_icon from "../Assets/cart_icon.png";
import { Link } from "react-router-dom";
import { ShopContext } from "../../Context/ShopContext";
import { useRef } from "react";
import nav_dropdown from '../Assets/nav_dropdown.png';

const Navbar = () => {
  // Initialize state directly from localStorage or default to "shop"
  const [menu, setMenu] = useState(() => {
    const savedMenu = localStorage.getItem("menu");
    return savedMenu || "shop";
  });
  
  const {getTotalCartItems} = useContext(ShopContext);
  const menuRef = useRef();
  
  const dropdown_toggle = (e) => {
    menuRef.current.classList.toggle(Classes.nav_menu_visible);
    e.target.classList.toggle(Classes.open);
  };

  // Update localStorage whenever menu changes
  useEffect(() => {
    if (menu) {
      localStorage.setItem("menu", menu);
    }
  }, [menu]);
  return (
    <div className={Classes.navbar}>
      <div className={Classes.nav_logo}>
        <img src={logo} alt="logo" />
        <p>GODZILA</p>
      </div>
      <img className={Classes.nav_dropdown} onClick={dropdown_toggle} src={nav_dropdown} alt="" />
      <ul ref={menuRef} className={Classes.nav_menu}>
        <li
          onClick={() => {
            setMenu("shop");
          }}
        >
          <Link style={{textDecoration: 'none'}} to='/'>Shop</Link> {menu =="shop"?<hr/>:<></>}
        </li>
        <li
          onClick={() => {
            setMenu("mens");
          }}
        >
          <Link style={{textDecoration: 'none'}} to='/mens'>Men</Link> {menu ==="mens"?<hr/>:<></>}
        </li>
        <li
          onClick={() => {
            setMenu("womens");
          }}
        >
          <Link style={{textDecoration: 'none'}} to='/womens'>Women</Link> {menu ==="womens"?<hr/>:<></>}
        </li>
        <li
          onClick={() => {
            setMenu("kids");
          }}
        >
          <Link style={{textDecoration: 'none'}} to='/kids'>Kids</Link> {menu ==="kids"?<hr/>:<></>}
        </li>
      </ul>
      <div className={Classes.cart}>
        {localStorage.getItem('auth-token')
        ?<button onClick={()=>{localStorage.removeItem('auth-token');window.location.replace('/')}}>Logout</button>
      :<Link to='/login'><button>Login</button></Link>}
        
        <Link to='/cart'><img src={cart_icon} alt="cart" /></Link>
        <div className={Classes.nav_cart_count}>{getTotalCartItems()}</div>
      </div>
    </div>
  );
};

export default Navbar;
