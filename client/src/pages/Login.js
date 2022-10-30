import React from "react";
import {Row, Col, Form, Input, Button} from 'antd';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import { userLogin } from "../redux/actions/userActions";

export default function Register() {
    const dispatch= useDispatch();
   
    function login(values) {
           console.log(values);
           dispatch(userLogin(values))
    }

    return(
        <div className="login-maindiv">
            <Row justify="center" className="register-div align-items-center">
                <Col lg={5} sm={24} xs={24}>
                    <h1 className="left-title mr-3">OUR</h1>
                 </Col>
                <Col lg={8} xs={25}>
                  <Form  layout="vertical" className="bs1 p-3" onFinish={login}>
                     <h2 className="text-center">Login</h2>
                     <hr/>
                     <Form.Item label="username" name="username" rules={[{required: true}]}>
                        <Input/>
                     </Form.Item>
                     <Form.Item label="password" name="password" rules={[{required: true}]}>
                        <Input type="password"/>
                     </Form.Item>
                     <div className="text-left">
                       <Button type="primary" htmlType="submit">Login</Button>
                     </div>
                     <br/>
                     <Link to='/register'>Not yet registered, Click here to register</Link>
                  </Form>
                </Col>
                <Col lg={5} sm={24} xs={24}>
                    <h1 className="right-title ml-3">APP</h1>
                 </Col>
            </Row>
        </div>
    )
}