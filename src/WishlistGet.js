import React, { useEffect, useState } from "react";
import axios from "axios";
import Base from './Base Component/base';
import { BASEURL } from "./Base Component/BaseUrl";
import { useNavigate } from "react-router";
import "./details.css"
function AddtoWishlist() {

  const [data, setMydata] = useState([])
  var a = localStorage.getItem("id")
  const[num,setNum]= useState(1)
   
  const navigate = useNavigate();
  

  useEffect(() => {
    Getdata();
    setNum(num)
  }, [])

  const Getdata = () => {
    const frmdata = new FormData();
    frmdata.append("user_id",a)
    axios.post(`${BASEURL}/api-wishlist-view.php`,frmdata)
      .then(Response => {
        console.log(Response.data.wishlist)
        setMydata(Response.data.wishlist)
      
      })
  }

  const deletedata = (id)=>{
    const fromdata = new FormData();
    fromdata.append("wishlist_id",id)

    axios.post(`${BASEURL}/api-wishlist-remove.php`,fromdata)
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


   const Addtocart = (id) =>{
    const frmdata = new FormData();

    frmdata.append("user_id",a)
    frmdata.append("product_id",id)
    frmdata.append("product_qty",1)

    axios.post( `${BASEURL}/api-cart-insert.php`,frmdata)
    .then(Response=>{
       console.log(Response.data)
       if( Response.data.flag === "1"){
            alert(Response.data.message)
            navigate("/AddToCart")
          }else{
            alert(Response.data.message)
           
          }
    })
   }
  return (
    <>
      <Base>

       
      <div >
                <h1 style={{ color: "white",textAlign:"center",background:"black" ,margin:"30px"}}> WishList </h1>
                <table border={2} cellPadding={20}>
                  <thead  style={{color:"blue",background:"yellow"}}>
                    <tr  >
                      <th> Sr No. </th>
                      <th> Image </th>
                      <th> Name </th>
                      <th> Product Price </th>
                      <th> Description </th>
                      <th> Action </th>
                    </tr>

                  </thead>
                  <tbody >
                  {data && data.length ? data.map((value, index) => {
                    return (
                      <>


                        <tr key={index + 1} >
                          <td key={value.wishlist_id}>{index + 1}</td>
                          <td> <img src={value.product_image} width={200} alt=""/></td>
                          <td> {value.product_name}</td>
                          <td> {value.product_price}</td>
                          <td> {value.product_details}</td>
                          <td>  <button style={{background:"red",color:"white",fontSize:"32px",borderRadius:"12px"}}  onClick={()=>{ deletedata(value.wishlist_id)}} > Remove </button>
                        <p><button className="cc1" style={{marginTop:"8px"}} onClick={()=>{Addtocart(value.product_id)}}> Add To Cart </button></p></td>

                        </tr>
                    

                      </>
                    )
                  }) : "Empty WishList"

                  }
                  


                  </tbody>
                 
                </table>
              </div>  
   
          
       

      </Base>
    </>
  )
}
export default AddtoWishlist;