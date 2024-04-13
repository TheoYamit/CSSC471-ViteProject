import React, { useState, useEffect } from 'react';
import { Flex, Text, Grid } from '@chakra-ui/react';
const MenComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const getProducts = async () => {
      const response = await fetch('http://localhost:3001/getmen', {
        method: "GET"
      });

      const responseFromServer = await response.json();

      const { listofproducts } = responseFromServer;

      setProducts(listofproducts)
    }
    getProducts();
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <>


    </>
  );
}

export default MenComponent;