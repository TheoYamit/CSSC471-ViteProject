import React, { useState } from 'react';
import './navbar.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faSignIn, faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/Authorization/Authorized';
import { Text, Menu, MenuList, MenuButton, MenuItem, Button } from '@chakra-ui/react'

const NavBar = () => {
  const { isAuthenticated, userDetails, logout } = useAuth();

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

  return (
    <nav className="justify-between w-full z-10 flex items-center px-4 py-2 text-white background-of-navbar">
      <button>
        <FontAwesomeIcon icon={faBars} style={{ color: "#776B5D" }} size="2xl" className="px-4" />
      </button>
      <div className="flex">
        <img src={logo} alt="Logo" className="h-20 w-auto" onClick={routeChangeHome} style={{ cursor: "pointer" }} />
      </div>


      <div className="flex-1 mx-4 flex justify-center items-center">
        <input type="text" placeholder="I am looking for..." className="w-3/4 p-2 rounded border border-inherit h-10 search-bar" style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", borderTopRightRadius: "0", borderBottomRightRadius: "0" }} />
        <button className="px-5 h-10 border-inherit search-button" style={{ borderTopLeftRadius: "0", borderBottomLeftRadius: "0", borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>
          <FontAwesomeIcon icon={faSearch} style={{ color: "#000000" }} />
        </button>
      </div>

      {isAuthenticated ? (
        <Menu>
          <Text className="px-2" color="#776B5D">{userDetails.Username}</Text>
          <MenuButton as={Button} bg="#B0A695" style={{borderRadius: "40px"}} _hover={{bg: '#776B5D'}} _expanded={{bg: "#776B5D"}}>
            <FontAwesomeIcon icon={faUser} style={{ color: "#F3EEEA" }} />
          </MenuButton>
          <MenuList bg="#B0A695">
            <MenuItem bg="#B0A695" _hover={{bg: '#776B5D'}}>Profile Info</MenuItem>
            <MenuItem bg="#B0A695" _hover={{bg: '#776B5D'}}>Orders</MenuItem>
            <MenuItem bg="#B0A695" _hover={{bg: '#776B5D'}} onClick={logout}>Logout</MenuItem>
          </MenuList>
        </Menu>
      ) :
        <div className="mx-4 flex">
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
  );
};

export default NavBar;