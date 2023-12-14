import React, { useEffect, useState } from "react";
import axios from "axios";
import Base from './Base Component/base';
import "./details.css";
import { BASEURL } from "./Base Component/BaseUrl";
import { Form, Link } from "react-router-dom";
import { getValue } from "@testing-library/user-event/dist/utils";
function Addtocart() {

  const [data, setMydata] = useState([])
  const[total,setTotal]= useState('')
  var a = localStorage.getItem("id")
   
  
  const[num,setNum]= useState("")

 

  useEffect(() => {
    Getdata();
 
  }, [])

  const Getdata = () => {
    const frmdata = new FormData();
    frmdata.append("user_id",a)
    axios.post(`${BASEURL}/api-cart-list.php`,frmdata)
      .then(Response => {
        console.log(Response.data.cart_list)
        setMydata(Response.data.cart_list)
        setTotal(Response.data.grand_total)
      })
  }

  const deletedata = (id)=>{
    const fromdata = new FormData();
    fromdata.append("cart_id",id)

    axios.post(`${BASEURL}/api-cart-remove-product.php`,fromdata)
    .then(Response =>{
     console.log(Response.data)
     if(Response.data.flag === "1"){
       alert(Response.data.message)
       Getdata()
     }else{
       alert(Response.data.message)
     }
    })
   }

   const Increment = (id)=>{
     setMydata(data =>{
      data.map((item)=>{
        return id === item.cart_id ?{...item, product_qty:item.product_qty +1}:item
      })
     })
   }

   const Decrement = (id)=>{
    setMydata(data =>{
     data.map((item)=>{
       return id === item.cart_id ?{...item, product_qty:item.product_qty -1}:item
     })
    })
  }



   const Updatedata = (id)=>{
   
    var updatedata = new FormData();

    updatedata.append("cart_id",id)
    updatedata.append("product_qty",num)

    axios.post(`{BASEURL}/api-cart-update.php`,updatedata)
    .then(Response =>{
     console.log(Response.data)
     if(Response.data.flag === "1"){
       alert(Response.data.message)
       Getdata()
     }else{
       alert(Response.data.message)
     }
    })
   }

  return (
    <>
      <Base>

       
      <div >
                <h1 style={{ color: "red",textAlign:"center" }}> Cart </h1>
                <table border={2} cellPadding={25}>
                  <thead  style={{color:"blue",background:"yellow"}}>
                    <tr  >
                      <th> Sr No. </th>
                      <th> Image </th>
                      <th> Name </th>
                      <th> Product Price </th>
                      <th> Description </th>
                      <th> Qty </th>
                      <th> Update </th>
                      <th> Action </th>
                    </tr>

                  </thead>
                  <tbody >
                  {data && data.length ? data.map((value, index) => {
                    return (
                      <>




                        <tr key={index + 1} >
                          <td key={value.cart_id}>{index + 1}</td>
                          <td> <img src={value.product_image} width={200} alt=""/></td>
                          <td> {value.product_name}</td>
                          <td> {value.product_price}</td>
                          <td> {value.product_details}</td>
                          <td key={value.cart_id}>
                            <button style={{background:"orange",borderRadius:"12px",fontSize:"22px"}} onClick={()=>{Increment(value.cart_id)}}> +</button>
                            <p>{value.product_qty}</p>
                            <input type="text" style={{width:"15px"}} value={value.product_qty} />
                            <button style={{background:"orange",borderRadius:"12px",fontSize:"30px"}} onClick={()=>{Decrement(value.cart_id)}}> - </button>

                          </td>
                          <td><button style={{background:"orange",borderRadius:"12px",fontSize:"30px"}} onClick={()=>{Updatedata(value.cart_id)}}> Update  </button></td>
                          <td>  <button style={{background:"red",color:"white",fontSize:"32px",borderRadius:"12px"}}  onClick={()=>{ deletedata(value.cart_id)}} > Remove </button></td>

                        </tr>
                    

                      </>
                    )
                  }) : "data not found"

                  }
                   <tr style={{background:"orange",border:"4px solid black"}}>    
                          <th colSpan={7} > Total Amount </th>
                          <th> {JSON.stringify(parseInt(total))}₹</th>
                        </tr>


                  </tbody>
                 
                </table>
              </div>  
   
           <button  style={{margin:"2%",marginLeft:"4%",background:"#4285F4",fontSize:"35px",borderRadius:"18px"}}> <Link style={{color:"white",textDecoration:"none"}} to="/AddOrder">Confirm Order  </Link> </button>
       

      </Base>
    </>
  )
}
export default Addtocart;