import React from 'react'

import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { Link } from 'react-router-dom';
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';
import { UserAuth } from '../context/AuthContext';
import {db} from '../firebase';
import { arrayUnion,doc,updateDoc } from 'firebase/firestore';
import { useState } from 'react';


function CoinItem({coin}) {
  const [savedCoin,setSavedCoin]=useState(false);
  const {user}=UserAuth();


    const coinPath=doc(db,'users',`${user?.email}`);

    const saved_Coin=async()=>{
        if(user?.email){
            setSavedCoin(true);
            await updateDoc(coinPath,{
                watchList:arrayUnion({
                    id:coin.id,
                    name:coin.name,
                    image:coin.image,
                    rank:coin.market_cap_rank,
                    symbol:coin.symbol
                })
            }) 
        }else{
            alert('Please sign in to save a coin to your Watch List');
        }  
    }

    return (
    <tr className='h-[80px] border-b overflow-hidden'>
        <td onClick={saved_Coin}> 
            {savedCoin ? <AiFillStar/> :<AiOutlineStar/> } 
        </td>
        <td>{coin.market_cap_rank} </td>
        <td> 
            <Link to={`/coin/${coin.id}`}>
                <div className='flex items-center'>
                    <img className='w-6 mr-2 rounded-full' src={coin.image} alt={coin.id}/>
                    <p className='hidden sm:table-cell'>{coin.name}</p>
                </div>
            </Link>

        </td> 
                
                <td>{coin.symbol.toUpperCase()} </td>
                <td> ${coin.current_price.toLocaleString()}  </td>
                <td>
                    <p className={`${ coin.price_change_percentage_24h>0 ? 'text-green-700': ' text-red-700'}`}>
                        {coin.price_change_percentage_24h.toFixed(3) }% 
                    </p>
                </td>
                <td className='hidden w-[180px] md:table-cell'>${coin.total_volume.toLocaleString()} </td>
                <td className='hidden w-[180px] sm:table-cell'>${coin.market_cap.toLocaleString()} </td>
                <td>
                   <Sparklines data={coin.sparkline_in_7d.price}>
                        <SparklinesLine color='teal'/>
                        <SparklinesSpots />
                        <SparklinesReferenceLine type="mean" />
                   </Sparklines>
                    
                 </td>
        </tr>
  )
}

export default CoinItem