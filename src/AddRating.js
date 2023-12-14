import "./singup.css";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from './Base Component/base';
import React from "react";
import axios from "axios";
import { useParams } from "react-router";
import { useNavigate } from "react-router";
function RatingAdd(){
    
const[mydata,setUpdate] = React.useState({
    fullname:"",
    email:"",
    number:"",
    date:"",
    message:""
});

  const userid = localStorage.getItem("id")
const[myerror,setError]= React.useState({})

let{id} = useParams();


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
    email:"",
    number:"",
    date:"",
    message:""
   })
} ;


const navigate = useNavigate();

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
    if( !mydata.date ){
      myerror.date=" Enter Date ";
      isvalid = false;
    }else if( mydata.date ){
        myerror.date=" ";
        isvalid = false;
    }
    if( !mydata.message ){
      myerror.message=" Enter message ";
      isvalid = false;
    }else if( mydata.message ){
        myerror.message=" ";
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
 
   axios.post("https://akashsir.in/myapi/ecom1/api/api-rating-add.php",frmdata)
   .then(Response=>{
     console.log(Response.data);
     if(Response.data.flag === "1"){
      alert(Response.data.message)
        navigate("/product")
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
                        <h1>Rating !! </h1>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={SubmitData}>

                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="name"> Rating Name</Label>
                                <Input style={{height:"53px"}} type="text" id="name" name="fullname" placeholder="Enter Name" onChange={UpdateValue} value={mydata.fullname} onBlur={Formvalidation}/>
                            </FormGroup>
                             <span style={{color:"orange"}} >{myerror.name}</span>
                        
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="email">Rating Email</Label>
                                <Input style={{height:"53px"}} type="email" id="name" name="email" placeholder="Enter Email" onChange={UpdateValue} value={mydata.email} onBlur={Formvalidation} />
                            </FormGroup>
                              <span style={{color:"orange"}} > {myerror.email}</span>
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="mobile">Rating Mobile No </Label>
                                <Input style={{height:"53px"}} type="number" id="name" name="number" placeholder=" Enter Number" onChange={UpdateValue} value={mydata.number} onBlur={Formvalidation} />
                            </FormGroup>
                              <span style={{color:"orange"}} >{myerror.number}</span>
                            <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="date">Rating Date</Label>
                                <Input style={{height:"53px"}} type="date" id="date" name="date" placeholder=" Enter Date" onChange={UpdateValue} value={mydata.date} onBlur={Formvalidation} />
                            </FormGroup>
                               <span style={{color:"orange"}} >{myerror.date}</span>
                               
                               <FormGroup className="frmfroup">
                                <Label style={{fontSize:"33px"}} for="message">Rating Message</Label>
                                <Input style={{height:"120px"}} type="textarea" id="message" name="message" placeholder=" Enter Message" onChange={UpdateValue} value={mydata.message} onBlur={Formvalidation} />
                            </FormGroup>
                            <span style={{color:"orange"}} >{myerror.address}</span>
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
            </Base>
        </div>
    )
}
export default RatingAdd;