import React from 'react'
import ThemeToggle from './ThemeToggle'
import {FaTwitter, FaFacebook, FaReddit, FaGithub} from 'react-icons/fa'
import { AiOutlineInstagram } from 'react-icons/ai'

function Footer() {
 
    return (
    <div className='rounded-div mt-4 pt-4 text-primary mb-[20px]'>
        <div className='grid md:grid-cols-2'>
             <div className='flex justify-evenly w-full md:max-w-[350px] uppercase'>
                <div>
                    <h2 className='font-bold'> Support </h2>
                     <ul>
                        <li className='text-sm py-1'>Help Center</li>
                        <li className='text-sm py-1'>Contact Us</li>
                        <li className='text-sm py-1'>API Status</li>
                        <li className='text-sm py-1'>Documentation</li>
                     </ul>                
                </div>
                <div>
                    <h2 className='font-bold'> Info</h2>
                    <ul>
                        <li className='text-sm py-1'>About Us</li>
                        <li className='text-sm py-1'>Carrers</li>
                        <li className='text-sm py-1'>Invest</li>
                        <li className='text-sm py-1'>Legal</li>
                    </ul>
                </div>
             </div>
             
             <div className='text-right'>
                <div className='flex w-full justify-end  '>
                    <div className='w-full md:w-[400px] py-4 relative'>
                        
                        <div className='flex justify-center md:justify-end py-4 md:py-0 md:pb-4 mt-[-1rem]'>
                            <ThemeToggle/>
                        </div>

                        <p className='text-center md:text-right'>Sign up for <span className='font-semibold italic'> Cryto News</span> </p>
                        
                        <div className='py-4'>
                            <form className=''> 
                               <input className='bg-primary border border-input p-2 mr-2 w-full shadow-xl rounded-2xl md:w-auto' 
                                type='email' placeholder='Enter your email'/>
                                <button className='mt-2 w-full bg-button text-btnText px-4 py-2  rounded-2xl shadow-xl hover:shadow-3xl md:w-auto '>
                                    Sign Up 
                                </button>
                            </form>      
                        </div>
                        
                        <div className='flex py-4 justify-evenly text-accent mr-[-15%]'>
                            <AiOutlineInstagram/>
                            <FaTwitter/>
                            <FaReddit/> 
                            <FaFacebook/>
                            <FaGithub/>   
                        </div>
                    </div>
                    
                
                </div>
             </div>
        
        </div>
        <p className='text-center py-4'>Made by 🖥️MDK</p>
    </div>
  )
}

export default Footer