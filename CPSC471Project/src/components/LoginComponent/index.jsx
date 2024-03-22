import React from 'react'
import './logincomponent.css'
import { Box, HStack, VStack, Text, Tooltip } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { useForm } from 'react-hook-form'

const LoginComponent = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

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

  const onSubmit = data =>  {
    console.log(data)
  };

  return (
    <div className="logincomponent">
      <VStack>
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
                  style={{ borderColor: errors.username ? 'red' : '#EBE3D5' }}/>
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