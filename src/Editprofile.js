import "./singup.css";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from './Base Component/base';
import { BASEURL } from "./Base Component/BaseUrl";
import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";

function Editprofile(){

    const id = localStorage.getItem("id")
    const[updatevalue,setUpdatevalue]= React.useState({
        name:"",
        gender:"",
        email:"",
        number:"",
        address:""
    })

    const Updatevalll = (e)=>{
        setUpdatevalue((updatevalue)=>({
            ...updatevalue,
            [e.target.name]:e.target.value
        }))
    }
   

    React.useEffect(()=>{

      Getdata() 
    },[])
 
  const navigate = useNavigate();





     const Getdata = ()=>{
        
     var frrmdata = new FormData();
     frrmdata.append("user_id", id)
        axios.post(`${BASEURL}/api-user-profile-detail.php`,frrmdata)
        .then(Response =>{
            console.log(Response.data)
            setUpdatevalue({name:Response.data.user_name,gender:Response.data.user_gender,email:Response.data.user_email,number:Response.data.user_mobile,address:Response.data.user_address})
             
        })
     }




var SubmitData =(e)=>{
    e.preventDefault();

 

     var frmdata = new FormData();
     frmdata.append("user_id", id)
     frmdata.append("user_name",updatevalue.name);
     frmdata.append("user_gender",updatevalue.gender);
     frmdata.append("user_email",updatevalue.email);
     frmdata.append("user_mobile",updatevalue.number);
     frmdata.append("user_address",updatevalue.address)
    
    
 
   axios.post(`${BASEURL}/api-user-update.php`,frmdata)
   .then(Response=>{
     console.log(Response);
     if(Response.data.flag === "1"){
      alert(Response.data.message)
     navigate("/Home")
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
                        <h1>Edit Profile !! </h1>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={SubmitData}>

                            

                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="name">Name</Label>
                                <Input style={{height:"53px"}} type="text" id="name" name="name" placeholder="Enter Name" onChange={Updatevalll} value={updatevalue.name} />
                            </FormGroup>
                         
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="gender">Gender</Label>
                                <Input style={{height:"53px"}} type="text" id="gender" name="gender" placeholder="Enter Gender" onChange={Updatevalll} value={updatevalue.gender} />
                            </FormGroup>
                              
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="email">Email</Label>
                                <Input style={{height:"53px"}} type="email" id="name" name="email" placeholder="Enter Email" onChange={Updatevalll} value={updatevalue.email} />
                            </FormGroup>
                             
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="mobile"> Mobile No </Label>
                                <Input style={{height:"53px"}} type="number" id="name" name="number" placeholder=" Enter Number" onChange={Updatevalll} value={updatevalue.number}  />
                            </FormGroup>
                            
                           
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="name">Address</Label>
                                <Input style={{height:"53px"}} type="textarea" id="address" name="address" placeholder="Enter Address" onChange={Updatevalll} value={updatevalue.address} />
                            </FormGroup>

                            <Container className="text-center">
                                <Button style={{fontSize:"22px"}} color="dark"  > Save </Button>
                               
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
export default Editprofile;