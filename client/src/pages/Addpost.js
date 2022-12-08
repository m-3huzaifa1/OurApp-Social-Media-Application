import { Button, Col, Form, Input, Row } from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import {useDispatch} from 'react-redux';
import DefaultLayout from "../components/DefaultLayout";
import { addPost } from "../redux/actions/postAction";

export default function Addpost() {
  const [image,setImage]=useState('');
  //const [video,setVideo]=useState('');
  const dispatch = useDispatch();

  function handleFileInput(e) {
    const file=e.target.files[0];
    const reader=new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = ()=> {
       setImage(reader.result);
    }
  }

  /*function handleVideoInput(e) {
    const file=e.target.files[0];
    const reader=new FileReader(file);
    reader.readAsDataURL(file);
    reader.onloadend = ()=> {
       setVideo(reader.result);
    }
  }*/

    function addpost(values) {
          values.image = image;
          //values.video = video;
          console.log(values);       
          dispatch(addPost(values));   
    }


  return(
        <DefaultLayout>
            <Row justify="center">
              <Col lg={12}>
                <Form className="bs1 p-3 mt-5" layout="vertical" onFinish={addpost}>

                  <Form.Item name="description" label="Description">
                    <TextArea/>
                  </Form.Item>
                   <br/>
                  <Form.Item name="image" label="Image" rules={[{required: true}]}>
                    <Input type="file" onChange={handleFileInput}/>
                  </Form.Item>
                  {image !== '' && (<img src={image} height='200' width='200'/>)}
                  <br/>
                  
                
                 {/* <Form.Item name="video" label="Video">
                    <Input type="file" onChange={handleVideoInput}/>
                    </Form.Item>
                  {video !== '' && <video height='200' width='200'controls><source src={video}/>Your Browser does not support the video</video>}
  */}
                  <div className="text-left mt-4">
                  <Button type="primary" htmlType="submit">Post</Button>
                  </div>
                </Form>
              </Col>
            </Row>
        </DefaultLayout>
  )
}