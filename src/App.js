 
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { ThemeProvider } from "./context/ThemeContext";

import axios from 'axios'
import { useEffect, useState } from "react";

import CoinPage from "./routes/CoinPage";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import Account from "./routes/Account";
import Footer from "./components/Footer";
import { AuthContextProvider } from "./context/AuthContext";

function App() {
  const [coins,setCoins]=useState([])
  
  const url='https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true'

  useEffect(()=>{
    axios.get(url).then(response=>{
      setCoins(response.data);
      
    })  
  },[url])

  //console.log(coins);
  return (
    
    <ThemeProvider>
      <AuthContextProvider>

        <Navbar/>
        <Routes>
          <Route path="/" element={<Home coins={coins}/>}/>
          <Route path="/signin" element={<SignIn/>}/>
          <Route path="/signup" element={<SignUp/>}/>
          <Route path="/account" element={<Account/>}/> 
          <Route path='/coin/:coinId' element={<CoinPage/>} /> 
        </Routes>
        <Footer/>
        
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;

/*
    <Route path='/coin/:coinId' element={<CoinPage/>} >
      <Route path=":coinId"/>
    </Route> 
*/