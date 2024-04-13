import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ProductPage from './pages/ProductPage'
import AdminProductsPage from './pages/AdminPages/AdminProductsPage'
import OrderPage from './pages/Orders/'
import PaymentPage from './pages/Payment'
import CustomerOrdersPage from './pages/CustomerOrdersPage'
import OrderDetailsPage from './pages/OrderDetailsPage'
import AdminReviewsPage from './pages/AdminPages/AdminReviewsPage'
import AdminOrdersPage from './pages/AdminPages/AdminOrdersPage'
import MenPage from './pages/Category/MenPage'
import WomenPage from './pages/Category/WomenPage'
import UnisexPage from './pages/Category/UnisexPage'
import ClothingPage from './pages/Category/ClothingPage'
import ShoesPage from './pages/Category/ShoesPage'
import BeautyPage from './pages/Category/BeautyPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/contexts/Authorization/Authorized'
import { OrderProvider } from './contexts/Order/Order'
function App() {
    return (
        <Router>
            <AuthProvider>
                <OrderProvider>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='product/:ProductID' element={<ProductPage />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/register' element={<Register />} />
                        <Route path='/profile' element={<Profile />} />
                        <Route path='/orders' element={<OrderPage />}/>
                        <Route path='/payment' element={<PaymentPage />}/>
                        <Route path='/men' element={<MenPage/>}/>
                        <Route path='/women' element={<WomenPage/>}/>
                        <Route path='/unisex' element={<UnisexPage/>}/>
                        <Route path='/clothing' element={<ClothingPage/>}/>
                        <Route path='/shoes' element={<ShoesPage/>}/>
                        <Route path='/beauty' element={<BeautyPage/>}/>
                        <Route path ='/customerorders' element={<CustomerOrdersPage/>}/>
                        <Route path='/customerorderdetails/:OrderID' element={<OrderDetailsPage/>}/>
                        <Route path='/adminproducts' element={<AdminProductsPage />} />
                        <Route path='/adminorders' element={<AdminOrdersPage/>}/>
                        <Route path='/adminreviews' element={<AdminReviewsPage/>}/>
                    </Routes>
                </OrderProvider>
            </AuthProvider>
        </Router>
    )
}

export default App;
