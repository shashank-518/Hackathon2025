import React from 'react'
import './Card.css'

import { useNavigate } from 'react-router-dom'

const Card = () => {

    const navigate = useNavigate();

    const handleClick = () => {
        navigate('/Fraud'); 
      };

      const handleClick1 = () => {
        navigate('/Tip'); 
      };

      const handleClick2 = () => {
        navigate('/Safety'); 
      };


  return (
    <div className='card'>

        <h1>Police</h1>
        <div className='imagecenter'>
        <img src="https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-policeman-avatar-png-image_13805775.png" alt="" />
        <ul>
            <li><button className="carddetails" onClick={handleClick} >Fraud</button></li>
            <li><button className="carddetails" onClick={handleClick1} >Tip</button></li>
            <li><button className="carddetails" onClick={handleClick2} >Human Safety</button></li>
        </ul>

        </div>


      
    </div>
  )
}

export default Card
