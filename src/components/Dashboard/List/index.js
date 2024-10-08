import React, { useState } from 'react';
import "./style.css";
import TrendingUpRoundedIcon from '@mui/icons-material/TrendingUpRounded';
import TrendingDownRoundedIcon from '@mui/icons-material/TrendingDownRounded';
import { Tooltip } from '@mui/material';
import { convertNumber } from '../../../functions/convertNumber';
import { Link } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { removeItemToWatchlist } from '../../../functions/removeItemToWatchlist';
import { saveItemToWatchlist } from '../../../functions/saveItemToWatchlist';

const List = ({coin}) => {
    const watchlist = JSON.parse(localStorage.getItem("watchlist"));
    const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id));

  return (
    <Link to={`/coin/${coin.id}`}>
        <tr className='list-row'>
            <Tooltip title="Coin Logo">
                <td className='td-img'>
                    <img src={coin.image} className='coin-logo'/>
                </td>
            </Tooltip>

            <Tooltip title="Coin Info" placement='bottom-start'>
                <td>
                    <div className='name-col'>
                        <p className='coin-symbol'>{coin.symbol}</p>
                        <p className='coin-name mobile-name'>{coin.name}</p>
                    </div>
                </td>
            </Tooltip>
            <Tooltip title="Price Change In 24Hr" placement='bottom-start'>
                {coin.price_change_percentage_24h < 0?(
                    <td className="chip-flex">
                        <div className='price-chip chip-red'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                        <div className='icon-chip chip-red td-icon'><TrendingDownRoundedIcon/></div>
                    </td>
                ):(
                    <td className="chip-flex">
                        <div className='price-chip'>{coin.price_change_percentage_24h.toFixed(2)}%</div>
                        <div className='icon-chip td-icon'><TrendingUpRoundedIcon/></div>
                    </td>
                    
                )}
            </Tooltip>
            <Tooltip title="Current Price">
                <td>
                    <h3 className='coin-price td-center-aligned' style={{color:coin.price_change_percentage_24h < 0?"var(--red)":"var(--green)"}}>${coin.current_price.toLocaleString()}</h3>
                </td>
            </Tooltip>
            <Tooltip title="Total Volume" placement='bottom-end'>
                <td>
                    <p className='total_volume td-right-aligned td-total-vol'>{coin.total_volume.toLocaleString()}</p>
                </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement='bottom-end'>
                <td className='desktop-td-mkt'>
                    <p className='market_cap td-right-aligned'>{coin.market_cap.toLocaleString()}</p>
                </td>
            </Tooltip>
            <Tooltip title="Market Cap" placement='bottom-end'>
                <td className='mobile-td-mkt'>
                    <p className='market_cap td-right-aligned'>{convertNumber(coin.market_cap)}</p>
                </td>
            </Tooltip>
            <td>
                <div
                    className={`watchlist-icon mobile-watchlist ${
                        coin.price_change_percentage_24h < 0 && "watchlist-icon-red"
                    }`}
                    style={{marginLeft:"3rem"}}
                    onClick={(e) => {
                        if (isCoinAdded) {
                            removeItemToWatchlist(e, coin.id, setIsCoinAdded);
                        } else {
                            setIsCoinAdded(true);
                            saveItemToWatchlist(e, coin.id);
                        }
                    }}
                    >
                    {isCoinAdded ? <StarIcon /> : <StarOutlineIcon />}
                </div>
            </td>
        </tr>
    </Link>
  )
}

export default List;
