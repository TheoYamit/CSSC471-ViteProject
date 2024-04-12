import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './productinfo.css';
import {
  Flex, Box, VStack, HStack, Text, Button, useBreakpointValue,
  Alert, AlertIcon, Table, Thead, Tbody, Tfoot, Tr, Th, Td,
  TableCaption, TableContainer, Input, Textarea,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import ProductBox from '../ProductBox';
import ProductBoxNew from '../ProductBoxNew';
import ProductBoxDiscounted from '../ProductBoxDiscounted';
import ProductBoxNewDiscounted from '../ProductBoxNewDiscounted';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus, faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useOrder } from '../../contexts/Order/Order';
import { useAuth } from '../../contexts/Authorization/Authorized'

const ProductInfo = () => {
  let { ProductID } = useParams();

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

  const [alertInfo, setAlertInfo] = useState({
    isVisible: false,
    status: "",
    message: ""
  });

  const [alertInfo2, setAlertInfo2] = useState({
    isVisible: false,
    status: "",
    message: "",
  })

  const [numberOfItem, setNumberOfItem] = useState(1);
  const { addToOrder } = useOrder();
  const { isAuthenticated, userDetails } = useAuth();

  const [charCount, setCharCount] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const [userReview, setUserReview] = useState({
    Username: userDetails.Username,
    ProductID: ProductID,
    Review: 1,
    DateCreated: null,
    Rating: null,
  });

  const [listOfReviews, setListOfReviews] = useState([]);

  const handleSizePress = (size, stock) => {
    setSizePressed({
      size: size,
      stock: stock
    })
  }

  const handleAddToOrder = () => {
    const product = {
      ProductID: productDetails.productID,
      Name: productDetails.nameOfProduct,
      TotalPrice: productDetails.isDiscounted == 1 ? (productDetails.discountedPrice * numberOfItem).toFixed(2) : (productDetails.priceOfProduct * numberOfItem).toFixed(2),
      Size: sizePressed.size,
      Quantity: numberOfItem,
      ProductInfo: productDetails
    }
    addToOrder(product)
    setAlertInfo({
      isVisible: true,
      status: "success",
      message: "Product added to order!"
    })
  };

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

  const getReviews = async () => {
    const payload = { productID: ProductID }

    const response = await fetch('http://localhost:3001/getreviews', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const responseFromServer = await response.json();
    const { listofreviews } = responseFromServer;

    for (let index = 0; index < listofreviews.length; index++) {
      let date = listofreviews[index].DateCreated;
      console.log(date);
      let datePart = date.split("T")[0];
      listofreviews[index].DateCreated = datePart;
    }

    setListOfReviews(listofreviews);
  }

  useEffect(() => {
    getReviews();
  }, [])

  const handleReviewTextChange = (event) => {
    const { name, value } = event.target;

    if (value.length <= 500) {
      setUserReview(prevState => ({
        ...prevState,
        [name]: value
      }));
      setCharCount(value.length);
    }
  }

  const handleRating = (rating) => {
    setUserReview({ ...userReview, Rating: rating });
  };

  const handleMouseEnter = (rating) => {
    setHoverRating(rating);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const handleReviewOnSubmit = async (data) => {
    const payload = {
      Username: userDetails.Username,
      ProductID: ProductID,
      Review: userReview.Review,
      DateCreated: new Date(),
      Rating: userReview.Rating
    }

    console.log(payload);

    const response = await fetch('http://localhost:3001/addreview', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const responseFromServer = await response.json();

    const { status, message } = responseFromServer;

    setAlertInfo2({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    });

    if (status == "success") {
      setTimeout(() => {
        setAlertInfo2({
          isVisible: false,
          status: "",
          message: ""
        })
      }, 3000)
    }
  }

  const handleReview = async (event) => {
    event.preventDefault();

    await handleReviewOnSubmit(userReview);
  }

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
          {alertInfo.isVisible &&
            <Alert status={alertInfo.status}>
              <AlertIcon />
              {alertInfo.message}
            </Alert>
          }

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
              <VStack>
                <Text>${productDetails.isDiscounted == 1 ? (productDetails.discountedPrice * numberOfItem).toFixed(2) : (productDetails.priceOfProduct * numberOfItem).toFixed(2)}</Text>
                <Button onClick={handleAddToOrder} isDisabled={sizePressed.size == null || !isAuthenticated} bg="#EBE3D5" borderRadius="20px" px={10} py={8}>
                  <HStack alignItems="center">
                    <FontAwesomeIcon icon={faCartShopping} />
                    <Text>Add to Order</Text>
                  </HStack>
                </Button>
              </VStack>
            </Flex>
          </VStack>
        </Box>
      </Flex>

      <Flex direction="column" p={5}>
        <Text fontSize="4xl" fontFamily="adineue PRO Bold">Reviews</Text>
        <TableContainer
          overflowX="scroll"
          sx={{
            '&::-webkit-scrollbar': {
              display: 'none',
            },
            '-ms-overflow-style': 'none',
            'scrollbar-width': 'none',
          }}
          scrollBehaviour="smooth">
          <Table>
            <Thead>
              <Tr>
                <Th w="20%">Username</Th>
                <Th>Review</Th>
                <Th w="20%">Rating</Th>
                <Th w="20%">Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {listOfReviews == [] ?
                <Text>No reviews</Text> :
                listOfReviews.map(({ Username, Review, DateCreated, Rating }) => {
                  return (
                    <Tr>
                      <Th>{Username}</Th>
                      <Th>{Review}</Th>
                      <Th>
                        <Box>
                          {[1, 2, 3, 4, 5].map((star) => (
                            <StarIcon
                              key={star}
                              color={star <= Rating ? "yellow.500" : "gray.300"}
                              boxSize={6}
                            />
                          ))}

                        </Box>
                      </Th>
                      <Th>{DateCreated}</Th>
                    </Tr>
                  )
                })}
            </Tbody>
          </Table>
        </TableContainer>
        <Box as="form" onSubmit={handleReview}>
          <Text fontFamily="adineue PRO Bold" sx={{ marginTop: "20" }}>Submit your own review:</Text>
          {alertInfo2.isVisible &&
            <Alert status={alertInfo2.status}>
              <AlertIcon />
              {alertInfo2.message}
            </Alert>
          }
          <Text>Review</Text>
          <Textarea name="Review" value={userReview.Review} onChange={handleReviewTextChange} />
          <Box textAlign="right" mt={2}>
            <Text color="black">{charCount}/500</Text>
          </Box>
          <Box>
            <Text>Rating</Text>
            <Box display="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  onClick={() => handleRating(star)}
                  onMouseEnter={() => handleMouseEnter(star)}
                  onMouseLeave={handleMouseLeave}
                  color={(hoverRating || userReview.Rating) >= star ? "yellow.400" : "gray.300"}
                  cursor="pointer"
                  boxSize={6}
                />
              ))}
            </Box>
          </Box>
          <Button sx={{ marginTop: "5" }} type="submit">Submit Review</Button>
        </Box>
      </Flex >

    </>
  );
};

export default ProductInfo;