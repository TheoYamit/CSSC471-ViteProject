import React from 'react';
import './profileofuser.css'
import { useAuth } from '../../contexts/Authorization/Authorized'
import { Text, Button } from '@chakra-ui/react'

const ProfileOfUser = () => {
  const { userDetails } = useAuth();

  return (
    <>
      <div className="profile">

      </div>
    </>
  )
}

export default ProfileOfUser;