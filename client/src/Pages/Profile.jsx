import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from "axios"

const Profile = ({auth,setAuth}) => {
    const [userData, setUserData] = useState({})
    const token = localStorage.getItem("token")
    const tokenObj= {
    token
 }  
 async function fetchData(){
     const user = await axios.post("http://localhost:3000/profile",tokenObj)
     setUserData(user)
 }
   useEffect(()=>{
    fetchData();    
},[])

  return (
    <div>
        
        {console.log(userData)}
        <Navbar auth={auth} setAuth={setAuth}/>
       <h1>{userData.data.user.Name}</h1>
       <h1>{userData.data.user.Email}</h1>
    </div>
  )
}

export default Profile
