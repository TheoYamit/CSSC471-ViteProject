import React from 'react';
import { useAuth } from '../../contexts/Authorization/Authorized'
import NavBar from '../../components/Navbar';
import ProfileOfUser from '../../components/ProfileOfUser'


const Profile = () => {
  const { isAuthenticated, userDetails, logout } = useAuth();
  return (
    <>
      <NavBar/>
      <ProfileOfUser/>
    </>
  )
}

export default Profile;