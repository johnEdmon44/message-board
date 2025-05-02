import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserList from './component/UserList.jsx'
import Signup from './component/auth/Signup.jsx'
import Login from './component/auth/Login.jsx'
import UserPage from './component/UserPage.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />}></Route>
        <Route path='/UserList' element={<UserList />}></Route>
        <Route path='/Signup' element={<Signup />}></Route>
        <Route path='/Login' element={<Login />}></Route>
        <Route path='/UserPage' element={<UserPage />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
