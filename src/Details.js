import React, { useEffect, useState } from "react";
import axios from "axios";
import "./singup.css";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import "./ecom.css";
import Base from './Base Component/base';
import { BASEURL } from "./Base Component/BaseUrl";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
import "./details.css"
import "./OrderList.css"

function Details() {

  const [data, setMydata] = useState([])
  const[ratingview,setRatingview]= useState([])
  let { id } = useParams();
  const navigate = useNavigate();
  const[num,setNum]= useState(1)
  const userid = localStorage.getItem("id")

  const[mydata,setUpdate] = React.useState({
    fullname:"",
    email:"",
    number:"",
    date:"",
    message:""
});


var UpdateValue = (e)=>{
  setUpdate((mydata)=>({
      ...mydata,
      [e.target.name]:e.target.value
  }));
} 

  useEffect(() => {
    Getdata();
   setNum(num);
   RatingView();
  }, [])

  const Getdata = () => {
    axios.get(`${BASEURL}/api-view-product.php?product_id=${id}`)
      .then(Response => {
        console.log(Response.data.product_list)
        setMydata(Response.data.product_list)
      })
  }
   
   const Addtocart = (e) =>{
    e.preventDefault();
    const frmdata = new FormData();
    frmdata.append("user_id",userid)
    frmdata.append("product_id",id)
    frmdata.append("product_qty",1)

    axios.post( `${BASEURL}/api-cart-insert.php`,frmdata)
    .then(Response=>{
       console.log(Response.data)
       if( Response.data.flag === "1"){
            alert(Response.data.message)
            navigate('/AddToCart')
          }else{
            alert(Response.data.message)
           
          }
    })
   }
   const Addtowhishlist = (e) =>{
    e.preventDefault();
    const frmdata = new FormData();
    frmdata.append("user_id",userid)
    frmdata.append("product_id",id)

    axios.post(`${BASEURL}/api-wishlist-add.php`,frmdata)
    .then(Response=>{
       console.log(Response.data)
          if( Response.data.flag === "1"){
            alert(Response.data.message)
             navigate('/WishlistGet')
          }else{
            alert(Response.data.message)
            navigate('/WishlistGet')
          }
    })
   }

   
var ResetData= (e)=>{
  e.preventDefault();
 setUpdate({
  fullname:"",
  email:"",
  number:"",
  date:"",
  message:""
 })
} ;

   var SubmitData =(e)=>{
    e.preventDefault();

  setUpdate({
    fullname:"",
    email:"",
    number:"",
    date:"",
    message:""
   })
 

     var frmdata = new FormData();
     frmdata.append("product_id",id);
     frmdata.append("user_id",userid);
     frmdata.append("rating_name",mydata.fullname);
     frmdata.append("rating_email",mydata.email);
     frmdata.append("rating_number",mydata.number);
     frmdata.append("rating_date",mydata.date);
     frmdata.append("rating_message",mydata.message)
 
   axios.post(`${BASEURL}/api-rating-add.php`,frmdata)
   .then(Response=>{
     console.log(Response.data);
     if(Response.data.flag === "1"){
      alert(Response.data.message)
      RatingView();
     }else{
      alert(Response.data.message)
     }
   }).catch(err =>{
     console.warn(err)
   })

   
}

const RatingView = () => {

  var frmdata = new FormData();

  frmdata.append("user_id",userid)
  frmdata.append("product_id",id)

  axios.post(`${BASEURL}/api-rating-view.php`,frmdata)
    .then(Response => {
      console.log(Response.data.rate_list)
     setRatingview(Response.data.rate_list)
    })
}
  return (
    <>
         <Base>

       
<div >
          <h1 style={{ color: "red",textAlign:"center",marginBottom:"20px",marginTop:"20px" }}> Details </h1>
          <table border={2} cellPadding={25}>
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
                    <td key={value.product_id}>{index + 1}</td>
                    <td> <img src={value.product_image} width={200} alt=""/></td>
                    <td> {value.product_name}</td>
                    <td> {value.product_price}</td>
                    <td> {value.product_details}</td>
                   
                    <td> <p className="text-center"> <button className="cc1" onClick={Addtocart}> Add To Cart </button></p>
                        <p className="text-center"> <button style={{background:"black",color:"white",fontSize:"28px"}} onClick={Addtowhishlist}> Add To WishList </button></p></td>
                   

                  </tr>
              

                </>
              )
            }) : "data not found"

            }
           


            </tbody>
           
          </table>
        </div>  

        <Container  style={{marginTop:"55px"}}>
           <Row>
            <Col sm={{size:6,offset:3}}>
            <Card color="secondary" className="card">
                    <CardHeader style={{backgroundColor:"blue"}}>
                        <h1 style={{color:"white"}}>Rating !! </h1>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={SubmitData}>

                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="name">  Name</Label>
                                <Input style={{height:"53px"}} type="text" id="name" name="fullname" placeholder="Enter Name" onChange={UpdateValue} value={mydata.fullname} />
                            </FormGroup>
                            
                        
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="email"> Email</Label>
                                <Input style={{height:"53px"}} type="email" id="name" name="email" placeholder="Enter Email" onChange={UpdateValue} value={mydata.email}  />
                            </FormGroup>
                             
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="mobile"> Number </Label>
                                <Input style={{height:"53px"}} type="number" id="name" name="number" placeholder=" Enter Number" onChange={UpdateValue} value={mydata.number}  />
                            </FormGroup>
                             
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="date"> Date</Label>
                                <Input style={{height:"53px"}} type="date" id="date" name="date" placeholder=" Enter Date" onChange={UpdateValue} value={mydata.date} />
                            </FormGroup>
                             
                               
                               <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="message"> Message</Label>
                                <Input style={{height:"120px"}} type="textarea" id="message" name="message" placeholder=" Enter Message" onChange={UpdateValue} value={mydata.message}  />
                            </FormGroup>
                       
                            <Container className="text-center">
                                <Button style={{fontSize:"22px"}} color="dark"  > Rating Now  </Button>
                                <Button style={{marginLeft:"12px",fontSize:"22px"}} color="light" type="reset" onClick={ResetData}>Reset</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
           </Row>
            </Container>


            <div >
                <h1 style={{ color: "red",textAlign:"center" }}> Rating Details </h1>
                <table className="tablee" cellPadding={10}>
                  <thead >
                    <tr  >
                      <th> Sr No. </th>
                      <th> Rating Number </th>
                      <th> Rating Name </th>
                      <th> Rating Message</th>
                      <th> Product  Name </th>
                      <th> Product Image</th>
                    
                    </tr>

                  </thead>
                  <tbody >
                 
                  {ratingview && ratingview.length ? ratingview.map((value, index) => {
                    return (
                      <>


                        <tr key={index + 1} >
                          <td >{index + 1}</td>
                          <td>{value.rating_number}</td>
                          <td> {value.rating_name}</td>
                          <td> {value.rating_message}</td>
                          <td> {value.product_name}</td>
                          <td><img  src={value.product_image} alt=""  width={80}/></td>
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
export default Details;