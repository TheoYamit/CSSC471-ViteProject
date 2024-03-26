import React from 'react';
import adminreviews from '../../../assets/adminreviews.png';
import { Flex, Image, Button, useBreakpointValue } from '@chakra-ui/react';

const AdminReviews = () => {

  const sizeOfButton = useBreakpointValue({base: "2rem", md: "3rem", lg: "4rem" })
  const fontSizeOfButton = useBreakpointValue({base: "2xl", md: "4xl", lg: "6xl" })
  return (
    <>
      <Flex bg="#EBE3D5">
        <Image src={adminreviews}/>
        <Button bg="white" color="black" _hover={{bg: "black", color: "white"}} 
        sx={{padding: sizeOfButton, borderColor: "black", borderWidth: "5px", position: "absolute", left: "5%", top: "82%", 
            borderRadius: "20px" }} fontSize={fontSizeOfButton}>
          View Reviews
        </Button>
      </Flex>
    </>
  );
}

export default AdminReviews;