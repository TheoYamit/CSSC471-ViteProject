import React from 'react';
import NavBar from '../../components/Navbar';
import MainPageBody from '../../components/MainPageBody';
import MainPageBodyTwo from '../../components/MainPageBodyTwo';
import MainPageBodyThree from '../../components/MainPageBodyThree';
import MainPageBodyFour from '../../components/MainPageBodyFour';
import AdminProduct from '../../components/AdminStuff/AdminProduct';
import AdminOrders from '../../components/AdminStuff/AdminOrders';
import AdminReviews from '../../components/AdminStuff/AdminRewiews'
import { useAuth } from '../../contexts/Authorization/Authorized';

const Home = () => {
  const { isAuthenticated, isAdmin, userDetails } = useAuth();
  return (
    <>
      {(isAuthenticated && isAdmin) ? 
      <>
        <NavBar />
        <AdminProduct/>
        <AdminOrders/>
        <AdminReviews/>
      </>
      :
      <>
        <NavBar />
        <MainPageBody />
        <MainPageBodyTwo />
        <MainPageBodyThree />
        <MainPageBodyFour />
      </>
      }
    </>
  );
};

export default Home;