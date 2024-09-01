import React, { useState } from 'react';
import "./style.css";

const CoinInfo = ({heading,desc}) => {
    const [flag,setFlag] = useState(true);
    const shortDesc = desc.slice(0,350) + "<p style='color:var(--grey);cursor:pointer;'> Read More...</p>";
    const longDesc = desc + "<p style='color:var(--grey);cursor:pointer;'> ...Read Less</p>";
  return (
    <div className='grey-wrapper' style={{padding:"0rem 1rem"}}>
      <h2 className='coin-info-heading' >{heading}</h2>
      {desc.length >200 ? (
        <p onClick={() => setFlag(!flag)} className='coin-info-desc' dangerouslySetInnerHTML={{__html : flag?shortDesc:longDesc}}/>
      ):(
        <p className='coin-info-desc' dangerouslySetInnerHTML={{__html : desc}}/>
      )}
    </div>
  )
}

export default CoinInfo;