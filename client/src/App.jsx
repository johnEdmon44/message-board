import './App.css';
import { Link } from 'react-router-dom';

function App() {

  return (
    <>
      <h1>Hello</h1>
      <Link to={"/UserList"}>Users</Link>
      <Link to={"/Signup"}>Signup</Link>
    </>
  )
}

export default App
