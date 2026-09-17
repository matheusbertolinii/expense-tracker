import React from 'react'
import { TbPigMoney } from "react-icons/tb";
import { TbCameraSelfie } from "react-icons/tb";


const Header = () => {
  return (
    <header className='hero'>
      <div className='title'>
        <TbPigMoney className='pigIcon' />
        <h1>Expendio</h1>
      </div>
    </header>
  )
}

export default Header