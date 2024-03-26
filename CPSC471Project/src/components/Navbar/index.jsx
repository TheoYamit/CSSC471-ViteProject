import React, { useState, useEffect } from 'react';
import './navbar.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faSignIn, faUserPlus, faUser, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/Authorization/Authorized';
import { Text, Menu, MenuList, MenuButton, MenuItem, Button } from '@chakra-ui/react'

const NavBar = () => {
  const { isAuthenticated, isAdmin, userDetails, logout } = useAuth();
  const [showNav, setShowNav] = useState(true);

  const [lastScrollY, setLastScrollY] = useState(window.pageYOffset);
  const [direction, setDirection] = useState('');

  const NavBarSpacer = () => {
    return (
      <div className={`navbar-spacer ${showNav ? 'visible' : ''}`}></div>
    );
  };

  // Trying to get a dynamic nav bar that disappears and reappears as you scroll up and down.
  // Functionality works I guess.
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;

      if (currentScrollY > lastScrollY && currentScrollY > 96) {
        setDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setDirection('up');
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    setShowNav(direction !== 'down');
  }, [direction]);

  let navigate = useNavigate();
  const routeChangeLogin = () => {
    let path = '/login'
    navigate(path);
  }

  const routeChangeHome = () => {
    let path = '/'
    navigate(path);
  }

  const routeChangeRegister = () => {
    let path = '/register'
    navigate(path);
  }

  const routeChangeProfile = () => {
    let path = '/profile'
    navigate(path)
  }

  return (
    <>
      <nav className={`justify-between w-full z-10 flex items-center px-4 py-2 text-white background-of-navbar navbar ${showNav ? '' : 'navbar-hidden'}`}>
        <button>
          <FontAwesomeIcon icon={faBars} style={{ color: "#776B5D" }} size="2xl" className="px-4" />
        </button>
        <div className="flex">
          <img src={logo} alt="Logo" onClick={routeChangeHome} style={{ cursor: "pointer" }} />
        </div>

        {isAdmin ?
          <>
            <div className="flex-1 mx-4 flex justify-center items-center">
              
            </div>
          </>
          :
          <div className="flex-1 mx-4 flex justify-center items-center">
            <input type="text" placeholder="I am looking for..." className="search-bar" />
            <button className="px-5 h-10 border-inherit search-button">
              <FontAwesomeIcon icon={faSearch} style={{ color: "#000000" }} />
            </button>
          </div>
        }

        {isAuthenticated ? (
          <>
            <FontAwesomeIcon icon={faCartShopping} style={{ color: "#776B5D", padding: "20px", display: isAdmin ? "none" : null }} size="xl" />
            <Menu>
              <Text className="px-2" color="#776B5D">{userDetails.Username}{isAdmin ? " (ADMIN)" : ""}</Text>
              <MenuButton as={Button} bg="#B0A695" style={{ borderRadius: "40px" }} _hover={{ bg: '#776B5D' }} _expanded={{ bg: "#776B5D" }}>
                <FontAwesomeIcon icon={faUser} style={{ color: "#F3EEEA" }} />
              </MenuButton>
              <MenuList bg="#B0A695">
                <MenuItem bg="#B0A695" _hover={{ bg: '#776B5D' }} onClick={routeChangeProfile}>Profile Info</MenuItem>
                <MenuItem bg="#B0A695" _hover={{ bg: '#776B5D' }}>Orders</MenuItem>
                <MenuItem bg="#B0A695" _hover={{ bg: '#776B5D' }} onClick={logout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          </>
        ) :
          <div className="flex">
            <button className="px-4 py-2 rounded transition duration-300 login-button" onClick={routeChangeLogin}>
              <FontAwesomeIcon icon={faSignIn} className="px-2" />
              Login
            </button>
            <button className="ml-2 px-4 py-2 rounded transition duration-300 register-button" onClick={routeChangeRegister}>
              <FontAwesomeIcon icon={faUserPlus} className="px-2" />
              Register
            </button>
          </div >
        }
      </nav >
      <NavBarSpacer />
    </>

  );
};

export default NavBar;