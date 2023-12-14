import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderList.css"
import Base from "./Base Component/base";
import { Link } from "react-router-dom";
import { BASEURL } from "./Base Component/BaseUrl";
function OrderList() {

  
  var a = localStorage.getItem("id")
   
  
  const[data,setData]= useState("")

  useEffect(() => {
    Getdata();
   
  }, [])

  const Getdata = () => {
    const frmdata = new FormData();
    frmdata.append("user_id",a)
    axios.post(`${BASEURL}/api-order-list.php`,frmdata)
      .then(Response => {
        console.log(Response.data.order_list)
       setData(Response.data.order_list)
      })
  }
  
  


  return (
    <>
      <Base>

       
      <div >
                <h1 style={{ color: "red",textAlign:"center" }}> Order Details </h1>
                <table className="tablee" cellPadding={20}>
                  <thead >
                    <tr  >
                      <th> Sr No. </th>
                      <th> Order Id </th>
                      <th> Order Date </th>
                      <th> Shipping Name </th>
                      <th> Order Address </th>
                      <th> total_amount </th>
                      <th> Order Status </th>
                      <th> Payment Method</th>
                      <th> Action </th>
                    </tr>

                  </thead>
                  <tbody >
                 
                  {data && data.length ? data.map((value, index) => {
                    return (
                      <>


                        <tr key={index + 1} >
                          <td key={value.order_id}>{index + 1}</td>
                          <td>{value.order_id}</td>
                          <td> {value.order_date}</td>
                          <td> {value.shipping_name}</td>
                          <td> {value.shipping_address}</td>
                          <td> {value.total_amount}</td>
                          <td> {value.order_status}</td>
                          <td> {value.payment_method}</td>
                          <td> <button  style={{margin:"2%",marginLeft:"4%",background:"orange",fontSize:"35px",borderRadius:"18px"}}> <Link style={{color:"white",textDecoration:"none"}} to={'/CancelOrder/'+ value.order_id}>Cancel Order </Link> </button></td>
                        
                        </tr>
                    

                      </>
                    )
                  }) : "data not found"

                  }


                  </tbody>
                 
                 
                </table>
              </div>  
   
          
       

      </Base>
    </>
  )
}
export default OrderList;