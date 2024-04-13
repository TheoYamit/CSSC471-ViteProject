import React, {useState, useEffect} from 'react';

const BeautyComponent = () => {
  const [products, setProducts] = useState([]);
  
    useEffect(() => {
  
      const getProducts = async () => {
        const response = await fetch('http://localhost:3001/getbeauty', {
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

export default BeautyComponent;