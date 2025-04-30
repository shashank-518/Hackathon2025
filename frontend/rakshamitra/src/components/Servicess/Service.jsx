import React from 'react'
import './Services.css'
import Card from './Card'

const Service = () => {
  return (
    <div className='servicediv'>
      <h1>SEVA</h1>

      <div className='Cardrow' >
      <Card name="police"  img = "https://png.pngtree.com/png-vector/20240910/ourmid/pngtree-policeman-avatar-png-image_13805775.png"  item1 = "Fraud" item2 = "Tip" item3 = "Safety" />
      <Card name ="Ambulance" img = "https://img.freepik.com/premium-vector/ambulance-car-icon-clipart-avatar-logotype-isolated-vector-illustration_955346-110.jpg" item1="AI"   />

      <Card name ="Fire Ambulance" img = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBfgPk5aQLBUl0C7J6OU9MlKVL_e6CEI4CBA&s" item1="Location" />
      

      </div>
      
    </div>
  )
}

export default Service
