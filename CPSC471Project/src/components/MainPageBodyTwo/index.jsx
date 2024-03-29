import React, {useState} from 'react';
import './mainpagebodytwo.css';
import {Flex, Box, SimpleGrid, Stack, HStack, VStack, Badge, Text } from '@chakra-ui/react'
import ProductBox from '../ProductBox';
import ProductBoxNew from '../ProductBoxNew'
import ProductBoxDiscounted from '../ProductBoxDiscounted';
import ProductBoxNewDiscounted from '../ProductBoxNewDiscounted';

const MainPageBodyTwo = () => {

  const [productDetails, setProductDetails] = useState();
  return (
    <>
      <Flex 
      className="mainpagebodytwo"
      direction="row" 
      overflowX="scroll" 
      sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
          '-ms-overflow-style': 'none', 
          'scrollbar-width': 'none',
        }}
      scrollBehaviour="smooth">

      </Flex>
    </>
  );
};

export default MainPageBodyTwo;