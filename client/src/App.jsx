import './App.css';
import MessageBoard from './component/MessageBoard';
import { Routes, Route } from 'react-router-dom'
import UserList from './component/UserList.jsx'
import Signup from './component/auth/Signup.jsx'
import Login from './component/auth/Login.jsx'
import UserPage from './component/UserPage.jsx'
import Navbar from './component/Navbar.jsx';

function App() {
  return (
    <>
      <Navbar />
      <main className='bg-gray-100 min-h-screen'>
        <Routes>
          <Route path='/' element={<MessageBoard />}></Route>
          <Route path='/UserList' element={<UserList />}></Route>
          <Route path='/Signup' element={<Signup />}></Route>
          <Route path='/Login' element={<Login />}></Route>
          <Route path='/UserPage' element={<UserPage />}></Route>
        </Routes>
      </main>
    </>
  )
}

export default App
