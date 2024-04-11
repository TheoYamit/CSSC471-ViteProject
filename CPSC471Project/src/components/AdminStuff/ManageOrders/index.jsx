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


  useEffect(() => {
    console.log(users);
  }, [users])

  useEffect(() => {
    console.log(currentOrder)
  }, [currentOrder])

  const handleOrderClick = (OrderID, index) => {
    console.log(OrderID);
    setCurrentOrder(OrderID);
  };

  const sortByExpectedDate = () => {
    setCurrentIndex
  }


  return (
    <>
      <Flex direction={direction} justifyContent="space-between" alignItems="center" alignContent="start" p={5}>
        <Table w={{ base: "85%", lg: "50%" }}>
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
        <Box p={4}>
          <Select placeholder='Filter by...'>
            <option>Earliest Expected Days</option>
          </Select>
        </Box>
      </Flex>
    </>
  );
};

export default ManageOrders;