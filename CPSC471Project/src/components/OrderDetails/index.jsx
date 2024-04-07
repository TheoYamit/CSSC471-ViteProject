import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Flex, VStack, Text, Box, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react';

const OrderDetails = () => {

  const { OrderID } = useParams();
  const [orderDetails, setOrderDetails] = useState([])

  useEffect(() => {
    const getOrderDetails = async () => {
      const payload = { orderID: OrderID }
      const response = await fetch('http://localhost:3001/getorderdetails', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const responseFromServer = await response.json();

      const { orderdetails } = responseFromServer;

      setOrderDetails(orderdetails);
    };

    getOrderDetails();
  }, [])

  useEffect(() => {
    console.log(orderDetails);
  }, [orderDetails]);

  return (
    <>
      <Text fontFamily="adineue PRO Bold" textAlign="center" sx={{ paddingTop: "30px" }} fontSize="5xl">Order #{OrderID} Details</Text>
      <Flex
        overflowX="scroll"
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }}
        scrollBehaviour="smooth"
      >
        <VStack w="full" py={10} spacing={4} alignItems="center">
          <Box width="100">
            <Table variant="simple">
              <TableCaption>Order Details</TableCaption>
              <Thead>
                <Tr>
                  <Th fontSize="1xl">ProductID</Th>
                  <Th fontSize="1xl">Name</Th>
                  <Th fontSize="1xl">Size</Th>
                  <Th fontSize="1xl">Quantity</Th>
                  <Th fontSize="1xl">TotalPrice</Th>
                </Tr>
              </Thead>
              <Tbody>
                {orderDetails.map( ({ProductID, Name, Size, Quantity, TotalPrice}) => {
                  return (
                    <Tr>
                      <Td>{ProductID}</Td>
                      <Td>{Name}</Td>
                      <Td>{Size}</Td>
                      <Td>{Quantity}</Td>
                      <Td>{TotalPrice}</Td>
                    </Tr>
                  )
                })};
              </Tbody>
            </Table>
          </Box>
        </VStack>

      </Flex>
    </>
  );
}

export default OrderDetails;