import React, { useState, useEffect } from 'react';
import { useOrder } from '../../contexts/Order/Order';
import { useAuth } from '../../contexts/Authorization/Authorized';
import {
  Flex, VStack, Table, Alert, AlertIcon,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer, Text, Button, HStack, Box, useBreakpointValue,
  Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon,
  FormControl, FormLabel, Input
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMoneyBillWave } from '@fortawesome/free-solid-svg-icons';

const PaymentForOrder = () => {

  const { orders } = useOrder();
  const { userDetails } = useAuth();

  const [totalPrice, setTotalPrice] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  const [alertInfo, setAlertInfo] = useState({
    isVisible: false,
    status: "",
    message: ""
  })

  useEffect(() => {
    let newItemCount = 0;
    orders.forEach(({ Quantity }) => {
      newItemCount += Quantity;
    })
    setItemCount(newItemCount);
  }, [orders])

  const [orderDetails, setOrderDetails] = useState({
    Address: userDetails.Address,
    City: "",
    StateProvince: "",
    Country: "",
    ZipCode: "",
    CardNumber: "",
    CardDate: "",
    CardCVC: "",
    Order: orders,
    OrderID: "",
  });

  const [fullOrderDetails, setFullOrderDetails] = useState({
    OrderID: "",
    CustomerID: "",
    Name: "",
    Address: "",
    Country: "",
    Postal: "",
    DateOfOrder: null,
    PaymentDetails: "",
    Status: "",
    ExpectedDays: "",
    Products: null,
  })

  useEffect(() => {
    let newTotalPrice = 0;
    orders.forEach(({ TotalPrice }) => {
      newTotalPrice += parseFloat(TotalPrice);
    })
    newTotalPrice.toFixed(2);
    setTotalPrice(newTotalPrice)
  }, [orders]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  useEffect(() => {
    console.log(fullOrderDetails);
  }, [fullOrderDetails])

  useEffect(() => {
    console.log(orderDetails);
  }, [orderDetails])

  const onSubmit = async (data) => {
    console.log(data);
    const response = await fetch('http://localhost:3001/addorder', {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(data)
    })

    const responseFromServer = await response.json();

    const { status, message } = responseFromServer;

    setAlertInfo({
      isVisible: true,
      status: status === "success" ? "success" : "error",
      message: message
    })

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const listOfNumbers = "123456789"
    const listOfLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

    let newOrderID = "";
    while (newOrderID.length < 10) {
      let firstRand = Math.floor(Math.random() * 2);

      if (firstRand === 0) {
        let secondRand = Math.floor(Math.random() * listOfNumbers.length);
        newOrderID += listOfNumbers[secondRand];
      } else {
        let secondRand = Math.floor(Math.random() * listOfLetters.length);
        newOrderID += listOfLetters[secondRand];
      }
    }
    let paymentNum = "";
    while (paymentNum.length < 10) {
      let firstRand = Math.floor(Math.random() * 2);

      if (firstRand === 0) {
        let secondRand = Math.floor(Math.random() * listOfNumbers.length);
        paymentNum += listOfNumbers[secondRand];
      } else {
        let secondRand = Math.floor(Math.random() * listOfLetters.length);
        paymentNum += listOfLetters[secondRand];
      }
    }

    console.log("PaymentNum:", paymentNum)

    let newAddress = orderDetails.Address + ", " + orderDetails.City + ", " + orderDetails.StateProvince

    let expectedDays = 0
    if (itemCount == 1) {
      expectedDays = 2;
    } else if (itemCount > 1 && itemCount <= 5) {
      expectedDays = 4;
    } else if (itemCount > 5) {
      expectedDays = 7;
    }

    let statusOfOrder = "Processed";
    let paymentInfo = {
      PaymentNum: paymentNum,
      CardNumber: orderDetails.CardNumber,
      CardDate: orderDetails.CardDate,
      CardCVC: orderDetails.CardCVC,
      TotalAmount: totalPrice
    }

    setFullOrderDetails({
      OrderID: newOrderID,
      CustomerID: userDetails.Username,
      Name: userDetails.First_name + " " + userDetails.Last_name,
      Address: newAddress,
      Country: orderDetails.Country,
      Postal: orderDetails.ZipCode,
      DateOfOrder: new Date(),
      PaymentDetails: paymentInfo,
      Status: statusOfOrder,
      ExpectedDays: expectedDays,
      Products: orders
    })

    const dataToSend = {
      OrderID: newOrderID,
      CustomerID: userDetails.Username,
      Name: userDetails.First_name + " " + userDetails.Last_name,
      Address: newAddress,
      Country: orderDetails.Country,
      Postal: orderDetails.ZipCode,
      DateOfOrder: new Date(),
      PaymentDetails: paymentInfo,
      Status: statusOfOrder,
      ExpectedDays: expectedDays,
      Products: orders
    }

    await onSubmit(dataToSend);
  }

  const direction = useBreakpointValue({ base: "column", lg: "row" })
  return (
    <>
      <Flex sx={{ height: "700px" }} direction={direction} justifyContent="space-between" alignItems="start" py={5} px={5}>
        <Box onSubmit={handleSubmit} w={{ base: "100%", lg: "100%" }} as="form">
          <Accordion>
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize="2xl">Shipping Details</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                <FormControl py={4}>
                  <FormLabel>Address:</FormLabel>
                  <Input name="Address" value={orderDetails.Address} onChange={handleInputChange}></Input>
                </FormControl>
                <FormControl py={4}>
                  <FormLabel>City:</FormLabel>
                  <Input name="City" value={orderDetails.City} onChange={handleInputChange}></Input>
                </FormControl>
                <FormControl py={4}>
                  <FormLabel>State/Province:</FormLabel>
                  <Input name="StateProvince" value={orderDetails.StateProvince} onChange={handleInputChange}></Input>
                </FormControl>
                <FormControl py={4}>
                  <FormLabel>Country:</FormLabel>
                  <Input name="Country" value={orderDetails.Country} onChange={handleInputChange}></Input>
                </FormControl>
                <FormControl py={4}>
                  <FormLabel>Zip code:</FormLabel>
                  <Input name="ZipCode" value={orderDetails.ZipCode} onChange={handleInputChange}></Input>
                </FormControl>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize="2xl">Payment Details</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <FormControl py={4}>
                  <FormLabel>Card Number:</FormLabel>
                  <Input name="CardNumber" value={orderDetails.CardNumber} onChange={handleInputChange}></Input>
                </FormControl>

                <FormControl py={4}>
                  <FormLabel>Date:</FormLabel>
                  <Input name="CardDate" value={orderDetails.CardDate} onChange={handleInputChange} type="month"></Input>
                </FormControl>

                <FormControl py={4}>
                  <FormLabel>CVC/CVV</FormLabel>
                  <Input name="CardCVC" value={orderDetails.CardCVC} onChange={handleInputChange}></Input>
                </FormControl>
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    <Text fontSize="2xl">Review Order Details</Text>
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel>
                <Table>
                  <TableCaption>Current Products in Order</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>ProductID</Th>
                      <Th>Name Of Product</Th>
                      <Th>Size</Th>
                      <Th>Quantity</Th>
                      <Th>Total Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {orders.map(({ ProductID, ProductInfo, Quantity, Size, TotalPrice }) => (
                      <Tr>
                        <Td>{ProductID}</Td>
                        <Td>{ProductInfo.nameOfProduct}</Td>
                        <Td>{Size}</Td>
                        <Td>{Quantity}</Td>
                        <Td>${TotalPrice}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </AccordionPanel>
            </AccordionItem>
            <Text fontSize="3xl" py={10} textAlign="center">Total: ${totalPrice.toFixed(2)}</Text>
            <Flex justifyContent="center">
              <VStack>
                {alertInfo.isVisible &&
                  <Alert status={alertInfo.status}>
                    <AlertIcon />
                    {alertInfo.message}
                  </Alert>}
                <Button type="submit" sx={{ padding: "8" }}>
                  <HStack spacing={3}>
                    <FontAwesomeIcon icon={faMoneyBillWave} />
                    <Text>Complete Order</Text>
                  </HStack>
                </Button>

              </VStack>

            </Flex>
          </Accordion>
        </Box>
      </Flex>
    </>
  );
}
export default PaymentForOrder;