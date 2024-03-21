import './registercomponent.css'
import React, { useState } from 'react';
import { Box, VStack, Text} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'


const RegisterComponent = () => {

    

    let navigateLogin = useNavigate();
    const routeChangeLogin = () => {
        let path = '/login'
        navigateLogin(path);
    }

    return (
        <div className="registercomponent">
            <VStack>
                <form>
                    <Box p="10" pt="3" pb="5" className="loginbox">
                        <VStack>
                            <Text fontSize='3xl' as="b">
                                Register For An Account
                            </Text>
                            <input
                            type="text"
                            placeHolder="First Name"
                            className="username-input"
                            required
                            />
                            <input
                            type="text"
                            placeHolder="Last Name"
                            className="username-input"
                            required
                            />

                            <input
                            type="email"
                            placeHolder="Email Address"
                            className="username-input"
                            required
                            />
                            
                            <input
                            type="text"
                            placeHolder="Address"
                            className="username-input"
                            required
                            />

                            <input
                            type="text"
                            placeHolder="Username"
                            className='username-input'
                            required
                            />
                            <input
                            type="password"
                            placeHolder="Password"
                            className='username-input'
                            required
                            />

                            <button className="login-submit">
                                Register
                            </button>
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