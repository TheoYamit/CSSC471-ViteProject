import react from 'react'
import './registercomponent.css'
import { Box, HStack, VStack, Text} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

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
                                    />
                                    <input
                                    type="text"
                                    placeHolder="Last Name"
                                    className="username-input"
                                    />
                                    
                                    <input
                                    type="email"
                                    placeHolder="Email Address"
                                    className="username-input"
                                    />

                                    <input
                                    type="text"
                                    placeHolder="Address"
                                    className="username-input"
                                    />

                                    <input
                                    type="text"
                                    placeHolder="Username"
                                    className='username-input'
                                    />
                                    <input
                                    type="password"
                                    placeHolder="Password"
                                    className='username-input'
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