import React from 'react';

const WomenComponent = () => {
  const [products, setProducts] = useState([]);

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
    </>
  );
}

export default WomenComponent;