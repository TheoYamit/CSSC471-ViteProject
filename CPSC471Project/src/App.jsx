import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
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
            </Routes>
        </AuthProvider>
    </Router>
        

  )
}

export default App;
