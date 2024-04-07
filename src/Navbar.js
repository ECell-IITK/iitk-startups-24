import React from 'react'
import "./app.css";

const Navbar = () => {
  return (
    <div className='nav-glass' style={{position:'fixed',top:"0",height:"55px",width:"100vw",overflow:"hidden",zIndex:"2"}}>
      <div style={{height:"100%",display:"flex",justifyContent:"center",alignContent:"center",width:"fit-content"}}>
        <img src="./images/logo.png" alt="E-Cell" srcset="" height="40px" />
      </div>
    </div>
  )
}

export default Navbar
