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
import Profile from './Pages/Profile';


function App() {
  const [authenticate,setAuthenticate] = useState(false)  
  return (
    <>
    <Router>
      <Routes>
        <Route path='/' element={<Homepage auth={authenticate} setAuth={setAuthenticate}/>}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/signin' element={<SIgnin auth={authenticate} setAuth={setAuthenticate}/>}/>
        <Route path='/profile' element={<Profile auth={authenticate} setAuth={setAuthenticate}/>}/>
      </Routes>
    </Router>
    </>
  )
}

export default App
