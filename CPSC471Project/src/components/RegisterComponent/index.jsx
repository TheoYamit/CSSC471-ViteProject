import './registercomponent.css'
import React, { useState } from 'react';
import { Box, VStack, Text, Tooltip, Alert, AlertIcon } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';


const RegisterComponent = () => {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [alertInfo, setAlertInfo] = useState({ isVisible: false, status: "", message: "" })
  let navigateLogin = useNavigate();
  const routeChangeLogin = () => {
    let path = '/login'
    navigateLogin(path);
  }

  /*This is just a temporary onSubmit function right now.
  Will probably make it go to the login page so the user can login after. */
  const onSubmit = async (data) => {
    const response = await fetch('http://localhost:3001/register', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseFromServer = await response.json();

    const { status, message } = responseFromServer;

    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    })


  };

  return (
    <div className="registercomponent">
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
              <Text fontSize='3xl' as="b">Register For An Account</Text>

              <Tooltip isDisabled={!errors.username} label={errors.username?.message} placement="right" hasArrow>
                <input {...register("username", { required: 'Username is required!' })}
                  placeholder="Choose a Username"
                  className="login-input"
                  style={{ borderColor: errors.username ? 'red' : '#EBE3D5' }} />
              </Tooltip>

              <Tooltip isDisabled={!errors.password} label={errors.password?.message} placement="right" hasArrow>
                <input {...register("password", { required: 'Password is required!' })}
                  placeholder="Create a Password"
                  type="password"
                  className="login-input"
                  style={{ borderColor: errors.password ? 'red' : '#EBE3D5' }} />
              </Tooltip>

              <Tooltip isDisabled={!errors.firstName} label={errors.firstName?.message} placement="right" hasArrow>
                <input {...register("firstName", { required: 'First name is required!' })}
                  placeholder="First Name"
                  className="username-input"
                  style={{ borderColor: errors.firstName ? 'red' : '#EBE3D5' }} />
              </Tooltip>

              <Tooltip isDisabled={!errors.lastName} label={errors.lastName?.message} placement="right" hasArrow>
                <input {...register("lastName", { required: 'Last name is required!' })}
                  placeholder="Last Name"
                  className="username-input"
                  style={{ borderColor: errors.lastName ? 'red' : '#EBE3D5' }} />
              </Tooltip>

              <Tooltip isDisabled={!errors.email} label={errors.email?.message} placement="right" hasArrow>
                <input {...register("email", { required: 'Email is required!' })}
                  placeholder="Email Address"
                  type="email"
                  className="username-input"
                  style={{ borderColor: errors.email ? 'red' : '#EBE3D5' }} />
              </Tooltip>

              <Tooltip isDisabled={!errors.address} label={errors.address?.message} placement="right" hasArrow>
                <input {...register("address", { required: 'Address is required!' })}
                  placeholder="Address"
                  className="username-input"
                  style={{ borderColor: errors.address ? 'red' : '#EBE3D5' }}
                />
              </Tooltip>

              <button className="register-submit">Register</button>
            </VStack>
          </Box>
        </form>
        <Text>Already have an account?</Text>
        <Text as="b" onClick={routeChangeLogin} style={{ cursor: 'pointer' }}>Login now</Text>
      </VStack>
    </div>
  );
};

export default RegisterComponent;
