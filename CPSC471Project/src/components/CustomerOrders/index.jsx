import React, { useState, useEffect } from 'react';
import { Flex, Text, Box, VStack, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react';
import { useAuth } from '../../contexts/Authorization/Authorized';

const CustomerOrders = () => {

  const { userDetails } = useAuth();
  const [customerOrders, setCustomerOrders] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      const payload = { Username: userDetails.Username }
      const response = await fetch('http://localhost:3001/getcustomerorders', {
        method: "POST",
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      })

      const responseFromServer = await response.json();
      const { orders } = responseFromServer;
      console.log(orders);

      for (let index = 0; index < orders.length; index++) {
        let date = orders[index].DateOfOrder;
        console.log(date);
        let datePart = date.split("T")[0];
        orders[index].DateOfOrder = datePart;
      }

      console.log(orders);


      setCustomerOrders(orders);
    }

    getOrders();
  }, [])

  useEffect(() => {
    console.log(customerOrders);
  }, [customerOrders])


  return (
    <>
      <Text fontFamily="adineue PRO Bold" textAlign="center" sx={{ paddingTop: "30px" }} fontSize="5xl">Your Orders:</Text>
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
          <Box width="100%">
            <Table variant="simple">
              <TableCaption>All Orders</TableCaption>
              <Thead>
                <Tr>
                  <Th fontSize="1xl">OrderID</Th>
                  <Th fontSize="1xl">Name</Th>
                  <Th fontSize="1xl">Address</Th>
                  <Th fontSize="1xl">Country</Th>
                  <Th fontSize="1xl">Postal</Th>
                  <Th fontSize="1xl">Date Placed</Th>
                  <Th fontSize="1xl">PaymentID</Th>
                  <Th fontSize="1xl">Status</Th>
                  <Th fontSize="1xl">Expected Days</Th>
                </Tr>
              </Thead>
              <Tbody>
                {customerOrders.map(({ OrderID, Name, Address, Country, Postal, DateOfOrder, PaymentID, Status, Processed, ExpectedDays }) => {
                  return (
                    <Tr>
                      <Td>{OrderID}</Td>
                      <Td>{Name}</Td>
                      <Td>{Address}</Td>
                      <Td>{Country}</Td>
                      <Td>{Postal}</Td>
                      <Td>{DateOfOrder}</Td>
                      <Td>{PaymentID}</Td>
                      <Td>{Status}</Td>
                      <Td>{ExpectedDays}</Td>
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
};

export default CustomerOrders;