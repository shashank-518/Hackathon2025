import React from 'react'
import './Card.css'

const Card = () => {
  return (
    <div className='card'>

        <h1>Police</h1>
        <div className='imagecenter'>
        <img src="https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-policeman-avatar-png-image_13805775.png" alt="" />
        <ul>
            <li><button className="carddetails" >Fraud</button></li>
            <li><button className="carddetails" >Tip</button></li>
            <li><button className="carddetails" >Human Safety</button></li>
        </ul>

        </div>


      
    </div>
  )
}

export default Card
