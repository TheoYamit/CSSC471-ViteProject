import './registercomponent.css'
import React, { useState } from 'react';
import { Box, VStack, Text, Tooltip} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';


const RegisterComponent = () => {

    const {register, handleSubmit, formState: {errors}} = useForm();
    
    let navigateLogin = useNavigate();
    const routeChangeLogin = () => {
        let path = '/login'
        navigateLogin(path);
    }

    /*This is just a temporary onSubmit function right now.
    Will probably make it go to the login page so the user can login after. */
    const onSubmit = async (data) => {
        console.log(data)

        const response = await fetch('http://localhost:5173/register', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const responseFromServer = await response.json();

    };

    return (
        <div className="registercomponent">
         <VStack>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box p="10" pt="3" pb="5" className="loginbox">
                <VStack>
                  <Text fontSize='3xl' as="b">Register For An Account</Text>
                  
                  <Tooltip isDisabled={!errors.firstName} label={errors.firstName?.message} placement="right" hasArrow>
                    <input {...register("firstName", { required: 'First name is required!' })}
                      placeholder="First Name"
                      className="username-input"
                      style={{ borderColor: errors.firstName ? 'red' : '#EBE3D5' }}/>
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
                    style={{ borderColor: errors.email ? 'red' : '#EBE3D5' }}/>
                  </Tooltip>
                  
                  <Tooltip isDisabled={!errors.address} label={errors.address?.message} placement="right" hasArrow>
                    <input {...register("address", { required: 'Address is required!' })} 
                    placeholder="Address" 
                    className="username-input" 
                    style={{ borderColor: errors.address ? 'red' : '#EBE3D5' }}
                    />
                  </Tooltip>

                  <Tooltip isDisabled={!errors.username} label={errors.username?.message} placement="right" hasArrow>
                    <input {...register("username", { required: 'Username is required!' })} 
                    placeholder="Username" 
                    className="login-input" 
                    style={{ borderColor: errors.username ? 'red' : '#EBE3D5' }}/>
                  </Tooltip>

                  <Tooltip isDisabled={!errors.password} label={errors.password?.message} placement="right" hasArrow>
                    <input {...register("password", { required: 'Password is required!' })} 
                    placeholder="Password" 
                    type="password" 
                    className="login-input" 
                    style={{ borderColor: errors.password ? 'red' : '#EBE3D5' }}/>
                  </Tooltip>

                  <button onClick={onSubmit} type="submit" style={{ backgroundColor: '#B0A695'}}className="register-submit">Register</button>
                </VStack>
              </Box>
            </form>
            <Text>Already have an account?</Text>
            <Text as="b" onClick={routeChangeLogin} style={{cursor: 'pointer'}}>Login now</Text>
          </VStack>
        </div>
      );
    };

export default RegisterComponent;
    