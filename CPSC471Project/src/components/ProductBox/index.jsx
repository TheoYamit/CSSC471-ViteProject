import React from 'react';
import './productbox.css'
import {Box, VStack, HStack, Stack, Badge, Text} from '@chakra-ui/react'


function ProductBoxNew(props) {

    return (
        <Box className={props.className} borderWidth='1px' borderRadius='30px'>
            <VStack>
                <img
                src={props.img}
                style={{borderRadius: 30, width:'110%', borderBottomLeftRadius: '0', borderBottomRightRadius: '0', paddingBottom: 10}}
                />
            </VStack>

            <HStack className="justify-start px-4" colorScheme='brand'>
                <Badge borderRadius='full' px='2' colorScheme={props.colorScheme} fontSize='rem'>
                    NEW
                </Badge>
                <Text as='i' fontSize='1rem'>
                    {props.title}
                </Text>
                <Text fontSize='sm' color="grey">
                    #{props.productID}
                </Text>
            </HStack>

            <VStack align="start" className="px-5">
                <Text as='b' fontSize='2xl'>
                    {props.nameOfProduct}
                </Text>
                <HStack>
                    <Text as='del'>${props.previousPrice}</Text>
                    <Badge px='2' colorScheme="red">
                        SALE
                    </Badge>
                    <Text as='b' fontSize='1xl'>${props.priceOfProduct}</Text>
                </HStack>
            
            </VStack>
        </Box>
    )
};

export default ProductBoxNew;
