import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './productinfo.css';
import {
  Flex, Box, Spacer, HStack, Image, Text, Input, Button, useBreakpointValue
} from '@chakra-ui/react';
import ProductBox from '../ProductBox';
import ProductBoxNew from '../ProductBoxNew';
import ProductBoxDiscounted from '../ProductBoxDiscounted';
import ProductBoxNewDiscounted from '../ProductBoxNewDiscounted';

const ProductInfo = () => {
  const [productDetails, setProductDetails] = useState({
    productID: null,
    nameOfProduct: null,
    descOfProduct: null,
    priceOfProduct: null,
    imageOfProduct: null,
    imageOfProductURL: null,
    categoryOfProduct: null,
    genderOfProduct: null,
    isNew: null,
    isDiscounted: null,
    discountedPrice: null
  })

  let { ProductID } = useParams();

  useEffect(() => {
    const getProduct = async (data) => {
      console.log(data);
      const response = await fetch('http://localhost:3001/getproduct', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({productID: data}),
      });

      const responseFromServer = await response.json();
      const { product } = responseFromServer
      
      const [{ ProductID, Name, Description, Price, Image, Category, Gender, IsNew, IsDiscounted, DiscountedPrice }] = product;
      const arrayBufferView = new Uint8Array(Image.data);
      const blob = new Blob([arrayBufferView], { type: "image/png" });
      const imageURL = URL.createObjectURL(blob);

      setProductDetails({
        productID: ProductID,
        nameOfProduct: Name,
        descOfProduct: Description,
        priceOfProduct: Price,
        imageOfProduct: Image,
        imageOfProductURL: imageURL,
        categoryOfProduct: Category,
        genderOfProduct: Gender,
        isNew: IsNew,
        isDiscounted: IsDiscounted,
        discountedPrice: DiscountedPrice
      })
    }
    getProduct(ProductID);
  }, [ProductID]);

  const direction = useBreakpointValue({ base: "column", lg: "row" });

  const Component = productDetails.isNew == 1
    ? productDetails.isDiscounted == 1 ? ProductBoxNewDiscounted : ProductBoxNew
    : productDetails.isDiscounted == 1 ? ProductBoxDiscounted : ProductBox;

  return (
    <>
      <Flex direction={direction} justifyContent="space-between" alignItems="center" p={5}>
        <Box w={{base: "100%", lg: "50%"}}>
          <Component
            key={productDetails.productID}
            productID={productDetails.productID}
            nameOfProduct={productDetails.nameOfProduct}
            descOfProduct={productDetails.descOfProduct}
            priceOfProduct={productDetails.priceOfProduct}
            imageOfProduct={productDetails.imageOfProductURL}
            categoryOfProduct={productDetails.categoryOfProduct}
            genderOfProduct={productDetails.genderOfProduct}
            isNew={productDetails.isNew}
            isDiscounted={productDetails.isDiscounted}
            previousPrice={productDetails.priceOfProduct}
            discountedPrice={productDetails.discountedPrice}
          >

          </Component>
        </Box>
      </Flex>
    </>
  );
};

export default ProductInfo;