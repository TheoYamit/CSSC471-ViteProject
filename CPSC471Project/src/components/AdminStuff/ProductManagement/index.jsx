import React, { useState } from 'react';
import './productmanagement.css';
import { Flex, VStack, Box, FormControl, FormLabel, FormHelperText, FormErrorMessage, Input, Button, useBreakpointValue, Textarea, Text } from '@chakra-ui/react';
import ProductBox from '../../ProductBox';
import temp from '../../../assets/temp.svg';

const ProductManagement = () => {

  const [productDetails, setProductDetails] = useState({
    productID: "",
    nameOfProduct: "",
    descOfProduct: "",
    priceOfProduct: "",
    imageOfProduct: "",
    categoryOfProduct: "",
    genderOfProduct: ""
  });


  const direction = useBreakpointValue({ base: "column", lg: "row" })
  return (
    <>
      <Flex direction={direction} justifyContent="space-between" alignItems="center" p={5}>
        <Box w={{ base: "75%", lg: "50%" }} p={3}>
          <ProductBox
            productID={productDetails.productID == "" ? "RandomID" : productDetails.productID}
            nameOfProduct={productDetails.nameOfProduct == "" ? <Text>Random Name</Text> : productDetails.nameOfProduct}
            descOfProduct={productDetails.descOfProduct == "" ? <Text>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing 
              Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum
              </Text> : productDetails.descOfProduct}
            priceOfProduct={productDetails.priceOfProduct == "" ? <Text>99999999.99</Text> : productDetails.priceOfProduct}
            imageOfProduct={productDetails.imageOfProduct == "" ? temp : productDetails.imageOfProduct}
            categoryOfProduct={productDetails.categoryOfProduct == "" ? <Text>Some category</Text> : productDetails.categoryOfProduct}
            genderOfProduct={productDetails.genderOfProduct == "" ? <Text>Some gender</Text> : productDetails.genderOfProduct}/>
        </Box>

      </Flex>
    </>
  );
};

export default ProductManagement;