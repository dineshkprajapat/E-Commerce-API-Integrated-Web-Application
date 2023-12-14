import React, { useEffect, useState } from "react";
import axios from "axios";
import Base from "./Base Component/base";
import "./ecom.css";
import { BASEURL } from "./Base Component/BaseUrl";
import { Link } from "react-router-dom";
function Category(){


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
      <>
      <Base>

      <h1 style={{margin:"20px",color:"green"}}> Hello....{JSON.stringify(localStorage.getItem("name"))}</h1>
          <h3 className="heading"> View - Category</h3>
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
                        <p className="text-center" key={value.category_id}><Link to={'/Subcategory/'+ value.category_id} className="cc1"> Sub- Category</Link></p>
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
export default Category;