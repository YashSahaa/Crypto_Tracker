import React from 'react';
import errorImg from '../assets/errorImg.webp';
import { Link } from 'react-router-dom';
import Button from '../components/Common/Button';

const ErrorPage = () => {
  return (
    <div className='error-wrapper'>
      <img src={errorImg}/>
      <h3>There is limit with api used in this project , error occured because of limit acrossed please come back after sometimes .</h3>
      <Link to='/'>
        <Button text={"back to Home"} onClick={() => console.log("btn clicked")}/>
      </Link>
    </div>
  )
}

export default ErrorPage
