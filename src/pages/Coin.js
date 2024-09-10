import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Common/Header';
import Loader from '../components/Common/Loader';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import { coinObject } from '../functions/convertObject';
import { getCoinData } from '../functions/getCoinData';
import { getCoinPrices } from '../functions/getCoinPrices';
import LineChart from '../components/Coin/LineChart';
import SelectDays from '../components/Coin/SelectDays';
import { settingChartData } from '../functions/settingChartData';
import TogglePriceType from '../components/Coin/TogglePriceType';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';

const Coin = () => {
  const {id} = useParams();
  const [isLoading,setIsLoading] = useState(true);
  const [coinData,setCoinData] = useState();
  const [days,setDays] = useState(30);
  const [chartData,setChartData] = useState({});
  const [priceType, setPriceType] = useState('prices');
  const navigate = useNavigate();

  useEffect(() =>{
      if(id){
          getData();
      }
  },[id]);

  async function getData() {
    try {
      const data = await getCoinData(id);
      console.log(data);
      if(data){
        coinObject(setCoinData,data);
        const prices = await getCoinPrices(id,days,priceType);
        if(prices.length>0){
          settingChartData(setChartData,prices);
          setIsLoading(false);
        }
      }
    } catch (error) {
      navigate("/error");
      setIsLoading(false);
    }
    
  }

  const handleDaysChange = async (event) => {
    setIsLoading(true);
    try {
      setDays(event.target.value);
      const prices = await getCoinPrices(id,event.target.value,priceType);
      if(prices.length>0){
        settingChartData(setChartData,prices);
        setIsLoading(false);
      }
    } catch (error) {
      navigate("/error");
      setIsLoading(false);
    }
    
  };

  const handlePriceTypeChange =async (event, newPriceType) => {
    setIsLoading(true);
    try {
      setPriceType(newPriceType);
      const prices = await getCoinPrices(id,days,newPriceType);
      if(prices.length>0){
        settingChartData(setChartData,prices);
        setIsLoading(false);
      }
    } catch (error) {
      navigate("/error");
      setIsLoading(false);
    }
  };
  console.log("coinsdata",coinData);

  return (
    <div>
      <Header/>
      {isLoading ? (
        <Loader/>
      ):(
        <>
          <div className='grey-wrapper' style={{padding:"0rem 1rem"}}>
            <List coin={coinData}/>
          </div>
          <div className='grey-wrapper data-wrap'>
            <div>
              <p className='total_volume'>Total Volume : {coinData.total_volume.toLocaleString()}</p>
              <p className='market_cap'>Market Cap : {coinData.market_cap.toLocaleString()}</p>
            </div>
            {coinData.price_change_percentage_24h < 0?(
            <div className="chip-flex">
              <div className='icon-chip chip-red'><TrendingDownRoundedIcon/></div>
            </div>
            ):(
              <div className="chip-flex">
                <div className='icon-chip'><TrendingUpRoundedIcon/></div>
              </div>
            )}
          </div>
          <div className='grey-wrapper' style={{padding:"0rem 1rem"}}>
            <SelectDays days={days} handleDaysChange={handleDaysChange}/>
            <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
            <LineChart chartData={chartData} priceType={priceType}/>
          </div>
          <CoinInfo heading={coinData.name} desc={coinData.desc}/>
        </>
      )}
    </div>
  )
}

export default Coin;
