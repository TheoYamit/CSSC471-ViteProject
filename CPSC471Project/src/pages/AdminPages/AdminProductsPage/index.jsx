import React, { useState } from 'react';
import './adminproductspage.css';
import NavBar from '../../../components/Navbar';
import { Flex, Box, HStack, VStack, Image, Button, useBreakpointValue } from '@chakra-ui/react';
import ProductManagement from '../../../components/AdminStuff/ProductManagement';
import EditProductManagement from '../../../components/AdminStuff/EditProductManagement';
import AddInventory from '../../../components/AdminStuff/AddInventory';


const AdminProductsPage = () => {
  const [adminAction, setAdminAction] = useState(null);
  const [showFlex, setShowFlex] = useState(true);

  const toggleShowFlex = () => {
    setShowFlex(!showFlex);
  };

  const toggleSetAdminAction = (value) => {
    setAdminAction(value);
    setShowFlex(false);
  };

  const direction = useBreakpointValue({ base: "column", lg: "row" });
  const heightOfButtons = useBreakpointValue({ base: "300px", lg: "620px" });

  return (
    <>
      <NavBar />
      {showFlex && (
        <Flex direction={direction} justifyContent="space-between" alignItems="center" p={5}>
          <Box w={{ base: "full", lg: "50%" }} p={3}>
            <Button borderRadius="20" onClick={() => toggleSetAdminAction('add')} w="full" h={heightOfButtons}>
              ADD PRODUCTS
            </Button>
          </Box>
          <Box w={{ base: "full", lg: "50%" }} p={3}>
            <Button borderRadius="20" onClick={() => toggleSetAdminAction('edit')} w="full" h={heightOfButtons}>
              EDIT EXISTING PRODUCTS
            </Button>
          </Box>
          <Box w={{ base: "full", lg: "50%" }} p={3}>
            <Button borderRadius="20" onClick={() => toggleSetAdminAction('inventory')} w="full" h={heightOfButtons}>
              MANAGE INVENTORY OF A PRODUCT
            </Button>
          </Box>
        </Flex>
      )}
      {adminAction === 'add' && <ProductManagement />}
      {adminAction === 'edit' && <EditProductManagement />}
      {adminAction === 'inventory' && <AddInventory />}
    </>
  );
};

export default AdminProductsPage;