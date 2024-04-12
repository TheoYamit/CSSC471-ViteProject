import React, { useState, useEffect } from 'react';
import {
  Flex, Select, Text, Box, VStack, Button, useBreakpointValue,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer
} from '@chakra-ui/react';

const ManageOrders = () => {

  const [users, setUsers] = useState([]);
  const direction = useBreakpointValue({ base: "column", lg: "row" });
  const [currentOrder, setCurrentOrder] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [currentOrderDetails, setCurrentOrderDetails] = useState([]);

  useEffect(() => {
    const getUsers = async () => {
      const response = await fetch('http://localhost:3001/getuserswithorders', {
        method: "GET",
      });
      const responseFromServer = await response.json();
      const { listofusers } = responseFromServer;
      setUsers(listofusers);
    }
    getUsers();
  }, []);


  // Debugging stuff
  useEffect(() => {
    console.log(users);
  }, [users])

  useEffect(() => {
    console.log(currentOrder)
  }, [currentOrder])

  useEffect(() => {
    console.log(currentOrderDetails)
  }, [currentOrderDetails])

  const getOrderDetails = async (OrderID) => {
    console.log("OrderID to send: ", OrderID);
    const payload = { orderID: OrderID }
    const response = await fetch('http://localhost:3001/getorderdetails', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const responseFromServer = await response.json();

    const { orderdetails } = responseFromServer;

    setCurrentOrderDetails(orderdetails);
  }

  const handleOrderClick = (OrderID, index) => {
    console.log(OrderID);
    setCurrentOrder(OrderID);
    setCurrentIndex(index)
    getOrderDetails(OrderID)
  };

  const sortByExpectedDate = () => {
    setCurrentIndex
  }


  return (
    <>
      <Flex direction={direction} justifyContent="space-between"  alignContent="start" alignItems="flex-start" p={5}>
        <Box w={{ base: "85%", lg: "50%" }}>
          <Text  fontSize="3xl" textAlign="center" fontFamily="adineue PRO Bold">Orders</Text>
          <Select w="30%" placeholder='Filter by...'>
            <option>Earliest Expected Days</option>
          </Select>
          <Table>
            <Thead>
              <Tr>
                <Th fontSize="1xl">Username</Th>
                <Th fontSize="1xl">OrderID</Th>
                <Th fontSize="1xl">Status</Th>
                <Th fontSize="1xl">Expected Days</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users.map(({ Username, OrderID, Status, ExpectedDays }, index) => {
                return (
                  <Tr>
                    <Th>{Username}</Th>
                    <Th sx={{ cursor: "pointer" }} _hover={{ bg: "#D3D3D3" }} onClick={() => handleOrderClick(OrderID, index)}>{OrderID}</Th>
                    <Th>{Status}</Th>
                    <Th>{ExpectedDays}</Th>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
        <Box w={{ base: "85%", lg: "50%" }} marginTop={{base: "35", lg: "0"}}>
          <Text marginBottom={{base: "0", lg: "40px"}} fontSize="3xl" textAlign="center" fontFamily="adineue PRO Bold">Order Details</Text>
          <Table>
            <Thead>
              <Tr>
                <Th fontSize="1xl">ProductID</Th>
                <Th fontSize="1xl">Name</Th>
                <Th fontSize="1xl">Size</Th>
                <Th fontSize="1xl">Quantity</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentOrderDetails.map(({ ProductID, Name, Size, Quantity }) => {
                return (
                  <Tr>
                    <Th>{ProductID}</Th>
                    <Th>{Name}</Th>
                    <Th>{Size}</Th>
                    <Th>{Quantity}</Th>
                  </Tr>
                )
              })}
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </>
  );
};

export default ManageOrders;