import React from 'react';
import adminorders from '../../../assets/adminorders.png';
import { Flex, Image, Button, useBreakpointValue } from '@chakra-ui/react';

const AdminOrders = () => {

  const sizeOfButton = useBreakpointValue({ base: "2rem", md: "3rem", lg: "4rem" })
  const fontSizeOfButton = useBreakpointValue({ base: "2xl", md: "4xl", lg: "6xl" })
  return (
    <>
      <Flex bg="#EBE3D5" py="10">
        <Image src={adminorders} />
        <Button bg="white" color="black" _hover={{ bg: "black", color: "white" }} 
        sx={{ padding: sizeOfButton, borderColor: "black", borderWidth: "5px", position: "absolute", right: "5%", top: "50%", borderRadius: "20px"}} fontSize={fontSizeOfButton}>
          Manage Orders
        </Button>
      </Flex>
    </>
  );
}

export default AdminOrders;