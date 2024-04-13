import React from 'react';

const ClothingComponent = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {

    const getProducts = async () => {
      const response = await fetch('http://localhost:3001/getclothing', {
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

export default ClothingComponent;