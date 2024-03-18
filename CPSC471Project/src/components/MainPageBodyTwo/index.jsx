import React from 'react';
import './mainpagebodytwo.css';
import { Box, SimpleGrid, Stack, HStack, VStack, Badge, Text} from '@chakra-ui/react'
import tealSweater from '../../assets/products1/tealsweater.png'
import redSweater from '../../assets/products1/redsweater.png'
import purpleSweater from '../../assets/products1/purplesweater.png'

const MainPageBodyTwo = () => {
    return (
        <div className="mainpagebodytwo">
            <SimpleGrid columns={3} spacing={5} className="flex justify-center px-6 py-6">
                <Box className="product-box">
                   <VStack>
                        <img src={tealSweater} style={{borderRadius: 30, padding: 10}}></img>
                        <HStack>
                            <Badge borderRadius="full" px="2" colorScheme="teal" fontSize="1rem">New</Badge>
                            <Text>
                                Hi
                            </Text>
                        </HStack>
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