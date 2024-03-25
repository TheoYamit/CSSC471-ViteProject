import React from 'react';
import NavBar from '../../components/Navbar';
import MainPageBody from '../../components/MainPageBody';
import MainPageBodyTwo from '../../components/MainPageBodyTwo';
import { useAuth } from '../../contexts/Authorization/Authorized'

const Home = () => {
  const { isAuthenticated, isAdmin, userDetails } = useAuth();
  return (
    <>
      {(isAuthenticated && isAdmin) ? 
      <>
        <NavBar />
      </>
      :
      <>
        <NavBar />
        <MainPageBody />
        <MainPageBodyTwo />
      </>
      }
    </>
  );
};

export default Home;