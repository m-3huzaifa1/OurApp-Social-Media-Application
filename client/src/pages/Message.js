import { Button, Col, Row } from "antd";
import React from "react";
import DefaultLayout from "../components/DefaultLayout";

export default function Message() {
    return(
        <DefaultLayout>
            <Row justify="center">
                <Col lg={12} xs={24} >
                    <br/><br/>
                    <h1>Chat using ChatExpress</h1>
                    <br/><br/>
                    <h3>Official Messaging product of <a>OurApp</a> <br/>Social Platform</h3>
                    <br/><br/>
                    <Button style={{color:'white',backgroundColor:'blue',paddingBottom:'50px',paddingTop:'10px',paddingLeft:'35px',paddingRight:'35px',border:'1px solid blue',borderRadius:'15px',height:'50px',fontSize:'25px'}}><a href="https://chat-expresss.netlify.app">{'--> '}   Go to ChatExpress</a></Button>
                </Col>
               </Row>
        </DefaultLayout>
    )
}