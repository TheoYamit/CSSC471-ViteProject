import React from 'react'
import './logincomponent.css'
import { Box, HStack, VStack, Text} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse } from '@fortawesome/free-solid-svg-icons'
const LoginComponent = () => {
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
    
    return (
        <div className="logincomponent">
            <VStack>
                <form>
                    <Box p="10" pt="3" pb="5" className="loginbox">
                        <VStack>
                            <Text fontSize='3xl' as="b">
                                Login To Account
                            </Text>
                            <input
                            type="text"
                            placeHolder="Username"
                            className='username-input'
                            />
                            <input
                            type="text"
                            placeHolder="Password"
                            className='username-input'
                            />

                            <button className="login-submit">
                                Log In
                            </button>
                        </VStack>
                    </Box>
                </form>
                <Text>Don't have an account?</Text>
                <Text as="b" onClick={routeChangeRegister} style={{cursor: 'pointer'}}>Register now</Text>
                <button className="login-homebutton" onClick={routeChangeHome} style={{cursor: 'pointer'}}>Home <FontAwesomeIcon icon={faHouse} /></button>
            </VStack>
        </div>
    );   
};

export default LoginComponent;