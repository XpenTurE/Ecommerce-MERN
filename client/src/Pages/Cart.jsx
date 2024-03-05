import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'
import axios from "axios"

const Cart = ({auth,setAuth}) => {
  
  useEffect(()=>{
    async function getcartItems(){
      const cartToken = localStorage.getItem("cart")
      const cartTokenObj = {
        id:cartToken
      }
      const cartItems = await axios.post('http://localhost:3000/cart-items',cartTokenObj)
      console.log(cartItems)
    }

    getcartItems()
  },[])

  async function getCartItems(){
    const cartItems = await axios.get('http://localhost:3000/cart')
    console.log(cartItems)      
  }

  return (
    <div>
    <Navbar auth={auth} setAuth={setAuth}/>
      Cart is empty
    </div>
  )
}

export default Cart
