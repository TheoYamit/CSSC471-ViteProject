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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faPlus, faMinus, faCartShopping } from '@fortawesome/free-solid-svg-icons';

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
  const [sizePressed, setSizePressed] = useState({
    size: null,
    stock: null
  });
  const [numberOfItem, setNumberOfItem] = useState(1);

  const handleSizePress = (size, stock) => {
    setSizePressed({
      size: size,
      stock: stock
    })
  }




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

        const [{ ProductID, Name, Description, Price, Image, Category, Gender, IsNew, IsDiscounted, DiscountedPrice }] = productInfo;
        const arrayBufferView = new Uint8Array(Image.data);
        const blob = new Blob([arrayBufferView], { type: "image/png" });
        const imageUrl = URL.createObjectURL(blob);


        const sizeOrder = ['S', 'M', 'L', 'XL', 'XXL'];
        const sizeOrder2 = ["8", "8.5", "9", "9.5", "10", "10.5", "11", "11.5", "12", "12.5", "13"]

        if (Category == "Clothing") {
          const sortedInventory = updatedSizes.sort((a, b) => {
            return sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
          });

          setInventorylist(sortedInventory)
        } else if (Category == "Shoes") {
          const sortedInventory = updatedSizes.sort((a, b) => {
            return sizeOrder2.indexOf(a.size) - sizeOrder2.indexOf(b.size);
          });
          setInventorylist(sortedInventory)
        }
        else {
          setInventorylist(updatedSizes)
        }

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
    console.log(sizePressed);
  }, [sizePressed]);

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
                  width="25%"
                  height="100px"
                  onClick={() => handleSizePress(item.size, item.quantity)}
                  isDisabled={!item.quantity}
                  bg={sizePressed.size === item.size ? "#776B5D" : "#F3EEEA"}
                >
                  <VStack>
                    <Text color={sizePressed.size === item.size ? "white" : "black"}>{`Size: ${item.size}`}</Text>
                    {item.quantity != 0 ?
                      <Text color={sizePressed.size === item.size ? "white" : "black"}>{`Stock: ${item.quantity}`}</Text>
                      :
                      <Text color="red">SOLD OUT</Text>
                    }
                  </VStack>
                </Button>
              ))}
            </HStack>
            <HStack justifyContent="center" py={10} spacing={4}>
              <Button
                isDisabled={sizePressed.size == null || numberOfItem == 1}
                borderRadius="50%" bg="#B0A695"
                onClick={() => setNumberOfItem(numberOfItem - 1)}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>
              <Text fontSize="2xl">{numberOfItem}</Text>
              <Button
                isDisabled={sizePressed.size == null || sizePressed.stock == numberOfItem}
                borderRadius="50%" bg="#B0A695"
                onClick={() => setNumberOfItem(numberOfItem + 1)}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </HStack>
            <Flex justifyContent="center">
              <Button bg="#EBE3D5" borderRadius="20px" px={10} py={8}>
                <HStack alignItems="center">
                  <FontAwesomeIcon icon={faCartShopping} />
                  <Text>Add to Order</Text>
                </HStack>
              </Button>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </>
  );
};

export default ProductInfo;