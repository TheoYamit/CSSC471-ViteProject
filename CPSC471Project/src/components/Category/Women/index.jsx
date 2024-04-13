import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Text, SimpleGrid, Box } from '@chakra-ui/react';
import ProductBox from '../../ProductBox';
import ProductBoxDiscounted from '../../ProductBoxDiscounted';
import ProductBoxNew from '../../ProductBoxNew';
import ProductBoxNewDiscounted from '../../ProductBoxNewDiscounted';

const WomenComponent = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {

    const getProducts = async () => {
      const response = await fetch('http://localhost:3001/getwomen', {
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
      <Flex direction="column" sx={{ bg: "#F3EEEA" }}>
        <Text fontSize="5xl" fontFamily="adineue PRO Bold" p={5}>Women</Text>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={1}>
          {products.map((product) => {
            const Component = product.IsNew == 1
              ? product.IsDiscounted == 1 ? ProductBoxNewDiscounted : ProductBoxNew
              : product.IsDiscounted == 1 ? ProductBoxDiscounted : ProductBox;


            const arrayBufferView = new Uint8Array(product.Image.data);
            const blob = new Blob([arrayBufferView], { type: "image/png" });
            const imageUrl = URL.createObjectURL(blob);
            return (
              <Box px={2} width="375px" flexShrink={0} >
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
        </SimpleGrid>
      </Flex>
    </>
  );
}

export default WomenComponent;