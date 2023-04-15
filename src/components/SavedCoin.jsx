import React, { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import {AiOutlineClose} from 'react-icons/ai'
import {doc,onSnapshot,updateDoc} from 'firebase/firestore';
import { db } from '../firebase';
import { UserAuth } from '../context/AuthContext';


function SavedCoin() {
  const [coins,setCoins]=useState([]);
  const {user}=UserAuth();

  useEffect(()=>{ 
    onSnapshot(doc(db,'users',`${user?.email}`), (doc)=>{
        setCoins(doc?.data()?.watchList)
    })
  },[user?.email])


  const coin_Path=doc(db,'users',`${user?.email}`);
  
  const delete_Coin=async(coinID)=>{
    try {
        const result =coins.filter(item=>item.id!==coinID);
        await updateDoc(coin_Path,
          {
            watchList:result
          });
    } catch (error) {
      
    }
  }
 
  return (
    <div >
      {
        coins?.length===0 ? 
        (<p>You don't any coins saved. Please save a coin to add it to your watch list. 
          <Link to='/'>Click here to search for coins </Link> </p>)
        :
        ( 
          <table className='w-full border-collapse text-center'>
            <thead>
              <tr className='border-b'>
                <th className='px-4'>Rank # </th>
                <th className='text-left'>Coin </th>
                <th className='text-left'>Remove </th>
              </tr>
            </thead>

            <tbody>
              {coins?.map(coin=>(
                <tr key={coin?.id} className='h-[60px] overflow-hidden'>
                    <td>{coin?.rank} </td>
                    <td>
                      <Link to={`/coin/${coin.id}`}> 
                        <div className='flex items-center'>
                          <img src={coin?.image} alt='/' className='w-8 mr-4'/>
                            <div>
                              <p className='hidden sm:table-cell '>{coin?.name}</p>
                              <p className='text-gray-500 text-left '>{coin?.symbol.toUpperCase()} </p>
                            </div>
                        </div>
                      </Link>
                    </td>
                    
                    <td className='pl-8'> 
                      <AiOutlineClose className='cursor-pointer' onClick={()=>delete_Coin(coin?.id)}/> 
                    </td>
                </tr>
              ))}
            </tbody>
          </table>
        )
      }
    </div>
  )
}

export default SavedCoin