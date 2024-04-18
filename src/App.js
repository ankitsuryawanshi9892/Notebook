import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './components/Home'
import About from './components/About'
import Navbar from './components/Navbar'
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
// require('dotenv').config()

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type)=>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
        setAlert(null);
    }, 5000);
}
  return (
    <>
    <NoteState>
    <Router>
      <Navbar/>
      <Alert alert = {alert}/>
      <div className="container">
      <Routes>
        <Route path = '/' element={<Home showAlert={showAlert}/>}></Route>
        <Route path = '/about' element={<About showAlert={showAlert}/>}></Route>
        <Route path = '/login' element={<Login showAlert={showAlert} />}></Route>
        <Route path = '/signup' element={<Signup showAlert={showAlert} />}></Route>
      </Routes>
      </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
