import React from 'react';
import './mainpagebodytwo.css';
import { Box, SimpleGrid, Stack, HStack, VStack, Badge, Text} from '@chakra-ui/react'
import tealSweater from '../../assets/products1/tealsweater.png'
import redSweater from '../../assets/products1/redsweater.png'
import purpleSweater from '../../assets/products1/purplesweater.png'
import ProductBoxNew from '../ProductBoxNew'

const MainPageBodyTwo = () => {
    return (
        <div className="mainpagebodytwo">
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={5} px={6} py={6}>
                <ProductBoxNew 
                    className='product-box' 
                    img={tealSweater} 
                    colorScheme="teal" 
                    title="Unisex" 
                    productID="000001"
                    nameOfProduct="Teal Unisex Sweater" 
                    priceOfProduct="19.99" 
                    previousPrice="29.99"/>

                <ProductBoxNew 
                    className='product-box' 
                    img={redSweater} 
                    colorScheme="teal" 
                    title="Unisex" 
                    productID="000002"
                    nameOfProduct="Red Unisex Sweater" 
                    priceOfProduct="19.99"
                    previousPrice="20.99"/>

                <ProductBoxNew 
                    className='product-box' 
                    img={purpleSweater} 
                    colorScheme="teal" 
                    title="Unisex" 
                    productID="000003"
                    nameOfProduct="Purple Unisex Sweater" 
                    priceOfProduct="19.99"
                    previousPrice="20.99"/>
            </SimpleGrid>
        </div>
    );
};

export default MainPageBodyTwo;