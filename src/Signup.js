import "./singup.css";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from './Base Component/base';
import { BASEURL } from "./Base Component/BaseUrl";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router";
function Signup(){
    
const[mydata,setUpdate] = React.useState({
    fullname:"",
    gender:"",
    email:"",
    number:"",
    pass1:"",
    address:""
});

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
    fullname:"",
    gender:"",
    email:"",
    number:"",
    pass1:"",
    address:""
   })
} ;

const Formvalidation = () => {
    let isvalid = true;
    var myerror = {};

    if (!mydata.fullname) {
      myerror.name = "Enter Name ";
      isvalid = false;
    }else if (mydata.fullname) {
        myerror.name = " ";
        isvalid = false;
     
      } 
      if( !mydata.gender ){
        myerror.gender=" Enter Gender";
        isvalid = false;
      } else if( mydata.gender ){
          myerror.gender=" ";
          isvalid = false;
           }
    if (!mydata.email) {
      myerror.email = "Enter Email ";
      isvalid = false;
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mydata.email)) {
      myerror.email = 'Invalid email address';
      isvalid = false;
    
      }
   
      if(!mydata.number){
        myerror.number="Enter Number "
        isvalid=false;
      }else if(mydata.number){
        myerror.number=""
        isvalid=false;
      }
    if( !mydata.pass1 ){
      myerror.password=" Enter Password ";
      isvalid = false;
    }else if( mydata.pass1 ){
        myerror.password=" ";
        isvalid = false;
    }
    if( !mydata.address ){
      myerror.address=" Enter Address ";
      isvalid = false;
    }else if( mydata.address ){
        myerror.address=" ";
        isvalid = false;
    }
    setError(myerror);
    return isvalid;
    

  }

var SubmitData =(e)=>{
    e.preventDefault();
  var a = Formvalidation();

  setUpdate({
    fullname:"",
    gender:"",
    email:"",
    number:"",
    pass1:"",
   })
 

     var frmdata = new FormData();
     frmdata.append("user_name",mydata.fullname);
     frmdata.append("user_gender",mydata.gender);
     frmdata.append("user_email",mydata.email);
     frmdata.append("user_mobile",mydata.number);
     frmdata.append("user_password",mydata.pass1);
     frmdata.append("user_address",mydata.address)
 
   axios.post(`${BASEURL}/api-signup.php`,frmdata)
   .then(Response=>{
     console.log(Response.data);
     if(Response.data.flag === "1"){
      alert(Response.data.message)
      navigate("/Login")
     }else{
      alert(Response.data.message)
     }
   }).catch(err =>{
     console.warn(err)
   })

   
}
    return(
        <div style={{backgroundColor:"white"}}>
            <Base>
            
            <Container  style={{marginTop:"55px"}}>
           <Row>
            <Col sm={{size:6,offset:3}}>
            <Card color="secondary" className="card">
                    <CardHeader style={{backgroundColor:"yellow"}}>
                        <h1>Register !! </h1>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={SubmitData}>

                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="name">Name</Label>
                                <Input style={{height:"53px"}} type="text" id="name" name="fullname" placeholder="Enter Name" onChange={UpdateValue} value={mydata.fullname} onBlur={Formvalidation}/>
                            </FormGroup>
                             <span style={{color:"orange"}} >{myerror.name}</span>
                             <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="gender">Gender</Label>
                                <Input style={{height:"53px"}} type="text" id="gender" name="gender" placeholder="Enter Gender" onChange={UpdateValue} value={mydata.gender} onBlur={Formvalidation}/>
                            </FormGroup>
                                <span style={{color:"orange"}} >{myerror.gender}</span>
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="email">Email</Label>
                                <Input style={{height:"53px"}} type="email" id="name" name="email" placeholder="Enter Email" onChange={UpdateValue} value={mydata.email} onBlur={Formvalidation} />
                            </FormGroup>
                              <span style={{color:"orange"}} > {myerror.email}</span>
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="mobile"> Mobile No </Label>
                                <Input style={{height:"53px"}} type="number" id="name" name="number" placeholder=" Enter Number" onChange={UpdateValue} value={mydata.number} onBlur={Formvalidation} />
                            </FormGroup>
                              <span style={{color:"orange"}} >{myerror.number}</span>
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="password">Password</Label>
                                <Input style={{height:"53px"}} type="password" id="name" name="pass1" placeholder=" Enter Password" onChange={UpdateValue} value={mydata.pass1} onBlur={Formvalidation} />
                            </FormGroup>
                               <span style={{color:"orange"}} >{myerror.password}</span>
                               
                               <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="adress">Address</Label>
                                <Input style={{height:"120px"}} type="textarea" id="address" name="address" placeholder=" Enter Address" onChange={UpdateValue} value={mydata.address} onBlur={Formvalidation} />
                            </FormGroup>
                            <span style={{color:"orange"}} >{myerror.address}</span>
                            <Container className="text-center">
                                <Button style={{fontSize:"22px"}} color="dark"  > Register </Button>
                                <Button style={{marginLeft:"12px",fontSize:"22px"}} color="light" type="reset" onClick={ResetData}>Reset</Button>
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
export default Signup;