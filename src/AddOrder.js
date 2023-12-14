import "./singup.css";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from "./Base Component/base";
import React from "react";
import axios from "axios";
import { BASEURL } from "./Base Component/BaseUrl";
import { useNavigate } from "react-router";
function Addorder(){
    
const[mydata,setUpdate] = React.useState({
    shippingname:"",
    shippingmobile:"",
    shippingaddress:"",
    payment:""
    
});

var id = localStorage.getItem("id")
const[myerror,setError]= React.useState({})
const navigate = useNavigate();
var UpdateValue = (e)=>{
    setUpdate((mydata)=>({
        ...mydata,
        [e.target.name]:e.target.value
    }));
} 


var ResetData= (e)=>{
    e.preventDefault();
   setUpdate({
    shippingname:"",
    shippingmobile:"",
    shippingaddress:"",
    payment:""
   })
} ;

const Formvalidation = () => {
    let isvalid = true;
    var myerror = {};

    if (!mydata.shippingname) {
      myerror.shippingname = "Enter Name ";
      isvalid = false;
    }else if (mydata.shippingname) {
        myerror.shippingname = " ";
        isvalid = false;
     
      } 
      if (!mydata.shippingmobile) {
        myerror.shippingmobile = "Enter MobileNo. ";
        isvalid = false;
      }else if (mydata.shippingmobile) {
          myerror.shippingmobile = " ";
          isvalid = false;
       
        } 
        if (!mydata.shippingaddress) {
            myerror.shippingaddress = "Enter Address ";
            isvalid = false;
          }else if (mydata.shippingaddress) {
              myerror.shippingaddress = " ";
              isvalid = false;
           
            } 
            if (!mydata.payment) {
                myerror.payment = "Enter Payment Method ";
                isvalid = false;
              }else if (mydata.payment) {
                  myerror.payment = " ";
                  isvalid = false;
               
                } 
     
    setError(myerror);
    return isvalid;
    

  }

var SubmitData =(e)=>{
    e.preventDefault();
  var a = Formvalidation();

  setUpdate({
    shippingname:"",
    shippingmobile:"",
    shippingaddress:"",
    payment:""
   })
 
   
     var frmdata = new FormData();
     frmdata.append("user_id",id);
     frmdata.append("shipping_name",mydata.shippingname);
     frmdata.append("shipping_mobile",mydata.shippingmobile);
     frmdata.append("shipping_address",mydata.shippingaddress);
     frmdata.append("payment_method",mydata.payment);
   
 
   axios.post(`${BASEURL}/api-add-order.php`,frmdata)
   .then(Response=>{
     console.log(Response.data);
     if(Response.data.flag === "1"){
      alert(Response.data.message)
      navigate("/OrderList")
     }else{
      alert(Response.data.message)
     }
   }).catch(err =>{
     console.warn(err)
   })

   
}
    return(
        <div style={{backgroundColor:"#f0dbda"}}>
            <Base>
            
            <Container  style={{marginTop:"55px"}}>
           <Row>
      
            <Col sm={{size:6,offset:3}}>
            <Card color="secondary" className="card">
                    <CardHeader style={{backgroundColor:"yellow"}}>
                        <h1>Place Order Form !! </h1>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={SubmitData}>

                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="shippingname">Shipping_Name</Label>
                                <Input style={{height:"53px"}} type="text" id="shippingname" name="shippingname" placeholder="Enter Name" onChange={UpdateValue} value={mydata.fullname} onBlur={Formvalidation}/>
                            </FormGroup>
                             <span style={{color:"orange"}} >{myerror.shippingname}</span>
                             <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="shippingmobile">Shipping_Mobile</Label>
                                <Input style={{height:"53px"}} type="text" id="name" name="shippingmobile" placeholder="Enter Mobile" onChange={UpdateValue} value={mydata.fullname} onBlur={Formvalidation}/>
                            </FormGroup>
                             <span style={{color:"orange"}} >{myerror.shippingmobile}</span>
                             <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="shippingaddress">Shipping_Address</Label>
                                <Input style={{height:"53px"}} type="address" id="shippingaddress" name="shippingaddress" placeholder="Enter Address" onChange={UpdateValue} value={mydata.fullname} onBlur={Formvalidation}/>
                            </FormGroup>
                             <span style={{color:"orange"}} >{myerror.shippingaddress}</span>
                             <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="payment">Payment_Method</Label>
                                <Input style={{height:"53px"}} type="text" id="payment" name="payment" placeholder="Enter Payment Method" onChange={UpdateValue} value={mydata.fullname} onBlur={Formvalidation}/>
                            </FormGroup>
                             <span style={{color:"orange"}} >{myerror.payment}</span>
                           
                            <Container className="text-center">
                                <Button style={{fontSize:"22px"}} color="dark"  > Place Order </Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
           </Row>
            </Container>
            </Base>
        </div>
    )
}
export default Addorder;