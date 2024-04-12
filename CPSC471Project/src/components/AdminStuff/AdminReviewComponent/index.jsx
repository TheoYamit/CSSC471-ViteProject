import React, { useState, useEffect } from 'react';

import {
  Flex, Text, Box, Table, Thead, Tbody, Tfoot, Tr, Th,
  Td, TableCaption, TableContainer, useBreakpointValue
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';

const AdminReviewComponent = () => {
  const direction = useBreakpointValue({ base: "column", lg: "row" });

  const [listOfProducts, setListOfProducts] = useState([]);
  const [currentProduct, setCurrentProduct] = useState();
  const [listOfReviews, setListOfReviews] = useState([]);

  const getProducts = async () => {
    const response = await fetch('http://localhost:3001/getproductandname', {
      method: "GET"
    })

    const responseFromServer = await response.json();
    const { products } = responseFromServer;
    console.log(products);

    setListOfProducts(products);
  }

  const getProductReviews = async (ProductID) => {
    const payload = { productID: ProductID };
    const response = await fetch('http://localhost:3001/getreviews', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const responseFromServer = await response.json();

    const { listofreviews } = responseFromServer;
    console.log(listofreviews);

    for (let index = 0; index < listofreviews.length; index++) {
      let date = listofreviews[index].DateCreated;
      console.log(date);
      let datePart = date.split("T")[0];
      listofreviews[index].DateCreated = datePart;
    }

    setListOfReviews(listofreviews);
  };

  // When admin clicks on a product
  const handleOnClick = (ProductID) => {
    console.log(ProductID);
    setCurrentProduct(ProductID);
    getProductReviews(ProductID);
  }

  useEffect(() => {
    getProducts();
  }, []);

  // For debugging;
  useEffect(() => {
    console.log(listOfProducts);
  }, []);

  return (
    <>
      <Flex direction={direction} justifyContent="space-between" alignContent="start" alignItems={{ base: "center", lg: "flex-start" }} p={5}>
        <Box w={{ base: "95%", lg: "50%" }}>
          <Text fontSize="3xl" textAlign="center" fontFamily="adineue PRO Bold">Products</Text>
          <TableContainer>
            <Table>
              <Thead>
                <Tr>
                  <Th fontSize="1xl">ProductID</Th>
                  <Th fontSize="1xl">Name</Th>
                  <Th fontSize="1xl">Category</Th>
                  <Th fontSize="1xl">Gender</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listOfProducts.map(({ ProductID, Name, Category, Gender }) => {
                  return (
                    <Tr>
                      <Th sx={{ cursor: "pointer" }} _hover={{ bg: "#D3D3D3" }} onClick={() => handleOnClick(ProductID)}>{ProductID}</Th>
                      <Th>{Name}</Th>
                      <Th>{Category}</Th>
                      <Th>{Gender}</Th>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
        <Box w={{ base: "95%", lg: "50%" }}>
          <Text fontSize="3xl" textAlign="center" fontFamily="adineue PRO Bold">Reviews for Order #{currentProduct}</Text>
          <TableContainer
            overflowX="scroll"
            sx={{
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              '-ms-overflow-style': 'none',
              'scrollbar-width': 'none',
            }}
          >
            <Table>
              <Thead>
                <Tr>
                  <Th fontSize="1xl">Username</Th>
                  <Th fontSize="1xl">Review</Th>
                  <Th fontSize="1xl">Rating</Th>
                  <Th fontSize="1xl">Date</Th>
                </Tr>
              </Thead>
              <Tbody>
                {listOfReviews.map(({ Username, Review, Rating, DateCreated }) => {
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
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>

      </Flex>

    </>
  );
};

export default AdminReviewComponent;