import React, { useState } from 'react'
import './logincomponent.css'
import { Box, HStack, VStack, Text, Tooltip, Alert, AlertIcon} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'
import { useAuth } from '../../contexts/Authorization/Authorized';

const LoginComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [ alertInfo, setAlertInfo ] = useState({ isVisible: false, status: "", message: "" })

  const {login} = useAuth();


  let navigateRegister = useNavigate();
  const routeChangeRegister = () => {
    let path = '/register'
    navigateRegister(path);
  }

  let navigateHome = useNavigate();
  const routeChangeHome = () => {
    let path = '/'
    navigateHome(path);
  }

  const onSubmit = async (data) => {
    console.log(data)
    const response = await fetch('http://localhost:3001/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    const responseFromServer = await response.json();
    const { status, message } = responseFromServer;
    console.log(responseFromServer);
    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    })


    if (status === "success") {
      login();
      setTimeout(() => {
        navigateHome('/');
      }, 2000);
      

    }

  };

  return (
    <div className="logincomponent">
      <VStack>
        {alertInfo.isVisible && (
          <Alert status={alertInfo.status}>
            <AlertIcon />
            {alertInfo.message}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box p="10" pt="3" pb="5" className="loginbox">
            <VStack>
              <Text fontSize='3xl' as="b">
                Login To Account
              </Text>

              <Tooltip isDisabled={!errors.username} label={errors.username?.message} placement="right" hasArrow>
                <input
                  {...register("username", { required: 'Username is required!' })}
                  placeHolder="Username"
                  className='login-input'
                  style={{ borderColor: errors.username ? 'red' : '#EBE3D5' }} />
              </Tooltip>

              <Tooltip isDisabled={!errors.password} label={errors.password?.message} placement="right" hasArrow>
                <input
                  {...register("password", { required: 'Password is required!' })}
                  type="password"
                  placeHolder="Password"
                  className='login-input'
                  style={{ borderColor: errors.password ? 'red' : '#EBE3D5' }}
                />
              </Tooltip>

              <button className="login-submit">
                Log In
              </button>
            </VStack>
          </Box>
        </form>
        <Text>Don't have an account?</Text>
        <Text as="b" onClick={routeChangeRegister} style={{ cursor: 'pointer' }}>Register now</Text>
      </VStack>
    </div>
  );
};

export default LoginComponent;