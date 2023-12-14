import "./singup.css";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row } from "reactstrap";
import Base from './Base Component/base';
import React from "react";
import { BASEURL } from "./Base Component/BaseUrl";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
function CancelOrder(){
    
const[mydata,setUpdate] = React.useState({
    reason:""
  
    
});

const navigate = useNavigate();
var localidd = localStorage.getItem("id")
let {id} = useParams();
const[myerror,setError]= React.useState({})

var UpdateValue = (e)=>{
    setUpdate((mydata)=>({
        ...mydata,
        [e.target.name]:e.target.value
    }));
} 




const Formvalidation = () => {
    let isvalid = true;
    var myerror = {};

    if (!mydata.reason) {
      myerror.reason = "Enter Reason ";
      isvalid = false;
    }else if (mydata.reason) {
        myerror.reason = " ";
        isvalid = false;
     
      } 
      
     
    setError(myerror);
    return isvalid;
    

  }

var SubmitData =(e)=>{
    e.preventDefault();
  var a = Formvalidation();

  setUpdate({
    reason:""
   
   })
 
   
     var frmdata = new FormData();
     frmdata.append("user_id",localidd);
     frmdata.append("order_id",id);
     frmdata.append("cancel_reason",mydata.reason);
   
   
 
   axios.post(`${BASEURL}/api-order-cancel.php`,frmdata)
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
        <div style={{backgroundColor:"pink"}}>
            <Base>
            
            <Container  style={{marginTop:"55px"}}>
           <Row>
           
            <Col sm={{size:6,offset:3}}>
            <Card color="secondary" className="card">
                    <CardHeader style={{backgroundColor:"yellow"}}>
                        <h1>Reason !! </h1>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={SubmitData}>

                            <FormGroup className="frmfroup">
                               
                                <Input style={{height:"53px"}} type="text" id="reason" name="reason" placeholder="Enter Reason" onChange={UpdateValue} value={mydata.reason} onBlur={Formvalidation}/>
                            </FormGroup>
                             <span style={{color:"orange"}} >{myerror.reason}</span>
                      
                           
                            <Container className="text-center">
                                <Button style={{fontSize:"22px"}} color="dark"  > Cancel Now </Button>
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
export default CancelOrder;