import React, { useState } from 'react';
import {
  Flex, Box, Text, VStack, Alert, AlertIcon, useBreakpointValue, FormControl, FormLabel,
  Input, Button, NumberInput, NumberInputStepper, NumberInputField, NumberIncrementStepper, NumberDecrementStepper,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from '@chakra-ui/react';
import ProductBox from '../../ProductBox';
import ProductBoxNew from '../../ProductBoxNew'
import ProductBoxDiscounted from '../../ProductBoxDiscounted';
import ProductBoxNewDiscounted from '../../ProductBoxNewDiscounted';

const AddInventory = () => {

  const [inventoryList, setInventorylist] = useState([])
  const [gotProduct, setGotProduct] = useState(false);
  const [productID, setProductID] = useState({
    productID: ""
  });

  const initialShoeSizes = [
    { size: '8', quantity: 0 },
    { size: '8.5', quantity: 0 },
    { size: '9', quantity: 0 },
    { size: '9.5', quantity: 0 },
    { size: '10', quantity: 0 },
    { size: '10.5', quantity: 0 },
    { size: '11', quantity: 0 },
    { size: '11.5', quantity: 0 },
    { size: '12', quantity: 0 },
    { size: '12.5', quantity: 0 },
    { size: '13', quantity: 0 },
  ];

  const initialClothingSizes = [
    { size: "S", quantity: 0 },
    { size: "M", quantity: 0 },
    { size: "L", quantity: 0 },
    { size: "XL", quantity: 0 },
    { size: "XXL", quantity: 0 },
  ];

  const initialBeautySizes = [
    { size: "Regular", quantity: 0 }
  ]

  const [clothingSize, setClothingSize] = useState(initialClothingSizes)
  const [sizes, setSizes] = useState(initialShoeSizes);
  const [beautySize, setBeautySize] = useState(initialBeautySizes);

  const handleClothingSizeChange = (size, newQuantity) => {
    setClothingSize(clothingSize.map(s => s.size === size ? { ...s, quantity: parseInt(newQuantity) || 0 } : s));
  };


  const handleSizeChange = (size, newQuantity) => {
    setSizes(sizes.map(s => s.size === size ? { ...s, quantity: parseInt(newQuantity) || 0 } : s));
  };

  const handleBeautyChange = (size, newQuantity) => {
    setBeautySize(beautySize.map(s => s.size === size ? { ...s, quantity: parseInt(newQuantity) || 0 } : s));
  }

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
    previousPrice: null,
    discountedPrice: null
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

    const { status, message, products, productInfo } = responseFromServer;

    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    });

    if (status == "success") {
      setInventorylist(products);

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
      if (products.length > 0) {
        console.log(products);
        const updatedSizes = products.map(product => ({
          size: product.Size,
          quantity: product.Stock,
        }));

        if (Category === "Clothing") {
          setClothingSize(updatedSizes);
        } else if (Category === "Shoes") {
          setSizes(updatedSizes);
        } else if (Category === "Beauty Products") {
          setBeautySize(updatedSizes);
        }
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


  }

  const handleGetProduct = async (event) => {
    event.preventDefault();
    await onSubmitGetProductInventory(productID);
  }

  const [alertInfo, setAlertInfo] = useState({
    isVisible: false,
    status: "",
    message: ""
  });

  const toggleGotProduct = () => {
    setGotProduct(!gotProduct);
  };

  const onSubmitInventory = async (data) => {
    console.log(data);
    const inventoryToSend = {
      productID: productDetails.productID,
      category: productDetails.categoryOfProduct,
      inventoryData: data
    }

    const response = await fetch('http://localhost:3001/addinventory', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(inventoryToSend)
    });

    const responseFromServer = await response.json();
    console.log(responseFromServer);
    const { status, message } = responseFromServer;

    console.log(status);
    console.log(message);

    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    })

  };

  const handleOnSubmitClothing = async (event) => {
    event.preventDefault();
    await onSubmitInventory(clothingSize)
  };
  const handleOnSubmitShoes = async (event) => {
    event.preventDefault();
    await onSubmitInventory(sizes)
  };
  const handleOnSubmitBeauty = async (event) => {
    event.preventDefault();
    await onSubmitInventory(beautySize)
  };



  const directionInitial = useBreakpointValue({ base: "column" })
  const direction = useBreakpointValue({ base: "column", lg: "row" })
  const Component = productDetails.isNew == 1
    ? productDetails.isDiscounted == 1 ? ProductBoxNewDiscounted : ProductBoxNew
    : productDetails.isDiscounted == 1 ? ProductBoxDiscounted : ProductBox;


  return (
    <>
      {gotProduct ?
        <>
          <Flex direction={direction} justifyContent="space-between" alignItems="start" p={5}>
            <Box w={{ base: "100%", lg: "50%" }} p={3}>
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

            {productDetails.categoryOfProduct == "Clothing" &&
              <Box as="form" onSubmit={handleOnSubmitClothing} w={{ base: "100%", lg: "50%" }} p={3}  >
                {alertInfo.isVisible && (
                  <Alert w="full" status={alertInfo.status}>
                    <AlertIcon />
                    {alertInfo.message}
                  </Alert>
                )}

                <VStack align="stretch">
                  <Text fontFamily="Adineue PRO Bold" fontSize="6xl">Inventory for #{productDetails.productID}</Text>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Size</Th>
                        <Th>Quantity</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {clothingSize.map(({ size, quantity }) => (
                        <Tr key={size}>
                          <Td>{size}</Td>
                          <Td>
                            <NumberInput value={quantity} min={0} onChange={(valueString) => handleClothingSizeChange(size, valueString)}>
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <Button type="submit" w="full">Update Inventory of Product</Button>
                </VStack>
              </Box>}

            {productDetails.categoryOfProduct == "Shoes" &&
              <Box as="form" onSubmit={handleOnSubmitShoes} w={{ base: "100%", lg: "50%" }} p={3}  >
                {alertInfo.isVisible && (
                  <Alert w="full" status={alertInfo.status}>
                    <AlertIcon />
                    {alertInfo.message}
                  </Alert>
                )}
                <VStack align="stretch">
                  <Text fontFamily="Adineue PRO Bold" fontSize="6xl">Inventory for #{productDetails.productID}</Text>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Size</Th>
                        <Th>Quantity</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {sizes.map(({ size, quantity }) => (
                        <Tr key={size}>
                          <Td>{size}</Td>
                          <Td>
                            <NumberInput value={quantity} min={0} onChange={(valueString) => handleSizeChange(size, valueString)}>
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                  <Button type="submit" w="full">Update Inventory of Product</Button>
                </VStack>
              </Box>}

            {productDetails.categoryOfProduct == "Beauty Products" &&
              <Box as="form" onSubmit={handleOnSubmitBeauty} w={{ base: "100%", lg: "50%" }} p={3}>
                {alertInfo.isVisible && (
                  <Alert w="full" status={alertInfo.status}>
                    <AlertIcon />
                    {alertInfo.message}
                  </Alert>
                )}
                <VStack align="stretch">
                  <Text fontFamily="Adineue PRO Bold" fontSize="6xl">Inventory for #{productDetails.productID}</Text>
                  <Table variant="simple">
                    <Thead>
                      <Tr>
                        <Th>Size</Th>
                        <Th>Quantity</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {beautySize.map(({ size, quantity }) => (
                        <Tr key={size}>
                          <Td>{size}</Td>
                          <Td>
                            <NumberInput value={quantity} min={0} onChange={(valueString) => handleBeautyChange(size, valueString)}>
                              <NumberInputField />
                              <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                              </NumberInputStepper>
                            </NumberInput>
                          </Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </VStack>
                <Button type="submit" w="full">Update Inventory of Product</Button>

              </Box>

            }
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

export default AddInventory;
