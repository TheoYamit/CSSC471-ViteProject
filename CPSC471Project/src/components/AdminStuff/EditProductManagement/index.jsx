import React, { useState } from 'react';
import './editproductmanagement.css';
import {
  Flex, VStack, HStack, Radio, Box, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, Button, useBreakpointValue,
  Textarea, Text, NumberInput, NumberInputStepper, NumberInputField, NumberIncrementStepper, NumberDecrementStepper, Select,
  Alert, AlertIcon,
} from '@chakra-ui/react';
import ProductBox from '../../ProductBox';
import ProductBoxNew from '../../ProductBoxNew';
import ProductBoxDiscounted from '../../ProductBoxDiscounted';
import ProductBoxNewDiscounted from '../../ProductBoxNewDiscounted';

const EditProductManagement = () => {

  const [gotProduct, setGotProduct] = useState(false);
  const [productIsNew, setProductIsNew] = useState(false);
  const [productIsDiscounted, setProductIsDiscounted] = useState(false);
  const [file, setFile] = useState(false);

  const toggleGotProduct = () => {
    setGotProduct(!gotProduct);
  }

  const toggleProductIsNew = () => {
    setProductIsNew(!productIsNew);
  }

  const toggleProductIsDiscounted = () => {
    setProductIsDiscounted(!productIsDiscounted);
  }

  const toggleFile = () => {
    setFile(!file);
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
    imageOfProductURL: "",
    categoryOfProduct: "",
    genderOfProduct: "",
    isNew: null,
    isDiscounted: null,
    previousPrice: null,
    discountedPrice: null

  });

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

    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    });

    if (status == "success") {
      const [{ ProductID, Name, Description, Price, Image, Category, Gender, IsNew, IsDiscounted }] = product;
      const arrayBufferView = new Uint8Array(Image.data);
      const blob = new Blob([arrayBufferView], { type: "image/png" });
      const imageUrl = URL.createObjectURL(blob);
      setProductDetails({
        productID: ProductID,
        nameOfProduct: Name,
        descOfProduct: Description,
        priceOfProduct: Price,
        imageOfProduct: Image,
        imageOfProductURL: imageUrl,
        categoryOfProduct: Category,
        genderOfProduct: Gender,
        isNew: IsNew,
        isDiscounted: IsDiscounted,
        previousPrice: Price
      });

      if (IsNew == 1) {
        toggleProductIsNew();
      }

      if (IsDiscounted == 1) {
        toggleProductIsDiscounted();
      }

    }

    setTimeout(() => {
      toggleGotProduct()
      setAlertInfo({
        isVisible: false,
        status: "",
        message: ""
      })
    }, 3000);
  };

  const handleGetProduct = async (event) => {
    event.preventDefault();
    await onSubmitGetProduct(productID)
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProductDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleInputChangeForNewSale = (e) => {
    let { name, value } = e.target;
    value = parseInt(value);
    setProductDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      toggleFile();
      const fileURL = URL.createObjectURL(file);
      setProductDetails(prevState => ({
        ...prevState,
        imageOfProduct: file,
        imageOfProductURL: fileURL
      }));
    }
  }

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('productID', productDetails.productID);
    formData.append('nameOfProduct', productDetails.nameOfProduct);
    formData.append('descOfProduct', productDetails.descOfProduct);
    formData.append('priceOfProduct', productDetails.priceOfProduct);
    
    if (file) {
      formData.append('imageOfProduct', productDetails.imageOfProduct);
    }
    formData.append('categoryOfProduct', productDetails.categoryOfProduct);
    formData.append('genderOfProduct', productDetails.genderOfProduct);
    formData.append('isNew', productDetails.isNew);
    formData.append('isDiscounted', productDetails.isDiscounted);
    formData.append('discountedPrice', productDetails.discountedPrice);

    const response = await fetch('http://localhost:3001/editproduct', {
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
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit(productDetails)
  }

  const directionInitial = useBreakpointValue({ base: "column", lg: "column" });
  const direction = useBreakpointValue({ base: "column", lg: "row" });
  return (
    <>
      {gotProduct ?
        <>
          <Flex direction={direction} justifyContent="space-between" alignItems="center" p={5}>
            {console.log(productDetails)}
            <Box w={{ base: "85%", lg: "50%" }} p={5}>
              {productDetails.isNew === 0 && productDetails.isDiscounted === 0 &&
                <>
                  <ProductBox
                    productID={productDetails.productID}
                    nameOfProduct={productDetails.nameOfProduct}
                    descOfProduct={productDetails.descOfProduct}
                    priceOfProduct={productDetails.priceOfProduct}
                    imageOfProduct={productDetails.imageOfProductURL}
                    categoryOfProduct={productDetails.categoryOfProduct}
                    genderOfProduct={productDetails.genderOfProduct} />
                </>
              }
              {productDetails.isNew === 1 && productDetails.isDiscounted === 0 &&
                <>
                  <ProductBoxNew
                    productID={productDetails.productID}
                    nameOfProduct={productDetails.nameOfProduct}
                    descOfProduct={productDetails.descOfProduct}
                    priceOfProduct={productDetails.priceOfProduct}
                    imageOfProduct={productDetails.imageOfProductURL}
                    categoryOfProduct={productDetails.categoryOfProduct}
                    genderOfProduct={productDetails.genderOfProduct}
                  />
                </>
              }
              {productDetails.isNew === 0 && productDetails.isDiscounted === 1 &&
                <>
                  <ProductBoxDiscounted
                    productID={productDetails.productID}
                    nameOfProduct={productDetails.nameOfProduct}
                    descOfProduct={productDetails.descOfProduct}
                    priceOfProduct={productDetails.priceOfProduct}
                    imageOfProduct={productDetails.imageOfProductURL}
                    categoryOfProduct={productDetails.categoryOfProduct}
                    genderOfProduct={productDetails.genderOfProduct}
                    previousPrice={productDetails.previousPrice}
                    discountedPrice={productDetails.discountedPrice}
                  />
                </>
              }
              {productDetails.isNew === 1 && productDetails.isDiscounted === 1 &&
                <>
                  <ProductBoxNewDiscounted
                    productID={productDetails.productID}
                    nameOfProduct={productDetails.nameOfProduct}
                    descOfProduct={productDetails.descOfProduct}
                    priceOfProduct={productDetails.priceOfProduct}
                    imageOfProduct={productDetails.imageOfProductURL}
                    categoryOfProduct={productDetails.categoryOfProduct}
                    genderOfProduct={productDetails.genderOfProduct}
                    previousPrice={productDetails.previousPrice}
                    discountedPrice={productDetails.discountedPrice}
                  />
                </>
              }
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
                <Input value={productDetails.productID} readonly />
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
              For the next two questions: (0 - No | 1 - Yes)
              <HStack>
                <FormControl py={4}>
                  <FormLabel>Is Product New?</FormLabel>
                  <Select name="isNew" onChange={handleInputChangeForNewSale} placeholder="Select if product is new...">
                    <option>0</option>
                    <option>1</option>
                  </Select>
                </FormControl>
                <FormControl py={4}>
                  <FormLabel>Is Product Discounted:</FormLabel>
                  <Select name="isDiscounted" onChange={handleInputChangeForNewSale} placeholder="Select if product is discounted...">
                    <option>0</option>
                    <option>1</option>
                  </Select>
                </FormControl>
              </HStack>
              <FormControl display={productDetails.isDiscounted != 1 ? "none" : "null"} py={4}>
                <FormLabel>Discounted Price:</FormLabel>
                <NumberInput name="discountedPrice" value={productDetails.discountedPrice} onChange={(valueString) => setProductDetails(prevState => ({ ...prevState, discountedPrice: valueString }))} defaultValue={15} precision={2} step={0.2}>
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Button type="submit" w="full">Add Edited Product To Database</Button>
            </Box>
          </Flex>
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

export default EditProductManagement;