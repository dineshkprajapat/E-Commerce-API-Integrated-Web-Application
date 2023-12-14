import React, { useEffect, useState } from "react";
import axios from "axios";
import Base from "./Base Component/base";
import { BASEURL } from "./Base Component/BaseUrl";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
function SingleIdProduct(){

    const[mydata,setMydata] = useState([])
    let {id} = useParams();

    useEffect(()=>{
     Getdata();
    }, [])

    const Getdata = ()=>{
      axios.get(`${BASEURL}/api-view-product.php?sub_category_id=${id}`)
      .then(Response =>{
        console.log(Response.data.product_list)
        setMydata(Response.data.product_list)
  })
    }
    return(
        <>
         <Base>
          <h3 className="heading"> Product </h3>
          <div className="container">
            <div className="row product">
              {mydata.map((value,index) => {
                return (
                  <div className="col-md-4">
                    <div className="card">
                      <div className="ccc">
                        <p className="text-center"><img src={value.product_image} className="imw" alt=""  /></p>
                      </div>
                      <div className="card-body">
                        <h5 className="text-center"> Product_Name : {value.product_name}</h5>
                        <p className="text-center"> Product_Id : {value.product_id}</p>
                        <p className="text-center"><Link to={'/details/'+ value.product_id} className="cc1"> Details </Link></p>
   
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
export default SingleIdProduct;