import React, { useState } from 'react';
import './productmanagement.css';
import {
  Flex, VStack, Box, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, Button, useBreakpointValue,
  Textarea, Text, NumberInput, NumberInputStepper, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, Select,
  Alert, AlertIcon
} from '@chakra-ui/react';
import ProductBox from '../../ProductBox';
import temp from '../../../assets/temp.svg';

const ProductManagement = () => {

  const [productDetails, setProductDetails] = useState({
    productID: "",
    nameOfProduct: "",
    descOfProduct: "",
    priceOfProduct: "",
    imageOfProduct: "",
    imageOfProductURL: "",
    categoryOfProduct: "",
    genderOfProduct: ""
  });

  const [alertInfo, setAlertInfo] = useState({ isVisible: false, status: "", message: "" })

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const fileURL = URL.createObjectURL(file);
      setProductDetails(prevState => ({
        ...prevState,
        imageOfProduct: file,
        imageOfProductURL: fileURL
      }));
    }
  }

  const formData = new FormData();
  formData.append('productID', productDetails.productID);
  formData.append('nameOfProduct', productDetails.nameOfProduct);
  formData.append('descOfProduct', productDetails.descOfProduct);
  formData.append('priceOfProduct', productDetails.priceOfProduct);
  formData.append('imageOfProduct', productDetails.imageOfProduct);
  formData.append('categoryOfProduct', productDetails.categoryOfProduct);
  formData.append('genderOfProduct', productDetails.genderOfProduct);


  const onSubmit = async (data) => {
    console.log(data)
    const response = await fetch('http://localhost:3001/addproduct', {
      method: "POST",
      body: formData,
    });

    const responseFromServer = await response.json();

    const { status, message } = responseFromServer;
    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    })
    console.log(alertInfo);
  };

  const handleSubmit = async (event) => {
      event.preventDefault();
  
      await onSubmit(productDetails)
    }

  const direction = useBreakpointValue({ base: "column", lg: "row" })
  return (
    <>
      <Flex direction={direction} justifyContent="space-between" alignItems="center" p={5}>
        <Box w={{ base: "85%", lg: "50%" }} p={3}>
          <ProductBox
            productID={productDetails.productID == "" ? "RandomID" : productDetails.productID}
            nameOfProduct={productDetails.nameOfProduct == "" ? <Text>Random Name</Text> : productDetails.nameOfProduct}
            descOfProduct={productDetails.descOfProduct == "" ? <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing
              Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
            </Text> : productDetails.descOfProduct}
            priceOfProduct={productDetails.priceOfProduct == "" ? <Text>99999999.99</Text> : productDetails.priceOfProduct}
            imageOfProduct={productDetails.imageOfProductURL == "" ? temp : productDetails.imageOfProductURL}
            categoryOfProduct={productDetails.categoryOfProduct == "" ? <Text>Some category</Text> : productDetails.categoryOfProduct}
            genderOfProduct={productDetails.genderOfProduct == "" ? <Text>Some gender</Text> : productDetails.genderOfProduct} />
        </Box>

        <Box as="form" onSubmit={handleSubmit} w={{ base: "85%", lg: "50%" }} p={3}>
          {alertInfo.isVisible && (
            <Alert w="full" status={alertInfo.status}>
              <AlertIcon />
              {alertInfo.message}
            </Alert>
          )}
          <FormControl py={4}>
            <FormLabel>ProductID:</FormLabel>
            <Input name="productID" value={productDetails.productID} onChange={handleInputChange} />
          </FormControl>

          <FormControl py={4}>
            <FormLabel>Name of Product:</FormLabel>
            <Input name="nameOfProduct" value={productDetails.nameOfProduct} onChange={handleInputChange}></Input>
          </FormControl>

          <FormControl py={4}>
            <FormLabel>Description of Product:</FormLabel>
            <Textarea name="descOfProduct" value={productDetails.descOfProduct} onChange={handleInputChange}></Textarea>
          </FormControl>

          <FormControl py={4}>
            <FormLabel>Price of Product:</FormLabel>
            <NumberInput name="priceOfProduct" value={productDetails.priceOfProduct} onChange={(valueString) => setProductDetails(prevState => ({ ...prevState, priceOfProduct: valueString }))} defaultValue={15} precision={2} step={0.2}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl py={4}>
            <FormLabel htmlFor="file-upload">Image of Product (200 x 200):</FormLabel>
            <Input
              onChange={handleFileChange}
              id="file-upload"
              type="file"
              accept="image/*"
              py={1}>
            </Input>
          </FormControl>

          <FormControl py={4}>
            <FormLabel>Category of Product:</FormLabel>
            <Select name="categoryOfProduct" onChange={handleInputChange} placeholder="Select Category">
              <option>Clothing</option>
              <option>Shoes</option>
              <option>Beauty Products</option>
            </Select>
          </FormControl>

          <FormControl py={4}>
            <FormLabel>Gender for the Product:</FormLabel>
            <Select name="genderOfProduct" onChange={handleInputChange} placeholder="Select Gender">
              <option>Male</option>
              <option>Female</option>
              <option>Unisex</option>
            </Select>
          </FormControl>

          <Button type="submit" w="full">Add Product to Database</Button>
        </Box>
      </Flex>
    </>
  );
};

export default ProductManagement;