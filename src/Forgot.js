import React from "react";
import Base from './Base Component/base';
import axios from "axios";
import { BASEURL } from "./Base Component/BaseUrl";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import { Navigate, useNavigate } from "react-router";
function Forgot(){
 
     const[email,setEmail]= React.useState("")
     const[myerror,setMyerror]= React.useState({})
   
     const navigate = useNavigate();
    
    const Formvalidation = () => {
        let isvalid = true;
        var myerror = {};
         if (!email) {
          myerror.email = "Enter Email ";
          isvalid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
          myerror.email = 'Invalid email address';
          isvalid = false;
        
          }
          setMyerror(myerror);
          return isvalid;
          
      
        }

        const SubmitData = (e)=>{
            e.preventDefault();
            var a = Formvalidation();

            var frmdata = new FormData();
            frmdata.append("user_email",email)
            axios.post(`${BASEURL}/api-user-forgot-password.php`,frmdata)
            .then(Response=>{
                console.log(Response);
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
        <>
        <div style={{backgroundColor:"#f0dbda"}}>
           <Base>
            <Container  style={{marginTop:"55px"}}>
           <Row>
            <Col sm={{size:6,offset:3}}>
            <Card color="secondary" className="card">
                    <CardHeader style={{backgroundColor:"yellow"}}>
                        <h1>Forgot !! </h1>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={SubmitData}>
                         <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="id">Enter Email</Label>
                                <Input style={{height:"53px"}} type="email" name="email" id="name" placeholder="Enter Email" onChange={e=>setEmail(e.target.value)}/>
                            </FormGroup>
                            <span style={{color:"orange"}} > {myerror.email}</span>
                             <Container className="text-center">
                                <Button style={{fontSize:"22px"}} color="dark"> Forgot Now </Button>

                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
           </Row>
            </Container>
            </Base>
            </div>
        </>
    )
}
export default Forgot;