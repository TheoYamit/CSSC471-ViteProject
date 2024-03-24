import { useState } from 'react'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {AuthProvider} from '../src/contexts/Authorization/Authorized'
function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
        <AuthProvider>
            <Routes>
                <Route path='/' element={<Home/>}/>
                <Route path='/login' element={<Login/>}/>
                <Route path='/register' element={<Register/>}/>
                <Route path='/profile' element={<Profile/>}/>
            </Routes>
        </AuthProvider>
    </Router>
        

  )
}

export default App;
