import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './mainpagebodytwo.css';
import { Flex, Box, Text } from '@chakra-ui/react'
import ProductBox from '../ProductBox';
import ProductBoxNew from '../ProductBoxNew'
import ProductBoxDiscounted from '../ProductBoxDiscounted';
import ProductBoxNewDiscounted from '../ProductBoxNewDiscounted';

const MainPageBodyTwo = () => {

  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProductsCategory = async (data) => {
      const response = await fetch('http://localhost:3001/getproductclothing', {
        method: "GET"
      });
      const responseFromServer = await response.json();
      setProducts(responseFromServer.products);
    };
    fetchProductsCategory();
  }, []);

  return (
    <>
      <Text px={5} py={5} fontSize="5xl" fontFamily="adineue PRO Bold" bg="#F3EEEA">Our Popular Clothing</Text>
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
        scrollBehaviour="smooth"
        width="100vw"
        maxW="100%"
      >

        {console.log(products)}
        {products.map((product) => {
          const Component = product.IsNew == 1
            ? product.IsDiscounted == 1 ? ProductBoxNewDiscounted : ProductBoxNew
            : product.IsDiscounted == 1 ? ProductBoxDiscounted : ProductBox;


          const arrayBufferView = new Uint8Array(product.Image.data);
          const blob = new Blob([arrayBufferView], { type: "image/png" });
          const imageUrl = URL.createObjectURL(blob);
          return (
            <Box px={2} width="400px" flexShrink={0} >
              <Box sx={{ cursor: "pointer" }} onClick={() => navigate(`/product/${product.ProductID}`)}>
                <Component px={5}
                  key={product.ProductID}
                  productID={product.ProductID}
                  nameOfProduct={product.Name}
                  descOfProduct={product.Description}
                  priceOfProduct={product.Price}
                  imageOfProduct={imageUrl}
                  categoryOfProduct={product.Category}
                  genderOfProduct={product.Gender}
                  isNew={product.IsNew}
                  isDiscounted={product.IsDiscounted}
                  previousPrice={product.Price}
                  discountedPrice={product.DiscountedPrice}

                />
              </Box>
            </Box>
          );
        })}

      </Flex>
    </>
  );
};

export default MainPageBodyTwo;