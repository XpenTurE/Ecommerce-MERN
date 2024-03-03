import React, { useEffect } from 'react'
import Navbar from '../Components/Navbar'

const Cart = ({auth,setAuth}) => {

  useEffect(()=>{
    async function getCartItems(){
      const cartItems = await axios.get('http://localhost:3000/cart')
      console.lof(cartItems)      
    }
  },[])

  return (
    <div>
                <Navbar auth={auth} setAuth={setAuth}/>
      Cart is empty
    </div>
  )
}

export default Cart
