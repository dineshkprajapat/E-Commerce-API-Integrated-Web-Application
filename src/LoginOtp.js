import axios from "axios";
import Base from './Base Component/base';
import { useNavigate } from "react-router";
import { BASEURL } from "./Base Component/BaseUrl";
import React from "react";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
function Loginotp(){


    const[data,setUpdate] = React.useState({
        number:""
         });
    var UpdateValue = (e)=>{
        setUpdate((data)=>({
            ...data,
            [e.target.name]:e.target.value
        }));
    } 

    
    const[verifydata,setVerify] = React.useState({
        verify:""
         });
    var UpdateVerify = (e)=>{
        setVerify((verifydata)=>({
            ...verifydata,
            [e.target.name]:e.target.value
        }));
    } 



//    navigation 
    const navigate = useNavigate();

    // error validation state variable
    const[myerror,setError] = React.useState({
        number:""
    })


    const Formvalidation = () => {
        let isvalid = true;
        var myerror = {};
     
        if( !data.number ){
          myerror.number=" Enter Number ";
          isvalid = false;
        }else if( data.number ){
            myerror.number=" ";
            isvalid = false;
        }
        setError(myerror);
        return isvalid;
        
    
      }


    //   send otp function
    const SendOtp =(e)=>{
        e.preventDefault();
        var a = Formvalidation();
        setUpdate({
          number:"",
         
         });

         var frmdata = new FormData();
       
         frmdata.append("user_mobile",data.number);
     
     
       axios.post(`${BASEURL}/api-login-with-otp.php`,frmdata)
       .then(Response=>{
         console.log(Response);
         if(Response.data.flag === "1"){
          alert(`Message : ${Response.data.message} Mobile Otp: ${Response.data.mobile_otp}`)
          var mobileno = Response.data.user_mobile;
          localStorage.setItem("mobileno",mobileno)
         }else{
          alert(Response.data.message)
         }
       }).catch(err =>{
         console.warn(err)
       })
        }


        // verify otp function
        const VerifyOtp =(e)=>{
            e.preventDefault();
          var user_mobile = localStorage.getItem("mobileno")
    
            setVerify({
              verify:"",
             
             });
    
             var frmdata = new FormData();
           
             frmdata.append("user_mobile",user_mobile);
             frmdata.append("mobile_otp",verifydata.verify);
         
           axios.post(`${BASEURL}/api-verify-otp.php`,frmdata)
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
                        <Form onSubmit={SendOtp}>
                         <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="number">Enter Mobile Number</Label>
                                <Input style={{height:"53px"}} type="number" name="number" id="name" placeholder="Enter Number" onChange={UpdateValue} onBlur={Formvalidation}/>
                            </FormGroup>
                            <span style={{color:"orange"}} > {myerror.number}</span>
                           
                             <Container className="text-center">
                                <Button style={{marginLeft:"12px",fontSize:"22px",background:"orange",color:"blue"}}   > Send Otp </Button>
                            </Container>
                        </Form>
                    </CardBody>
                    <CardHeader style={{backgroundColor:"yellow"}}>
                        <h1>Verify Otp !! </h1>
                    </CardHeader>
                    <CardBody>
                        <Form onSubmit={VerifyOtp}>
                         <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="verify">Enter Mobile Number</Label>
                                <Input style={{height:"53px"}} type="verify" name="verify" id="verify" placeholder="Verify Otp" onChange={UpdateVerify} />
                            </FormGroup>
                           
                             <Container className="text-center">
                                <Button style={{marginLeft:"12px",fontSize:"22px"}} color="dark"  > Verify Otp </Button>
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
export default Loginotp;