import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Sparklines, SparklinesLine, SparklinesSpots, SparklinesReferenceLine } from 'react-sparklines';
import {FaTwitter, FaFacebook, FaReddit, FaGithub} from 'react-icons/fa'

import DOMPurify from 'dompurify';
import { useParams } from 'react-router-dom';

function CoinPage() {

    const params=useParams();
const [coin,setCoin]=useState({})

    const url =`https://api.coingecko.com/api/v3/coins/${params.coinId}?localization=false&sparkline=true`;

    useEffect(()=>{
        axios.get(url).then(response=>{
            setCoin(response.data);
        });

    },[url])

    
 
    console.log(coin);
    return (
        <div className='rounded-div my-12 p-8'>
            <div className='flex py-8' >
                 <img  className='w-20 mr-8' src={coin.image?.large} alt=''/>
                 <div> 
                    <p className='text-3xl font-bold'>{coin?.name}</p>
                    <p>{coin?.symbol?.toUpperCase()} /USD </p>
                 </div>
             </div>

            {/** GRID */}
            <div className='grid md:grid-cols-2 gap-8 '>
               <div>
                    <div className='flex justify-between'>
                        {coin.market_data?.current_price ? (<p>${coin.market_data.current_price.usd.toLocaleString()} </p>) : null}
                        <p>7 Day</p>
                    </div>
                    
                    <div>
                        <Sparklines data={coin?.market_data?.sparkline_7d?.price}>
                            <SparklinesLine color='teal'/>
                            <SparklinesSpots />
                            <SparklinesReferenceLine type="mean" />
                        </Sparklines>
                    </div>

                    <div className='flex justify-between py-4'>
                        <div>
                             <p className='text-gray-500 text-sm '> Market Cap</p>
                             <p>${coin.market_data?.market_cap?.usd.toLocaleString()} </p> 
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Volume (24h)</p>
                            <p>${coin.market_data?.total_volume?.usd.toLocaleString()} </p>
                        </div>
                    </div>

                    <div className='flex justify-between py-4'>
                        <div>
                            <p className='text-gray-500 text-sm'>24h High </p>
                            <p>${coin.market_data?.high_24h?.usd.toLocaleString()} </p> 
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>24h Low </p>
                            <p>${coin.market_data?.low_24h?.usd.toLocaleString()} </p>
                        </div>
                    </div>

                </div> 

                <div>
                    <p className='text-xl font-bold'>Market Stats</p>
                    <div className='flex justify-between py-4'>
                        <div>
                            <p className='text-gray-500 text-sm'>Market Rank</p>
                            {coin?.market_cap_rank}
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Hashing Algorithm </p>
                            <p>{coin?.hashing_algorithm} </p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'>Trust Score</p>
                            <p>{coin?.liquidity_score?.toFixed(2) }</p>
                        </div>
                    </div>

                    <div className='flex justify-between py-4'>
                        <div>
                            <p className='text-gray-500 text-sm'>Price Change (24h) </p>
                            <p> {coin.market_data?.price_change_percentage_24h?.toFixed(2)} %</p>
                        </div>
                        
                        <div>
                            <p className='text-gray-500 text-sm'>Price Change (7d) </p>
                            <p> {coin?.market_data?.price_change_percentage_7d?.toFixed(2)} %</p>
                        </div>
                        
                        <div>
                            <p className='text-gray-500 text-sm'>Price Change (14d) </p>
                            <p> {coin?.market_data?.price_change_percentage_14d?.toFixed(2)} %</p>
                        </div>
                    </div>

                    <div className='flex justify-between py-4'>
                        <div>
                            <p className='text-gray-500 text-sm'> Price Change(30d)</p>
                            <p> {coin?.market_data?.price_change_percentage_30d?.toFixed(2)} %</p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'> Price Change(60d)</p>
                            <p> {coin?.market_data?.price_change_percentage_60d?.toFixed(2)} %</p>
                        </div>
                        <div>
                            <p className='text-gray-500 text-sm'> Price Change(1y)</p>
                            <p> {coin?.market_data?.price_change_percentage_1y?.toFixed(2)} %</p>
                        </div>
                    </div>

                    <div className='flex justify-around p-8 text-accent'>
                        <FaTwitter />
                        <FaFacebook/>
                        <FaReddit/>
                        <FaGithub/>
                    </div>
                </div>            
            </div>
          {/** GRID */}

          {/****DESCRIPTION ****/} 
          <div className='py-4'> 
            <p className='text-2xl font-bold py-4  '>About {coin.name}</p>
            <p dangerouslySetInnerHTML={{__html: DOMPurify.sanitize(coin.description ? coin.description.en : ''),}} ></p>
          </div> 


         
        </div>
  )
}

export default CoinPage