import "./singup.css";
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Label, Row } from "reactstrap";
import Base from './Base Component/base';
import React from "react";
import axios from "axios";
import { BASEURL } from "./Base Component/BaseUrl";
import { useNavigate } from "react-router";
function Changepassword() {

    
    const navigate = useNavigate();
    const [mydata, setUpdate] = React.useState({
        oldpass: '',
        newpass: "",
        cnfpass: ""
    });

    const [myerror, setError] = React.useState({})
    var UpdateValue = (e) => {
        setUpdate((mydata) => ({
            ...mydata,
            [e.target.name]: e.target.value
        }));
    }


    var ResetData = (e) => {
        e.preventDefault();
        setUpdate({
            oldpass: '',
            newpass: "",
            cnfpass: ""
        })
    };

    const Formvalidation = () => {
        let isvalid = true;
        var myerror = {};

        if (!mydata.oldpass) {
            myerror.oldpass = "Enter Old Password ";
            isvalid = false;
        } else if (mydata.oldpass) {
            myerror.oldpass = " ";
            isvalid = false;

        }

        if (!mydata.newpass) {
            myerror.newpass = "Enter New Password ";
            isvalid = false;
        } else if (mydata.newpass) {
            myerror.newpass = " ";
            isvalid = false;

        }

        if (!mydata.cnfpass) {
            myerror.cnfpass = "Enter Confirm Password ";
            isvalid = false;
        } else if (mydata.cnfpass) {
            myerror.cnfpass = "";
            isvalid = false;

        }
        setError(myerror);
        return isvalid;


    }

    var SubmitData = (e) => {
        e.preventDefault();
        var a = Formvalidation();

        setUpdate({
            oldpass: "",
            newpass: "",
            cnfpass: ""
        })


        var frmdata = new FormData();
        frmdata.append("user_id", localStorage.getItem("id"));
        frmdata.append("opass", mydata.oldpass);
        frmdata.append("npass", mydata.newpass);
        frmdata.append("cpass", mydata.cnfpass);


        axios.post(`${BASEURL}/api-change-password.php`, frmdata)
            .then(Response => {
                console.log(Response);
                if (Response.data.flag === "1") {
                    alert(Response.data.message)
                   navigate("/Login")
                } else {
                    alert(Response.data.message)
                }
            }).catch(err => {
                console.warn(err)
            })


    }
    return (
        <div style={{ backgroundColor: "#f0dbda" }}>
            <Base>

                <Container style={{ marginTop: "55px" }}>
                    <Row>
                      
                        <Col sm={{ size: 6, offset: 3 }}>
                            <Card color="secondary" className="card">
                                <CardHeader style={{ backgroundColor: "yellow" }}>
                                    <h1>Change Password !! </h1>
                                </CardHeader>

                                <CardBody>
                                    <Form onSubmit={SubmitData}>


                                        <FormGroup className="frmfroup">
                                            <Label style={{ fontSize: "33px" }} for="oldpass">Old Password </Label>
                                            <Input style={{ height: "53px" }} type="password" id="oldpass" name="oldpass" placeholder="Enter Old Password " onChange={UpdateValue} value={mydata.oldpass} onBlur={Formvalidation} />
                                        </FormGroup>

                                        <span style={{ color: "orange" }} >{myerror.oldpass}</span>
                                        <FormGroup className="frmfroup">
                                            <Label style={{ fontSize: "33px" }} for="newpass">New Password </Label>
                                            <Input style={{ height: "53px" }} type="password" id="oldpass" name="newpass" placeholder="Enter New Password" onChange={UpdateValue} value={mydata.newpass} onBlur={Formvalidation} />
                                        </FormGroup>
                                        <span style={{ color: "orange" }} > {myerror.newpass}</span>

                                        <FormGroup className="frmfroup">
                                            <Label style={{ fontSize: "33px" }} for="cnfpass">Confirm Password </Label>
                                            <Input style={{ height: "53px" }} type="password" id="cnfpass" name="cnfpass" placeholder="Enter Cnfirm Password" onChange={UpdateValue} value={mydata.cnfpass} onBlur={Formvalidation} />
                                        </FormGroup>

                                        <span style={{ color: "orange" }} >{myerror.cnfpass}</span>

                                        <Container className="text-center">
                                            <Button style={{ fontSize: "22px" }} color="dark"  > Change Password </Button>
                                            <Button style={{ marginLeft: "12px", fontSize: "22px" }} color="light" type="reset" onClick={ResetData}>Reset</Button>
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
export default Changepassword;