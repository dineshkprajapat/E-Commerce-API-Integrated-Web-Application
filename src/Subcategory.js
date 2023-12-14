import React, { useEffect, useState } from "react";
import axios from "axios";
import Base from './Base Component/base';
import { useParams } from "react-router";
import { BASEURL } from "./Base Component/BaseUrl";
import "./ecom.css"
import { Link } from "react-router-dom";
function Subcategory(){

    const[mydata,setMydata] = useState([])
    let {id} = useParams();
    useEffect(()=>{
     Getdata();
    },[])

    const Getdata = ()=>{
      axios.get(`${BASEURL}/api-subcategory-list.php?category_id=${id}`)
      .then(Response =>{
        console.log(Response.data.sub_category_list)
        setMydata(Response.data.sub_category_list)
  })
    }
    return(
        <>
         <Base>
          <h3 className="heading"> Sub - Category</h3>
          <div className="container">
            <div className="row product">
              {mydata.map((value,index) => {
                return (
                  <div className="col-md-4">
                    <div className="card">
                      <div className="ccc">
                        <p className="text-center"><img src={value.sub_category_image} className="imw" alt=""  /></p>
                      </div>
                      <div className="card-body">
                        <h5 className="text-center"> Sub-Category_Name : {value.sub_category_name}</h5>
                        <p className="text-center"> Sub-Category_Id : {value.sub_category_id}</p>
                        <p className="text-center"><Link to={'/SingleidProduct/'+ value.sub_category_id} className="cc1"> View Product </Link></p>
                      </div>
                    </div>
                  </div>
                )
              }
              )}
            </div>
          </div>
        

      </Base>
        </>
    )
}
export default Subcategory;