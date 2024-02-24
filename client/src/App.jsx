import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Homepage from './Components/Homepage'
import Navbar from './Components/Navbar'
import SIgnin from './Pages/SIgnin'
import Signup from './Pages/Signup'


function App() {

 

  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/signin' element={<SIgnin/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
