import React, { useState } from 'react';
import './adminproductspage.css';
import NavBar from '../../../components/Navbar';
import { Flex, Box, HStack, VStack, Image, Button, useBreakpointValue } from '@chakra-ui/react';
import ProductManagement from '../../../components/AdminStuff/ProductManagement';
import EditProductManagement from '../../../components/AdminStuff/EditProductManagement';


const AdminProductsPage = () => {
  const [isAddProduct, setIsAddProduct] = useState(null);
  const [showFlex, setShowFlex] = useState(true);
  
  const toggleShowFlex = () => {
    setShowFlex(!showFlex);
  };

  const toggleSetIsAddProduct = (value) => {
    setIsAddProduct(value);
    setShowFlex(false);
  };

  const direction = useBreakpointValue({ base: "column", lg: "row" });
  const heightOfButtons = useBreakpointValue({base: "300px", lg: "620px"});

  return (
    <>
      <NavBar />
      {showFlex && (
        <Flex direction={direction} justifyContent="space-between" alignItems="center" p={5}>
          <Box w={{ base: "full", lg: "50%" }} p={3}>
            <Button borderRadius="20" onClick={() => toggleSetIsAddProduct(true)} w="full" h={heightOfButtons}>
              ADD PRODUCTS
            </Button>
          </Box>
          <Box w={{ base: "full", lg: "50%" }} p={3}>
            <Button borderRadius="20" onClick={() => toggleSetIsAddProduct(false)} w="full" h={heightOfButtons}>
              EDIT EXISTING PRODUCTS
            </Button>
          </Box>
        </Flex>
      )}
      {isAddProduct === true && <ProductManagement/>}
      {isAddProduct === false && <EditProductManagement/>}
    </>
  );
};

export default AdminProductsPage;