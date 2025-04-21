import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router';
import CartItem from '../components/CartItem';

const Cart = () => {
  const cart = useSelector((state)=>state.cart)
  const [totalAmount, setTotalAmount] = useState(0)

  useEffect(()=>{
    setTotalAmount(cart.reduce((acc,curr)=>acc+curr.price,0));
  },[cart])

  return (
    <div>
      {
        cart.length > 0 ? 
        (<div className='max-w-[1200px] mx-auto flex flex-col md:flex-row justify-center'>
          <div className='w-[100%] md:w-[60%] flex flex-col p-2'>
            {
              cart.map((item,index)=>(
                <CartItem key={item.id} item={item} itemIndex={index}/>
              ))
            }
          </div>

          <div className='w-full md:w-[40%] min-h-[50vh] mt-5 flex flex-col'>
            <div className="flex flex-col gap-5 my-14 p-5 md:p-0  h-[100%] justify-between">
              <div className='flex flex-col gap-5'>
                <div className='font-semibold text-xl text-green-800 '>Your Cart</div>
                <div className='font-semibold text-4xl text-green-700 -mt-3'>Summary</div>
                <p className='text-xl'><span className='text-gray-700 font-semibold text-xl'>Total items: {cart.length}</span></p>
              </div>
            </div>

            <div className='flex flex-col p-5 md:p-0 '><p className='text-xl font-bold'><span className='text-gray-700 font-semibold'>Total Amount: ${totalAmount}</span></p></div>
            <NavLink to='/'>
            <button className='bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 mb-4 border-green-600 font-bold hover:text-green-700 p-3 text-md ml-4 md:ml-0 w-[80%]'>Shop More</button>
            </NavLink>
          </div>

        </div>) : 
        (<div className="min-h-[80vh] flex flex-col items-center justify-center">
          <h1 className="text-gray-700 font-semibold text-xl mb-2">Your Cart Is Empty</h1>
          <NavLink to='/'>
            <button className='bg-green-700 hover:bg-purple-50 rounded-lg text-white transition duration-300 ease-linear mt-5 border-2 border-green-600 font-bold hover:text-green-700 p-3 text-xl'>Shop Now</button>
          </NavLink>
        </div>)
      }
    </div>
  )
}

export default Cart;