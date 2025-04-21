import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from './UserList.jsx'
import Signup from './assets/auth/Signup.jsx'
import Login from './assets/auth/Login.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/UserList' element={<UserList />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Login' element={<Login />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
