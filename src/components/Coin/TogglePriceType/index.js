import React, { useState } from 'react';
import "./style.css";
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function TogglePriceType({priceType,handlePriceTypeChange}) {
  
  return (
    <div className='toggle-prices'>
      <ToggleButtonGroup
        value={priceType}
        exclusive
        onChange={handlePriceTypeChange}
        sx={{
          "&.Mui-selected": {
            color: "var(--blue) !important",
          },
          borderColor: "var(--blue)",
          border: "unset !important",
          "& .MuiToggleButtonGroup-grouped": {
            border: "1px solid var(--blue)!important",
            borderColor: "unset",
            color: "var(--blue) !important ",
          },
          "& .MuiToggleButton-standard": {
            color: "var(--blue) !important",
          },
        }}
      >
        <ToggleButton className='.toggle-btn' value="prices">Price</ToggleButton>
        <ToggleButton className='.toggle-btn' value="market_caps">Market Cap</ToggleButton>
        <ToggleButton className='.toggle-btn' value="total_volumes">Total Volume</ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}
