import React, { createContext, useContext, useState, useEffect } from 'react'

const OrderContext = createContext();

export const useOrder = () => useContext(OrderContext);

export const OrderProvider = ({ children }) => {

    const [orders, setOrders] = useState([]);

    const addToOrder = (product) => {
        setOrders(prevOrders => [...prevOrders, product]);
        
    }

    useEffect(() => {
        console.log(orders);
    })

    const removeFromOrder = (productID) => {
        setOrders(prevOrders => prevOrders.filter(product => product.productID !== productID))
    };

    const clearOrder = () => {
        setOrders([]);
    }

    return (
        <OrderContext.Provider value={{ orders, addToOrder, removeFromOrder, clearOrder}}>
            {children}
        </OrderContext.Provider>
    )
};