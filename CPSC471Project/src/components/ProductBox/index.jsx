import React from 'react';
import { Box, VStack, HStack, Stack, Badge, Text } from '@chakra-ui/react'

function ProductBox(props) {
  return (
    <Box borderWidth="1px" overflow="hidden" _hover={{border: "1px solid"}}>
      <VStack>
        <img
          src={props.imageOfProduct}
          alt="Product"
          style={{ width: '100%'}}
        />
      </VStack>

      <HStack spacing={2} px={{ base: 2, md: 4 }} py={2} justifyContent="start">
        <Text sx={{ display: "inline-flex" }} as="i" fontSize={{ base: "sm", md: "md" }}>
          {props.genderOfProduct}, {props.categoryOfProduct}
        </Text>
        <Text fontSize={{ base: "xs", md: "sm" }} color="grey">
          #{props.productID}
        </Text>
      </HStack>

      <VStack align="start" px={{ base: 2, md: 5 }} spacing={1}>
        <Text as="b" fontSize={{ base: "xl", md: "2xl" }}>
          {props.nameOfProduct}
        </Text>
        <Text sx={{ display: "inline-flex" }} as="b" fontSize={{ base: "lg", md: "xl" }}>${props.priceOfProduct}</Text>
        <Text>{props.descOfProduct}</Text>
      </VStack>
    </Box>
  );
};

export default ProductBox;