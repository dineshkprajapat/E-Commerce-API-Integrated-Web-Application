import "./singup.css";
import { Button, Card, CardBody, CardHeader, Col, Container,Label, Form, FormGroup, Input, Row } from "reactstrap";
import Base from './Base Component/base';
import { BASEURL } from "./Base Component/BaseUrl";
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OrderList.css"
function Feedback(){

  useEffect(() => {
    Getdata();
 
  }, [])

  const[feedback,setFeedback]= useState([])
    
const[mydata,setUpdate] = React.useState({
    rate:"",
    details:""
  
    
});

var localidd = localStorage.getItem("id")
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

    if (!mydata.rate) {
      myerror.rate = "Enter Rate ";
      isvalid = false;
    }else if (mydata.rate) {
        myerror.rate = " ";
        isvalid = false;
     
      } 
      if (!mydata.details) {
        myerror.details = "Enter details ";
        isvalid = false;
      }else if (mydata.details) {
          myerror.details = " ";
          isvalid = false;
       
        } 
      
     
    setError(myerror);
    return isvalid;
    

  }

var SubmitData =(e)=>{
    e.preventDefault();
  var a = Formvalidation();

  setUpdate({
    rate:"",
    details:""
   
   })
 
   
     var frmdata = new FormData();
     frmdata.append("user_id",localidd);
     frmdata.append("feedback_rate",mydata.rate);
     frmdata.append("feedback_details",mydata.details);
   
   
 
   axios.post(`${BASEURL}/api-feedback-add.php`,frmdata)
   .then(Response=>{
     console.log(Response.data);
     if(Response.data.flag === "1"){
      alert(Response.data.message)
       Getdata();
     }else{
      alert(Response.data.message)
     }
   }).catch(err =>{
     console.warn(err)
   })

   
}

const Getdata = () => {

  var frmdata = new FormData();

  frmdata.append("user_id",localidd)

  axios.post(`${BASEURL}/api-feedback-view.php`,frmdata)
    .then(Response => {
      console.log(Response.data.feedback_list)
     setFeedback(Response.data.feedback_list)
    })
}

const deletedata = (id)=>{
  const fromdata = new FormData();
  fromdata.append("feedback_id",id)

  axios.post(`${BASEURL}/api-feedback-delete.php`,fromdata)
  .then(Response =>{
   console.log(Response.data)
   if(Response.data.flag === "1"){
     alert(Response.data.message)
     Getdata();
   }else{
     alert(Response.data.message)
   }
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
                        <h1>Feedback !! </h1>
                    </CardHeader>

                    <CardBody>
                        <Form onSubmit={SubmitData}>

                            <FormGroup className="frmfroup">
                            <Label style={{fontSize:"33px"}} for="rate">Rating</Label>
                                <Input style={{height:"53px"}} type="text" id="rate" name="rate" placeholder="Enter Rating" onChange={UpdateValue} onBlur={Formvalidation}/>
                            </FormGroup>
                             <span style={{color:"orange"}} >{myerror.rate}</span>
                            
                             <FormGroup className="frmfroup">
                             <Label style={{fontSize:"33px"}} for="deatils">Details</Label>
                               <Input style={{height:"53px"}} type="address" id="details" name="details" placeholder="Enter Details" onChange={UpdateValue} onBlur={Formvalidation}/>
                           </FormGroup>
                            <span style={{color:"orange"}} >{myerror.details}</span>
                           
                            <Container className="text-center">
                                <Button style={{fontSize:"22px"}} color="dark"  > Send Feedback </Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Col>
           </Row>
            </Container>

             
      <div >
                <h1 style={{ color: "red",textAlign:"center" }}> Feedback Details </h1>
                <table className="tablee" cellPadding={20}>
                  <thead >
                    <tr  >
                      <th> Sr No. </th>
                      <th> Feedback Id </th>
                      <th> Feedback Date </th>
                      <th> User Name </th>
                      <th> Feedback Rate</th>
                      <th> Feedback Details </th>
                      <th> Action </th>
                    
                    </tr>

                  </thead>
                  <tbody >
                 
                  {feedback && feedback.length ? feedback.map((value, index) => {
                    return (
                      <>


                        <tr key={index + 1} >
                          <td key={value.feedback_id}>{index + 1}</td>
                          <td>{value.feedback_id}</td>
                          <td> {value.feedback_date}</td>
                          <td> {value.user_name}</td>
                          <td> {value.feedback_rate}</td>
                          <td> {value.feedback_details}</td>
                          <td> <button  style={{margin:"2%",marginLeft:"4%",background:"yellow",fontSize:"25px",borderRadius:"12px"}}  onClick={()=>{ deletedata(value.feedback_id)}} > Delete</button></td>
                        </tr>
                    

                      </>
                    )
                  }) : "data not found"

                  }


                  </tbody>
                 
                 
                </table>
              </div> 
            </Base>
        </div>
    )
}
export default Feedback;