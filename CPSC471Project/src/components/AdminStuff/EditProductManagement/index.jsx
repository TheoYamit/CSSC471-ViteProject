import React, { useState } from 'react';
import './editproductmanagement.css';
import {
  Flex, VStack, Box, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, Button, useBreakpointValue,
  Textarea, Text, NumberInput, NumberInputStepper, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, Select,
  Alert, AlertIcon,
} from '@chakra-ui/react';
import ProductBox from '../../ProductBox';
import ProductBoxNew from '../../ProductBoxNew';
import ProductBoxDiscounted from '../../ProductBoxDiscounted';
import ProductBoxNewDiscounted from '../../ProductBoxNewDiscounted';

const EditProductManagement = () => {

  const [gotProduct, setGotProduct] = useState(false);

  const toggleGotProduct = () => {
    setGotProduct(!gotProduct);
  }

  const [alertInfo, setAlertInfo] = useState({
    isVisible: false,
    status: "",
    message: ""
  });

  const [productDetails, setProductDetails] = useState({
    productID: "",
    nameOfProduct: "",
    descOfProduct: "",
    priceOfProduct: "",
    imageOfProduct: "",
    categoryOfProduct: "",
    genderOfProduct: "",
    isNew: "",
    isDiscounted: ""
  })

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

  const onSubmitGetProduct = async (data) => {
    const response = await fetch('http://localhost:3001/getproduct', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const responseFromServer = await response.json();

    const { status, message, product } = responseFromServer;
    console.log(product);

    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    });

    if (status == "success") {
      toggleGotProduct();
    }

    const [{ ProductID, Name, Description, Price, Image, Category, Gender, IsNew, IsDiscounted }] = product;

    setProductDetails({
      productID: ProductID,
      nameOfProduct: Name,
      descOfProduct: Description,
      priceOfProduct: Price,
      imageOfProduct: Image,
      categoryOfProduct: Category,
      genderOfProduct: Gender,
      isNew: IsNew,
      isDiscounted: IsDiscounted
    });

    console.log(productDetails)

  };

  const handleGetProduct = async (event) => {
    event.preventDefault();
    await onSubmitGetProduct(productID)
  }

  const directionInitial = useBreakpointValue({ base: "column", lg: "column" });
  return (
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
  );
};

export default EditProductManagement;