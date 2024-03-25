import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import axios from "axios"
import { useParams } from 'react-router-dom'
import Card from '../Components/Card'

const Cart = ({auth,setAuth}) => {
  const id = localStorage.getItem("userId") 
  const [cartItems,setCartItems] = useState()

  useEffect(()=>{
    async function getcartItems(){
      // const cartToken = localStorage.getItem("cart")
      // const cartToken = localStorage.getItem("cart")
      // const cartTokenObj = {
      //   id:cartToken
      // }
      const cartItems = await axios.get(`http://localhost:3000/cart/${id}`)
      console.log("cartitems = ",cartItems)
      setCartItems(cartItems.data.user)
    }

    getcartItems()
  },[])


  return (
    <div>
    <Navbar auth={auth} setAuth={setAuth}/>
    {
      cartItems?cartItems.map((ele)=>{
       return <div className='flex flex-wrap'>
                    <Card key={ele._id} id={ele._id} name={ele.Name} description={ele.Description} price={ele.Price} image = {ele.Image} />
            </div>
      }):
      <h1>Cart is loading</h1>
    }
    </div>
  )
}

export default Cart
