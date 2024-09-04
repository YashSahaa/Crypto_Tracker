import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import { get100Coins } from '../functions/get100Coins';
import { Link } from 'react-router-dom';
import Button from '../components/Common/Button';

const WatchList = () => {
    const [coins,setCoins] = useState([]);
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));

    const getData = async () => {
        const myCoins = await get100Coins();
        if(myCoins){
          setCoins(myCoins.filter((coin)=>watchlist.includes(coin.id)));
        } 
    }

    useEffect(()=>{
        getData();
    },[]);

  return (
    <div>
      <Header/>
      {watchlist.length>0?(
        <TabsComponent coins={coins}/>
      ):(
        <div>
          <h1 style={{ textAlign: "center" }}>
            Sorry, No Items In The Watchlist.
          </h1>
            <div
                style={{display: "flex",justifyContent: "center",margin: "2rem",}}>
                <Link to="/dashboard">
                    <Button text="Dashboard" onClick={() => console.log("btn click")}/>
                </Link>
            </div>
        </div>
      )}
    </div>
  )
}

export default WatchList;
