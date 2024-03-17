import React from 'react';
import './navbar.css';
import logo from '../../assets/logo.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
const NavBar = () => {

    return (
        <nav className="justify-between fixed top-0 w-full z-10 flex items-center px-4 py-2 text-white bg-orange-50">
            <img src={logo} alt="Logo" className="h-20 w-auto" />

            <div className="flex-1 mx-4 flex justify-center items-center">
                <input type="text" placeholder="I am looking for..." className="w-3/4 p-2 rounded border border-inherit h-10" style={{borderTopRightRadius: "0", borderBottomRightRadius: "0"}} />
                <button className="px-5 h-10 border-inherit search-button" style={{borderTopLeftRadius:"0", borderBottomLeftRadius: "0"}}>
                    <FontAwesomeIcon icon={faSearch} style={{color: "#000000"}}/>
                </button>
            </div>

            <div>
                <button className="px-4 py-2 rounded bg-blue-500 hover:bg-blue-700 transition duration-300">Login</button>
                <button className="ml-2 px-4 py-2 rounded bg-green-500 hover:bg-green-700 transition duration-300">Register</button>
            </div>
        </nav>
    );
}

export default NavBar;