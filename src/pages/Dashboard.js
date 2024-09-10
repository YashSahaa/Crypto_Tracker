import React, { useEffect, useState } from 'react';
import Header from '../components/Common/Header';
import TabsComponent from '../components/Dashboard/Tabs';
import Search from '../components/Dashboard/Search';
import PaginationComponent from '../components/Dashboard/Pagination';
import Loader from '../components/Common/Loader';
import BackToTop from '../components/Common/BackToTop';
import { get100Coins } from '../functions/get100Coins';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [coins,setCoins] = useState([]);
  const [search,setSearch] = useState("");
  const [paginationCoins,setPaginationCoins] = useState([]);
  const [page,setPage] = useState(1);
  const [isLoading,setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(()=>{
    getData();
  },[]);

  const onSearchChange = (e) =>{
    setSearch(e.target.value);
  }

  const handlePageChange = (event,value)=>{
    setPage(value);
    let previousIndex = (value-1)*10;
    setPaginationCoins(coins.slice(previousIndex,previousIndex+10));
  }

  let filteredCoin = coins.filter((item) =>{
    return (item.name.toLowerCase().includes(search.toLowerCase()) || item.symbol.toLowerCase().includes(search.toLowerCase()));
  })

  

  const getData = async () => {
    try {
      
      const myCoins = await get100Coins();
      if(myCoins){
        setCoins(myCoins);
        setPaginationCoins(myCoins.slice(0,10));
        setIsLoading(false);
      }
    } catch (error) {
      navigate("/error");
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header/>
      <BackToTop/>
      {isLoading ? (
        <Loader/>
      ):(
        <div>
          <Search search={search} onSearchChange={onSearchChange}/>
          <TabsComponent coins={search ? filteredCoin : paginationCoins}/>
          {!search && (<PaginationComponent page={page} handlePageChange={handlePageChange}/>)}
        </div>
      )}
    </>
  )
}

export default DashboardPage;
