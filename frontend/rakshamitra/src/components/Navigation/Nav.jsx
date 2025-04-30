import React from 'react'
import './Navigation.css'
import MyImage from '../../../public/mitra.jpg'

const Nav = () => {
  return (
    <>
      <nav className="navbar">
        <div className="firstpart">
          <img
            src={MyImage}
            alt="image"
          />
          <h1>RAKSHAMITRA</h1>
        </div>
        <div className="mainpart">
          <ul>
            <li>
              <h3 className='h3text' >Home</h3>
            </li>
            <li>
              <h3 className='h3text'>Services</h3>
            </li>
            <li>
              <h3 className='h3text'>About us</h3>
            </li>
          </ul>
        </div>

     


        {/* <div className="authPart">
            <button className="login" >Login</button>
            <button className="start" >Get Started</button>
        </div> */}

    

        

      </nav>
    </>
  )
}

export default Nav;
