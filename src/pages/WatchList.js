import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import { get100Coins } from '../functions/get100Coins';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/Common/Button';

const WatchList = () => {
    const [coins,setCoins] = useState([]);
    const navigate = useNavigate();
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));

    const getData = async () => {
      try {
        const myCoins = await get100Coins();
        if(myCoins){
          setCoins(myCoins.filter((coin)=>watchlist.includes(coin.id)));
        }
      } catch (error) {
        navigate("/error");
      }  
    }

    useEffect(()=>{
        getData();
    },[]);

  return (
    <div>
      <Header/>
      {watchlist && watchlist.length>0?(
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
