import { useEffect } from 'react';
import './App.css';
import axios from "axios";

function App() {

  const fetchApi = async () => {
    const response = await axios.get("http://localhost:3400/");
    console.log(response)
  }

  useEffect(() => {
    fetchApi();
  }, [])

  return (
    <>
      <h1>Hello</h1>
    </>
  )
}

export default App
