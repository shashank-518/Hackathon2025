import React from 'react'
import './Card.css'

import { useNavigate } from 'react-router-dom'

const Card = (props) => {

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

        <h1>{props.name}</h1>
        <div className='imagecenter'>
        <img src={props.img} alt="" />
        <ul>
            <li><button className="carddetails" onClick={handleClick} >{props.item1}</button></li>
            <li><button className="carddetails" onClick={handleClick1} >{props.item2}</button></li>
            <li><button className="carddetails" onClick={handleClick2} >{props.item3}</button></li>
        </ul>

        </div>


      
    </div>
  )
}

export default Card
