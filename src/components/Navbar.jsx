import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { UserAuth } from '../context/AuthContext'

import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai';

function Navbar() {
  const [nav,setNav]=useState(false);

  const {user,logOut}=UserAuth();
  const navigate=useNavigate();

  const handle_Nav=()=>{
    setNav(!nav);

  }

  const handle_Sign_Out=async(e)=>{
    try {
      await logOut();
      navigate('/');
    } catch (e) {console.log(e.message) }
  }

  return (
    <div className='rounded-div flex items-center justify-between h-20 font-bold mt-4'>
      <Link to='/'>
        <h1 className='text-2xl'>Cryptobase</h1>
      </Link>

       <div className=' hidden md:block '>
          <ThemeToggle/>
       </div>

        {
          user?.email ? 
          (
            <div>
              <Link to='/account' className='p-4'>Account</Link>
              <button onClick={(e)=>handle_Sign_Out(e)}>Sign Out </button>
            </div>
          ) 
          :
          (
            <div className='hidden md:block'>
            <Link to='/signin' className='p-4 hover:text-accent'> Sign In</Link>
            <Link to='/signup' className='bg-button text-btnText px-5 py-2 ml-2 rounded-2xl shadow-lg hover:shadow-2xl'> Sign Up</Link>
           </div>
          )
        }

       
       {/* Menu Icons */}
       <div className='block md:hidden cursor-pointer z-10 'onClick={()=>handle_Nav()}>
          {
            nav? <AiOutlineClose size={25}/> : <AiOutlineMenu size={25} /> 
          }
       </div>
       
        {/**Mobile Menu */}  
        <div className={
          nav ? 
          'md:hidden fixed right-0 top-20 flex flex-col justify-between w-full h-[90%] bg-primary ease-in duration-500 z-10'
          :
          'fixed right-[-100%] top-20 flex flex-col justify-between w-full h-[90%] bg-primary ease-in duration-5000 z-10'
        }>
          
          <ul className='w-full p-4 '>
            <li onClick={handle_Nav} className='border-b py-6 '>  <Link to='/' >Home </Link> </li>
            <li onClick={handle_Nav} className='border-b py-6 '>  <Link to='/account'> Account </Link> </li>
            <li className='py-6 '>  <ThemeToggle/> </li>
          </ul>
          
          <div className='flex flex-col w-full p-4 '>
             <Link  onClick={handle_Nav} to='/signin'>
               <button  className='w-full my-2 p-3 bg-primary text-primary border border-secondary rounded-2xl shadow-xl'> Sign In</button>
             </Link>
             
             <Link  onClick={handle_Nav} to='/signin'>
               <button  className='w-full my-2 p-3 bg-button text-bntText rounded-xl shadow-xl'> Sign Up</button>
             </Link>
          </div>
        </div>

    </div>
  )
}

export default Navbar