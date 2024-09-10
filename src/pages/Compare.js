import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import SelectCoins from '../components/Compare/SelectCoins';
import SelectDays from '../components/Coin/SelectDays';
import { getCoinPrices } from '../functions/getCoinPrices';
import { coinObject } from '../functions/convertObject';
import { getCoinData } from '../functions/getCoinData';
import Loader from '../components/Common/Loader';
import List from '../components/Dashboard/List';
import CoinInfo from '../components/Coin/CoinInfo';
import {settingChartData} from '../functions/settingChartData';
import LineChart from '../components/Coin/LineChart';
import TogglePriceType from '../components/Coin/TogglePriceType';
import { useNavigate } from 'react-router-dom';
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';

const ComparePage = () => {
    const [crypto1,setCrypto1] = useState("bitcoin");
    const [crypto2,setCrypto2] = useState("ethereum");
    const [crypto1Data,setCrypto1Data] = useState({});
    const [crypto2Data,setCrypto2Data] = useState({});
    const [days,setDays] = useState(30);
    const [isLoading,setIsLoading] = useState(true);
    const [priceType,setPriceType] = useState("prices");
    const [chartData,setChartData] = useState({});
    const navigate = useNavigate();

    const handleDaysChange = async (event) => {
        setIsLoading(true);
        try {
            setDays(event.target.value);
            const prices1 = await getCoinPrices(crypto1,event.target.value,priceType);
            const prices2 = await getCoinPrices(crypto2,event.target.value,priceType);
            settingChartData(setChartData,prices1,prices2);
            setIsLoading(false);
        } catch (error) {
            navigate("/error");
            setIsLoading(false);
        }
        
    };

    useEffect(()=>{
        getData();
    },[]);
    
    async function getData() {
        setIsLoading(true);
        try {
            const data1 = await getCoinData(crypto1);
            if(data1){
                const data2 = await getCoinData(crypto2);
                coinObject(setCrypto1Data,data1);
                if(data2){
                    coinObject(setCrypto2Data,data2);
                    const prices1 = await getCoinPrices(crypto1,days,priceType);
                    const prices2 = await getCoinPrices(crypto2,days,priceType);
                    settingChartData(setChartData,prices1,prices2);
                    console.log("both prices",prices1,prices2)
                    setIsLoading(false);
                }
            }
        } catch (error) {
            navigate("/error");
            setIsLoading(false);
        }
    }

    const handleCoinChange = async (event,isCoins2) =>{
        setIsLoading(true);
        try {
            if(isCoins2){
                setCrypto2(event.target.value);
                const data = await getCoinData(event.target.value);
                coinObject(setCrypto2Data,data);
                const prices1 = await getCoinPrices(crypto1,days,priceType);
                const prices2 = await getCoinPrices(crypto2,days,priceType);
                if(prices1.length>0 && prices2.length>0){
                    // settingChartData(setChartData,prices);
                    console.log("both prices",prices1,prices2)
                    setIsLoading(false);
                }
            }else{
                setCrypto1(event.target.value);
                const data = await getCoinData(event.target.value);
                coinObject(setCrypto1Data,data);
            }
        } catch (error) {
            navigate("/error");
            setIsLoading(false);
        }
        
    }

    const handlePriceTypeChange =async (event, newPriceType) => {
        setIsLoading(true);
        try {
            setPriceType(newPriceType);
            const prices1 = await getCoinPrices(crypto1,days,newPriceType);
            const prices2 = await getCoinPrices(crypto2,days,newPriceType);
            settingChartData(setChartData,prices1,prices2);
            setIsLoading(false);
        } catch (error) {
            navigate("/error");
            setIsLoading(false);
        } 
    };

  return (
    <div>
      <Header/>
      {isLoading ? (
        <Loader/>
      ):(
        <>
            <div className='coins-days-flex'>
                <SelectCoins crypto1={crypto1} crypto2={crypto2} handleCoinChange={handleCoinChange}/>
                <SelectDays days={days} handleDaysChange={handleDaysChange} noPtag={true}/>
            </div>
            <div className='grey-wrapper' style={{padding:"0rem 1rem", marginBottom:"0.1rem"}}>
                <List coin={crypto1Data}/>
            </div>
            <div className='grey-wrapper data-wrap' style={{marginTop:"0.1rem"}}>
                <div>
                <p className='total_volume'>Total Volume : {crypto1Data.total_volume.toLocaleString()}</p>
                <p className='market_cap'>Market Cap : {crypto1Data.market_cap.toLocaleString()}</p>
                </div>
                {crypto1Data.price_change_percentage_24h < 0?(
                <div className="chip-flex">
                <div className='icon-chip chip-red'><TrendingDownRoundedIcon/></div>
                </div>
                ):(
                <div className="chip-flex">
                    <div className='icon-chip'><TrendingUpRoundedIcon/></div>
                </div>
                )}
            </div>
            <div className='grey-wrapper' style={{padding:"0rem 1rem", marginBottom:"0.1rem"}}>
                <List coin={crypto2Data}/>
            </div>
            <div className='grey-wrapper data-wrap' style={{marginTop:"0.1rem"}}>
                <div>
                <p className='total_volume'>Total Volume : {crypto2Data.total_volume.toLocaleString()}</p>
                <p className='market_cap'>Market Cap : {crypto2Data.market_cap.toLocaleString()}</p>
                </div>
                {crypto2Data.price_change_percentage_24h < 0?(
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
                <TogglePriceType priceType={priceType} handlePriceTypeChange={handlePriceTypeChange}/>
                <LineChart chartData={chartData} multiAxis={true} priceType={priceType}/>
            </div>
            <CoinInfo heading={crypto1Data.name} desc={crypto1Data.desc}/>
            <CoinInfo heading={crypto2Data.name} desc={crypto2Data.desc}/>
        </>
      )}
    </div>
  )
}

export default ComparePage;
