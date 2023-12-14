import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './Base Component/base';
import SLIDER from "./images/SLIDER.jpg"
import SLIDER2 from "./images/SLIDER2.jpg"
import SLIDER3 from "./images/SLIDER3.jpg"
import { Button } from 'reactstrap';
import axios from 'axios';
import "./Base Component/demo.css"
import { BASEURL } from "./Base Component/BaseUrl";
import { NavLink as ReactLink } from "react-router-dom";
import { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
function Home(){

  const [data, setData] = useState([])
  useEffect(() => {
    getdata()
  }, [])

  const getdata = () => {
    axios.get(`${BASEURL}/api-view-category.php`)
      .then(Response => {
        console.log(Response.data)
        setData(Response.data.category_list)
      })
  }

  return(
   <div>
   <Base>
   <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
  <ol class="carousel-indicators">
    <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
  </ol>
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img class="d-block w-100" src={SLIDER} alt="First slide"  width={150}/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={SLIDER2} alt="Second slide" width={150}/>
    </div>
    <div class="carousel-item">
      <img class="d-block w-100" src={SLIDER3} alt="Third slide" width={150} />
    </div>
  </div>
  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
<div class="text-center">
<Button style={{fontSize:"30px",background:"green",border:"3px solid black",position:"absolute",top:"750px",right:"590px",borderRadius:"25px"}}  tag={ReactLink} to="/Product" >Shop Now </Button>
</div>


          <h3 className="heading"> Category</h3>
          <div className="container">
            <div className="row product">
              { data.map((value,index) => {
                return (
                  <div className="col-md-4">
                    <div className="card">
                      <div className="ccc">
                        <p className="text-center"><img src={value.category_image} className="imw" alt=""  /></p>
                      </div>
                      <div className="card-body">
                        <h5 className="text-center">Category_Name : {value.category_name}</h5>
                        <p className="text-center"> Category_Id : {value.category_id}</p>
                        <p className="text-center" key={value.category_id}><Link to={'/subcategory/'+ value.category_id} className="cc1"> Sub- Category</Link></p>
                      </div>
                    </div>
                  </div>
                )
              }
              )}
            </div>
          </div>

   </Base>

   </div>
  )
}
export default Home;