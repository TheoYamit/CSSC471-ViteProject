import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../../contexts/Order/Order';
import { Flex, Button, VStack, Text, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const OrderDisplay = () => {
  const { orders, removeFromOrder } = useOrder();

  const [totalPrice, setTotalPrice] = useState(0);
  
  const navigate = useNavigate();

  useEffect(() => {
    let newTotalPrice = 0;
    orders.forEach( ({TotalPrice}) => {
      newTotalPrice += parseFloat(TotalPrice);
    });
    newTotalPrice.toFixed(2)
    setTotalPrice(newTotalPrice);
  }, [orders])

  return (
    <>
      <Flex py={10}>
        {console.log(orders)}
        <VStack w="full" spacing={5}>
          <Table>
            <TableCaption>Current Products in Order</TableCaption>
            <Thead>
              <Tr>
                <Th>ProductID</Th>
                <Th>Name Of Product</Th>
                <Th>Size</Th>
                <Th>Quantity</Th>
                <Th>Total Price</Th>
                <Th>Remove</Th>
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
                  <Td>
                    <Button onClick={() => removeFromOrder(ProductID, Size)}>
                      <FontAwesomeIcon icon={faTrash} />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Text as="b">Total Price: ${totalPrice.toFixed(2)}</Text>
          <Button onClick={() => navigate('/payment')} bg="#EBE3D5" borderRadius="20px" px={10} py={7}>Checkout</Button>

        </VStack>
      </Flex>
    </>
  );
};

export default OrderDisplay;