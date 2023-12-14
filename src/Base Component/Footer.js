import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css"
function Footer(){
    return(
        <>
         <section className="CAA">
    <h4> About Us </h4>
    <p>A Contact Us page is essential to building a brands website as it allows
      visitors to contact you easily without leaving their browser.<br></br>
      They also give you the opportunity to capture leads and improve customer service.</p>
    <div className="icons">
      <Link href="">
      <i class="fa fa-facebook-square" aria-hidden="true"></i>
      </Link>
      <Link href="">
      <i class="fa fa-instagram" aria-hidden="true"></i>
      </Link>
      <Link href="">
      <i class="fa fa-linkedin-square" aria-hidden="true"></i></Link>
     
      <Link href="">
      <i class="fa fa-whatsapp" aria-hidden="true"></i>
      </Link>
    </div>
    <hr></hr>
    <p className="copyright">Copyright© 2023 <span>Dinesh</span> All rights reserved</p>
  </section>
        </>
    )
}
export default Footer;