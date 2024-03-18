import React from 'react';
import './mainpagebodytwo.css';
import { Box, SimpleGrid, Stack, HStack, VStack, Badge} from '@chakra-ui/react'
import lightBlueSweater from '../../assets/products1/lightbluesweater.png'
import redSweater from '../../assets/products1/redsweater.png'
import purpleSweater from '../../assets/products1/purplesweater.png'

const MainPageBodyTwo = () => {
    return (
        <div className="mainpagebodytwo">
            <SimpleGrid columns={3} spacing={5} className="flex justify-center px-6 py-6">
                <Box className="product-box">
                   <VStack>
                        <img src={lightBlueSweater} style={{borderRadius: 30, padding: 10}}></img>

                   </VStack>
                </Box>
                <Box>
                    <VStack className="product-box">
                        <img src={purpleSweater} style={{borderRadius: 30, padding: 10}}></img>
                    </VStack>
                </Box>
                <Box>
                    <VStack className="product-box">
                        <img src={redSweater} style={{borderRadius: 30, padding: 10}}></img>
                    </VStack>
                </Box>
            </SimpleGrid>
        </div>
    );
};

export default MainPageBodyTwo;