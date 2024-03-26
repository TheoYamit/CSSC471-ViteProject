import React, { useState } from 'react';
import './adminproductspage.css';
import NavBar from '../../../components/Navbar';
import { Flex, Box, HStack, VStack, Image, Button, useBreakpointValue } from '@chakra-ui/react';
import ProductManagement from '../../../components/AdminStuff/ProductManagement';


const AdminProductsPage = () => {
  const [isAddProduct, setIsAddProduct] = useState(false);
  const [showFlex, setShowFlex] = useState(true);
  const toggleShowFlex = () => {
    setShowFlex(!showFlex);
  };

  const toggleSetIsAddProduct = () => {
    toggleShowFlex();
    setIsAddProduct(!isAddProduct);
  }

  const direction = useBreakpointValue({ base: "column", lg: "row" })
  const heightOfButtons = useBreakpointValue({base: "300px", lg: "620px"})
  return (
    <>
      <NavBar />
      <Flex display={!showFlex ? "none": null} Flex direction={direction} justifyContent="space-between" alignItems="center" p={5}>
        <Box w={{ base: "full", lg: "50%" }} p={3}>
          <Button borderRadius="20" onClick={toggleSetIsAddProduct} w="full" h={heightOfButtons}>
            ADD PRODUCTS
          </Button>
        </Box>
        <Box w={{ base: "full", lg: "50%" }} p={3}>
          <Button borderRadius="20" onClick={toggleShowFlex} w="full" h={heightOfButtons}>
            EDIT EXISTING PRODUCTS
          </Button>
        </Box>
      </Flex>
      {isAddProduct ? 
      <>
        <ProductManagement/>
      </>
      :
      <>
      </>
      }
    </>
  );
}

export default AdminProductsPage;