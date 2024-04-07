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
      <Flex>

      </Flex>
    </>
  );
}

export default OrderDetails;