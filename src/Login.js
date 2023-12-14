import axios from "axios";
import Base from "./Base Component/base";
import { NavLink as ReactLink } from "react-router-dom";
import { BASEURL } from "./Base Component/BaseUrl";
import { useNavigate } from "react-router";
import React from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
function Login(){
    const[mydata1,setUpdate] = React.useState({
        email:"",
        pass:"",
        
    });
    var UpdateValue = (e)=>{
        setUpdate((mydata1)=>({
            ...mydata1,
            [e.target.name]:e.target.value
        }));
    } 



    const[myerror,setError]= React.useState({});
    const navigate = useNavigate();

  

    const Formvalidation = () => {
        let isvalid = true;
        var myerror = {};
         if (!mydata1.email) {
          myerror.email = "Enter Email ";
          isvalid = false;
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(mydata1.email)) {
          myerror.email = 'Invalid email address';
          isvalid = false;
        
          }
        if( !mydata1.pass ){
          myerror.password=" Enter Password ";
          isvalid = false;
        }else if( mydata1.pass ){
            myerror.password=" ";
            isvalid = false;
        }
        setError(myerror);
        return isvalid;
        
    
      }

    var SubmitData =(e)=>{
        e.preventDefault();
        var a = Formvalidation();

        setUpdate({
          email:"",
          pass:""
         });

         var frmdata = new FormData();
       
         frmdata.append("user_email",mydata1.email);
         frmdata.append("user_password",mydata1.pass);
     
       axios.post(`${BASEURL}/api-login.php`,frmdata)
       .then(Response=>{
         console.log(Response);
         if(Response.data.flag === "1"){
          alert(Response.data.message)
          var id = Response.data.user_id;
          var name = Response.data.user_name;
          localStorage.setItem("id",id)
          localStorage.setItem("name",name)
          navigate("/Home")
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
                        <h1>Login !! </h1>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={SubmitData}>
                         <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="email">Enter Email</Label>
                                <Input style={{height:"53px"}} type="email" name="email" id="name" placeholder="Enter Email" onChange={UpdateValue} onBlur={Formvalidation}/>
                            </FormGroup>
                            <span style={{color:"orange"}} > {myerror.email}</span>
                            <FormGroup >
                                <Label style={{fontSize:"33px"}} for="password">Password</Label>
                                <Input style={{height:"53px"}} type="password" name="pass" id="name" placeholder=" Enter Password" onChange={UpdateValue} onBlur={Formvalidation} />
                            </FormGroup>
                            <span style={{color:"orange"}} >{myerror.password}</span>
                             <Container className="text-center">
                                <Button style={{fontSize:"22px"}} color="dark">Log In</Button>
                                <Button style={{marginLeft:"12px",fontSize:"22px"}} color="light" tag={ReactLink} to="/Forgot" >Forgot Password </Button>
                                <Button style={{marginLeft:"12px",fontSize:"22px",background:"orange",color:"black",marginTop:"12px"}}  tag={ReactLink} to="/LoginOtp" >Login With Otp </Button>
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
export default Login;