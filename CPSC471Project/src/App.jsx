import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider} from '../src/contexts/Authorization/Authorized'
import { ChakraProvider } from '@chakra-ui/react'
import theme from './fonts/fonts.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
            </Routes>
        </AuthProvider>
    </Router>
        

  )
}

export default App;
