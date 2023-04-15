import React from 'react'
import { useNavigate } from 'react-router-dom';
import SavedCoin from '../components/SavedCoin';
import { UserAuth } from '../context/AuthContext'

function Account() {
  const {user, logOut}=UserAuth();
  const navigate = useNavigate();

  const handle_Sign_Out=async()=>{
    try {
       await logOut();
      navigate('/');
    } catch (e) {console.log(e.message) }
  }
   
  if(!user){
      navigate('/signin')
  }
  return (
    <div className='max-w-[1140px] mx-auto'>
        <div className='flex justify-between items-center my-12 py-8 rounded-div'>
          <div>
             <h1 className='text-2xl font-bold'>Account</h1>
             <div>
              <p>Welcome, {user?.email}</p>
             </div>
          </div>
          <div>
            <button onClick={(e)=>handle_Sign_Out(e)} 
            className='border px-6 py-6 rounded-xl shadow-xl hover:shadow-2xl '>Sign Out </button>
           </div>
        
        </div> 
        {/*SAVED COINS */}
        <div className='flex justify-between items-center my-12 py-8 rounded-div'>
          <div className='w-full min-h-[300px]'>
             <h1 className='text-2xl font-bold '> Watch List</h1>
             <SavedCoin/>
          </div>
        </div>   
    </div>
  )
}

export default Account