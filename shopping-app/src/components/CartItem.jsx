import React from 'react'
import { useDispatch } from 'react-redux'
import { remove } from '../redux/slices/CartSlice'
import toast from 'react-hot-toast'
import { MdDelete } from 'react-icons/md'

const CartItem = ({item,itemIndex}) => {
  const dispatch = useDispatch()
  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.error("Item removed from cart")
  }
  return (
    <div className='flex items-center  p-2 md:p-5 justify-between border-b-2 border-slate-500  mt-2 mb-2 md:mx-5 '>
      <div className='flex flex-col md:flex-row p-0 md:p-3 gap-5 items-center'>
        <div className="w-[30%]">
          <img className='object-cover' src={item.image}/>
        </div>
        <div className="md:ml-10 self-start space-y-5 w-[100%] md:w-[70%]">
          <h1 className='text-xl dark:text-gray-300 text-black  font-semibold'>{item.title}</h1>
          <h1 className="text-base dark:text-slate-400 text-slate-600 font-medium">{item.description}</h1>
          <div className='flex items-center justify-between'>
            <p className='font-bold text-lg text-green-600'>${item.price}</p>
          </div>
          <div className='transition-transform duration-300 text-[1.8rem] cursor-pointer rounded-full p-0  mr-3' onClick={removeFromCart}>
            <MdDelete className='text-red-600'/></div>
        </div>
      </div>
    </div>
  )
}

export default CartItem