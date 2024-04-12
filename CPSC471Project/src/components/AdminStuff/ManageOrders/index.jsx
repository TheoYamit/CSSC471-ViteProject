import React, { useState, useEffect } from 'react';
import {
  Flex, Select, Text, Box, VStack, HStack, Button, useBreakpointValue,
  Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer,
  Alert, AlertIcon
} from '@chakra-ui/react';

const ManageOrders = () => {

  const [users, setUsers] = useState([]);
  const direction = useBreakpointValue({ base: "column", lg: "row" });
  const [currentOrder, setCurrentOrder] = useState();
  const [currentIndex, setCurrentIndex] = useState();
  const [currentOrderDetails, setCurrentOrderDetails] = useState([]);
  const [alertInfo, setAlertInfo] = useState({ isVisible: false, status: "", message: "" });

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await fetch('http://localhost:3001/getuserswithorders', {
      method: "GET",
    });
    const responseFromServer = await response.json();
    const { listofusers } = responseFromServer;
    setUsers(listofusers);
  }


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
    // Bubble sort this ting
    let sortedUsers = [...users]
    for (let index = 0; index < sortedUsers.length - 1; index++) {
      for (let index2 = sortedUsers.length - 1; index2 > index; index2--) {
        if (sortedUsers[index2].ExpectedDays < sortedUsers[index2 - 1].ExpectedDays) {
          let temp = sortedUsers[index2];
          sortedUsers[index2] = sortedUsers[index2 - 1];
          sortedUsers[index2 - 1] = temp;
        }
      }
    }
    setUsers(sortedUsers);
  };


  const handleFilterOnChange = (event) => {
    const value = event.target.value;
    if (value == "ExpectedDays") sortByExpectedDate();
    if (value == "NoFilter") getUsers();
  }

  const handleStatusChange = async (OrderID, Status) => {
    const payload = { orderID: OrderID, status: Status };
    const response = await fetch('http://localhost:3001/updatestatusoforder', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const responseFromServer = await response.json();

    const { status, message } = responseFromServer;

    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    });

    if (status == "success") {
      const updatedUsers = users.map(user => {
        if (user.OrderID === OrderID) {
          return {...user, Status: Status}
        }
        return user;
      });
      setUsers(updatedUsers)
    }

    setTimeout(() => {
      setAlertInfo({
        isVisible: false,
        status: "",
        message: ""
      })
    }, 3000);
  }


  return (
    <>
      <Flex direction={direction} justifyContent="space-between" alignContent="start" alignItems={{ base: "center", lg: "flex-start" }} p={5}>
        <Box w={{ base: "95%", lg: "50%" }}>
          <Text fontSize="3xl" textAlign="center" fontFamily="adineue PRO Bold">Orders</Text>
          <HStack>
            <Select onChange={handleFilterOnChange} w="33%" placeholder='Filter by...'>
              <option value="NoFilter">No Filter</option>
              <option value="ExpectedDays">Earliest Expected Days</option>
              <option value="ProcessedOrders">Processed Orders</option>
              <option value="ShippedOrders">Shipped Orders</option>
              <option value="DeliveredOrders">Delivered Orders</option>
            </Select>

            {alertInfo.isVisible &&
            <Alert status={alertInfo.status}>
              <AlertIcon/>
              {alertInfo.message}
            </Alert>
            }
          </HStack>
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
                    <Th>
                      <Select
                        value={Status}
                        onChange={(e) => handleStatusChange(OrderID, e.target.value)}
                        size="sm"
                      >
                        <option value="Processed">Processed</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </Select>
                    </Th>
                    <Th>{ExpectedDays}</Th>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </Box>
        <Box w={{ base: "95%", lg: "50%" }} marginTop={{ base: "35", lg: "0" }}>
          <Text marginBottom={{ base: "0", lg: "40px" }} fontSize="3xl" textAlign="center" fontFamily="adineue PRO Bold">Order Details For #{currentOrder}</Text>
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