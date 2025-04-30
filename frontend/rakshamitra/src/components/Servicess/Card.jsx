import React from 'react'
import './Card.css'

import { useNavigate } from 'react-router-dom'

const Card = (props) => {

    const navigate = useNavigate();

    const handleClick = () => {
      navigate(`/${props.item1}`);
      };

      const handleClick1 = () => {
        navigate(`/${props.item2}`);
 
      };

      const handleClick2 = () => {
        navigate(`/${props.item3}`);
      };


  return (
    <div className='card'>

        <h1>{props.name}</h1>
        <div className='imagecenter'>
        <img src={props.img} alt="" />
        <ul>
            <li><button className="carddetails" onClick={handleClick} >{props.item1}</button></li>
            {props.item2 && <li><button className="carddetails" onClick={handleClick1} >{props.item2}</button></li>}
            {props.item3 && <li><button className="carddetails" onClick={handleClick2} >{props.item3}</button></li>}
        </ul>

        </div>


      
    </div>
  )
}

export default Card
