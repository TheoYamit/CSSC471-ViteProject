import React from 'react';
import { useOrder } from '../../contexts/Order/Order';
import { Flex, Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react';

const OrderDisplay = () => {
  const { orders } = useOrder();

  return (
    <>
      <Flex py={10}>
        {console.log(orders)}
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
            {orders.map(({ProductID, ProductInfo, Quantity, Size, TotalPrice }) => (
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
      </Flex>
    </>
  );
};

export default OrderDisplay;