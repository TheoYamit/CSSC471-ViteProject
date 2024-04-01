import React from 'react';
import './mainpagebody.css'
import saleBanner from '../../assets/sale.svg'
import {
  Flex, Box, Spacer, HStack, Image
} from '@chakra-ui/react'
import WebFont from 'webfontloader'

const MainPageBody = () => {
  WebFont.load({
    google: {
      families: ['Fredoka: 300, 400, 700']
    }
  });


  return (
    <main className="main-page">
      <Flex justifyContent="center" alignItems="center">
        <Image src={saleBanner} w="100%"/>
      </Flex> 
    </main>

  );
};

export default MainPageBody;