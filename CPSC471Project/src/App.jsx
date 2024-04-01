import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import ProductPage from './pages/ProductPage'
import AdminProductsPage from './pages/AdminPages/AdminProductsPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../src/contexts/Authorization/Authorized'
import { OrderProvider } from '../src/contexts/Authorization/Order/Order'
function App() {
    const [count, setCount] = useState(0)

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
                        <Route path='/adminproducts' element={<AdminProductsPage />} />
                    </Routes>
                </OrderProvider>
            </AuthProvider>
        </Router>
    )
}

export default App;
