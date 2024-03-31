import React, { useState } from 'react';
import { Flex, Box, Text, HStack, Alert, AlertIcon, useBreakpointValue, FormControl, FormLabel, Input, Button } from '@chakra-ui/react'

const AddInventory = () => {

  const [inventoryList, setInventorylist] = useState([])
  const [gotProduct, setGotProduct] = useState(false);
  const [productID, setProductID] = useState({
    productID: ""
  });

  const handleChangeGetProduct = (e) => {
    const { name, value } = e.target;
    setProductID(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitGetProductInventory = async (data) => {
    const response = await fetch('http://localhost:3001/getproductinventory', {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const responseFromServer = await response.json();

    const { status, message, products } = responseFromServer;

    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    });

    if ( status == "success") {
      setInventorylist(products)
    }


  }

  const handleGetProduct = async (event) => {
    event.preventDefault();
    await onSubmitGetProduct(productID);
  }

  const [alertInfo, setAlertInfo] = useState({
    isVisible: false,
    status: "",
    message: ""
  });

  const toggleGotProduct = () => {
    toggleGotProduct(!gotProduct);
  }



  const directionInitial = useBreakpointValue({ base: "column" })

  return (
    <>
      {gotProduct ?
        <>

        </>
        :
        <>
          <Flex direction={directionInitial} height="80vh" alignItems="center" justifyContent="center">
            {alertInfo.isVisible && (
              <Alert w={{ base: "85%", lg: "50%" }} status={alertInfo.status}>
                <AlertIcon />
                {alertInfo.message}
              </Alert>
            )}
            <Box as="form" onSubmit={handleGetProduct} w={{ base: "85%", lg: "50%" }} p={5} boxShadow="xl" rounded="md" bg="#F3EEEA">
              <FormControl>
                <FormLabel>Enter Product ID:</FormLabel>
                <Input name="productID" value={productID.productID} onChange={handleChangeGetProduct} borderColor="black" _hover={{ borderColor: "black" }} />
              </FormControl>
              <Button type="submit" color="black" bg="#B0A695" _hover={{ bg: "#776B5D", color: "white" }} w="full" marginTop="4">Submit</Button>
            </Box>
          </Flex>
        </>
      }
    </>
  );
};

export default AddInventory;
