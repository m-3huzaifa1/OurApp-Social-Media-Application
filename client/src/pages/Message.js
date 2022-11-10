import { Button, Col, Row } from "antd";
import React from "react";
import DefaultLayout from "../components/DefaultLayout";

export default function Message() {
    return(
        <DefaultLayout>
            <Row justify="center">
                <Col lg={12} xs={24} >
                <div className="bs1 msg m-5 p-3 text-center">
                    <br/><br/>
                    <h1>Chat using Chat Express</h1>
                    <br/><br/>
                    <h3>Official Messaging Application of <a>OurApp</a> <br/>Social Platform</h3>
                    <br/><br/>
                    <Button style={{color:'white',backgroundColor:'blue',paddingBottom:'30px',paddingTop:'10px',paddingLeft:'15px',paddingRight:'15px',border:'1px solid blue',borderRadius:'15px',height:'25px',fontSize:'13px'}}><a href="https://chat-expresss.netlify.app">{'--> '}   Go to ChatExpress</a></Button>
                </div>
                </Col>
               </Row>
        </DefaultLayout>
    )
}