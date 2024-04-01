import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './productinfo.css';
import {
  Flex, Box, VStack, HStack, Spacer, Image, Text, Input, Button, useBreakpointValue
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

  const [inventoryList, setInventorylist] = useState();

  let { ProductID } = useParams();

  useEffect(() => {
    const getProductInventory = async (data) => {
      const response = await fetch('http://localhost:3001/getproductinventory', {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ productID: data }),
      });

      const responseFromServer = await response.json();

      const { status, message, products, productInfo } = responseFromServer;

      if (status == "success") {
        console.log(products)
        const updatedSizes = products.map(product => ({
          size: product.Size,
          quantity: product.Stock,
        }));

        const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL'];

        const sortedInventory = updatedSizes.sort((a, b) => {
          return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
        });
        setInventorylist(sortedInventory);


        const [{ ProductID, Name, Description, Price, Image, Category, Gender, IsNew, IsDiscounted, DiscountedPrice }] = productInfo;
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
          previousPrice: Price,
          discountedPrice: DiscountedPrice
        });

      }

    }

    getProductInventory(ProductID);

  }, [ProductID]);

  useEffect(() => {
    console.log(inventoryList);
  }, [inventoryList]);

  const direction = useBreakpointValue({ base: "column", lg: "row" });

  const Component = productDetails.isNew == 1
    ? productDetails.isDiscounted == 1 ? ProductBoxNewDiscounted : ProductBoxNew
    : productDetails.isDiscounted == 1 ? ProductBoxDiscounted : ProductBox;

  return (
    <>
      <Flex direction={direction} justifyContent="space-between" alignItems="start" p={5}>
        <Box w={{ base: "100%", lg: "50%" }}>
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

        <Box w={{ base: "100%", lg: "50%" }} px={3}>
          <VStack align="stretch" spacing={4}>
            <Text fontSize="6xl" fontFamily="adineue PRO Bold">{productDetails.nameOfProduct}</Text>
            <Text fontSize="3xl">Select size:</Text>
            <HStack wrap="wrap" spacing={4}>
              {inventoryList && inventoryList.map((item, index) => (
                <Button
                  key={index}
                  size="md"
                  width="30%"
                  height="100px"
                  onClick={() => console.log(`Selected size: ${item.Size}, Stock: ${item.Stock}`)}
                >
                  <VStack>
                    <Text>{`Size: ${item.size}`}</Text>
                    <Text>{`Stock: ${item.quantity}`}</Text>
                  </VStack>
                </Button>
              ))}
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default ProductInfo;