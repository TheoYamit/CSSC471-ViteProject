import React from 'react';
import './navbar.css';
import { useNavigate } from "react-router-dom";
import logo from '../../assets/logo.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faSignIn, faUserPlus, faUser} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../../contexts/Authorization/Authorized';

const NavBar = () => {
  const { isAuthenticated, logout } = useAuth();

  let navigateLogin = useNavigate();
  const routeChangeLogin = () => {
    let path = '/login'
    navigateLogin(path);
  }

  let navigateHome = useNavigate();
  const routeChangeHome = () => {
    let path = '/'
    navigateHome(path);
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
        <div className="mx-4 flex">
          <button>
            <FontAwesomeIcon icon={faUser}></FontAwesomeIcon>
          </button>
        </div>
      ) :
        <div className="mx-4 flex">
          <button className="px-4 py-2 rounded transition duration-300 login-button" onClick={routeChangeLogin}>
            <FontAwesomeIcon icon={faSignIn} className="px-2" />
            Login
          </button>
          <button className="ml-2 px-4 py-2 rounded transition duration-300 register-button">
            <FontAwesomeIcon icon={faUserPlus} className="px-2" />
            Register
          </button>
        </div >
      }
    </nav >
  );
};

export default NavBar;