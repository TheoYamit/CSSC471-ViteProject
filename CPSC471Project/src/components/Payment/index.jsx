import React, { useState, useEffect } from 'react';
import { useOrder } from '../../contexts/Order/Order';
import { useAuth } from '../../contexts/Authorization/Authorized';
import {
  Flex, VStack, Table,
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
  const [totalPrice, setTotalPrice] = useState(0);

  const currentYear = new Date().getFullYear();
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const handleChangeMonth = (e) => {
    setMonth(e.target.value);
  }

  const handleChangeYear = (e) => {
    setYear(e.target.value);
  }

  useEffect(() => {
    let newTotalPrice = 0;
    orders.forEach(({ TotalPrice }) => {
      newTotalPrice += parseFloat(TotalPrice);
    })
    newTotalPrice.toFixed(2);
    setTotalPrice(newTotalPrice)
  }, [orders]);

  const direction = useBreakpointValue({ base: "column", lg: "row" })
  return (
    <>
      <Flex sx={{ height: "700px" }} direction={direction} justifyContent="space-between" alignItems="start" py={5} px={5}>
        <Box w={{ base: "100%", lg: "100%" }} as="form">
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
                  <Input></Input>
                </FormControl>
                <FormControl py={4}>
                  <FormLabel>City:</FormLabel>
                  <Input></Input>
                </FormControl>
                <FormControl py={4}>
                  <FormLabel>State/Province:</FormLabel>
                  <Input></Input>
                </FormControl>
                <FormControl py={4}>
                  <FormLabel>Zip code:</FormLabel>
                  <Input></Input>
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
                  <Input></Input>
                </FormControl>

                <FormControl py={4}>
                  <FormLabel>Date:</FormLabel>
                  <Input type="month"></Input>
                </FormControl>

                <FormControl py={4}>
                  <FormLabel>CVC/CVV</FormLabel>
                  <Input></Input>
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
              <Button sx={{ padding: "8" }}>
                <HStack spacing={3}>
                  <FontAwesomeIcon icon={faMoneyBillWave} />
                  <Text>Complete Order</Text>
                </HStack>
              </Button>

            </Flex>
          </Accordion>
        </Box>
      </Flex>
    </>
  );
}
export default PaymentForOrder;