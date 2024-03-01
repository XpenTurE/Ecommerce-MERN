import React from 'react'
import Navbar from '../Components/Navbar'

const Cart = ({auth,setAuth}) => {
  return (
    <div>
                <Navbar auth={auth} setAuth={setAuth}/>
      Cart is empty
    </div>
  )
}

export default Cart
