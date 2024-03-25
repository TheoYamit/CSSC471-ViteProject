import React, { useState } from 'react';
import './profileofuser.css'
import { useAuth } from '../../contexts/Authorization/Authorized'
import { Text, Button, HStack, VStack, Box, Image, Input, Grid, GridItem, InputGroup, InputRightElement, Alert, AlertIcon, Tooltip, useBreakpointValue } from '@chakra-ui/react'
import profile from '../../assets/profile.svg'
import { useForm } from 'react-hook-form'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";



const ProfileOfUser = () => {
  const { userDetails } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: { ...userDetails }
  });

  const toolTipSizePlacement = useBreakpointValue({base: "bottom", md: "right", lg: "right"});

  const [alertInfo, setAlertInfo] = useState({ isVisible: false, status: "", message: "" });

  const { setDetails } = useAuth();

  let navigateHome = useNavigate();

  const toggleEditMode = () => {
    setEditMode(!editMode);
  }

  const toggleShowPass = () => {
    setShowPass(!showPass);
  }

  const onSubmit = async (data) => {
    console.log(data);
    const response = await fetch('http://localhost:3001/profileinfo', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data),
    });

    const responseFromServer = await response.json();
    const { status, message, profile } = responseFromServer;
    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    })

    if (status == "success") {
      setDetails(profile);
      toggleEditMode();
      setTimeout(() => {
        navigateHome('/');
      }, 3000);
    }
  }

  return (
    <>
      <div className="profile">
        <form onSubmit={handleSubmit(onSubmit)}>
          <VStack>
            <Image src={profile} w="200px" />
            <Grid templateColumns="auto minmax(0, 260px)" gap={6} alignItems="center">
              <GridItem>
                <Text as="b">Username:</Text>
              </GridItem>
              <GridItem>
                <Input readOnly="true" {...register("Username")} />
              </GridItem>

              <GridItem>
                <Text>Password:</Text>
              </GridItem>
              <GridItem>
                <Tooltip isDisabled={!errors.Password} label={errors.Password?.message} placement={toolTipSizePlacement} hasArrow>
                  <InputGroup width="100%">
                      <Input
                        readOnly={!editMode}
                        type={showPass ? "text" : "password"}
                        {...register("Password", { required: "Password required!" })}
                      />
                      <InputRightElement width="4.5rem">
                        <Button h="1.75rem" size="sm" onClick={toggleShowPass}>
                          <FontAwesomeIcon icon={showPass ? faEyeSlash : faEye} />
                        </Button>
                      </InputRightElement>
                  </InputGroup>
                </Tooltip>
              </GridItem>

              <GridItem>
                <Text>First Name:</Text>
              </GridItem>
              <GridItem>
                <Tooltip isDisabled={!errors.First_name} label={errors.First_name?.message} placement={toolTipSizePlacement} hasArrow>
                  <Input readOnly={!editMode} {...register("First_name", { required: "First name required!" })} />
                </Tooltip>
              </GridItem>

              <GridItem>
                <Text>Last Name:</Text>
              </GridItem>
              <GridItem>
                <Tooltip isDisabled={!errors.Last_name} label={errors.Last_name?.message} placement={toolTipSizePlacement} hasArrow>
                  <Input readOnly={!editMode} {...register("Last_name", { required: "Last name required!" })} />
                </Tooltip>
              </GridItem>

              <GridItem>
                <Text>Email:</Text>
              </GridItem>
              <GridItem>
                <Tooltip isDisabled={!errors.Email} label={errors.Email?.message} placement={toolTipSizePlacement} hasArrow>
                  <Input type="email" readOnly={!editMode} {...register("Email", { required: "Email required!" })} />
                </Tooltip>
              </GridItem>

              <GridItem>
                <Text>Address:</Text>
              </GridItem>
              <GridItem>
                <Tooltip isDisabled={!errors.Address} label={errors.Address?.message} placement={toolTipSizePlacement} hasArrow>
                  <Input readOnly={!editMode} {...register("Address", { required: "Address required!" })} />
                </Tooltip>
              </GridItem>
            </Grid>
            <Button bg="#B0A695" _hover={{ backgroundColor: "#93856c" }} onClick={toggleEditMode}>
              {!editMode ? "Edit Profile" : "Stop Editing Profile"}
            </Button>
            {editMode ?
              <Button type="submit">
                Update Profile Information
              </Button>
              :
              <></>
            }
            {alertInfo.isVisible && (
              <Alert w="500px" status={alertInfo.status}>
                <AlertIcon />
                {alertInfo.message}
              </Alert>
            )}
          </VStack>
        </form>
      </div>
    </>
  )
}

export default ProfileOfUser;