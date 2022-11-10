import { Link } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import React, { useState } from 'react';
import './defaultlayout.css';  
import {MessageOutlined ,SaveOutlined,UsergroupAddOutlined,HomeOutlined,PlusOutlined ,MenuFoldOutlined,MenuUnfoldOutlined,UploadOutlined,UserOutlined,VideoCameraOutlined,LogoutOutlined} from '@ant-design/icons';
const { Header, Sider, Content } = Layout;
  
  export default function DefaultLayout(props) {
    const user = JSON.parse(localStorage.getItem('user'))
    const [collapsed, setCollapsed] = useState(true);
    return (
      <Layout className='site'>
        
        <Layout className="site-layout">
          <Header className=" site-layout-background bs1" 
          style={{
            position: 'sticky',
            top: 0,
            bottom: 0,
            overflow: 'auto',  
            margin: '7px',
            padding: '7px',
            zIndex: 999,
            height: '85px' 
            }}
            >
            <div className=' d-flex justify-content-between align-items-center'>
            <div className='d-flex align-items-center'>
            <UserOutlined/>
            <h4 className='hd pl-2 pt-3'> {JSON.parse(localStorage.getItem('user')).username}</h4>
            </div>
            
            <h2 className='logotext pt-3'><Link to='/' >OurApp</Link></h2>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed)
            })}
            </div>
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '7px',
              padding: 24,
              minHeight: 280,
            }}
          >
            {props.children}
          </Content>
        </Layout>
        <Sider

        style={{
          position: 'sticky',
          top: 0,
          bottom: 0,
          overflow: 'auto',
          height: '100vh'
        }}

        trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[window.location.pathname]}
            items={[
              {
                key: '/',
                icon: <HomeOutlined />,
                label: <Link to='/'>Home</Link>,
              },
              {
                key: '/addpost',
                icon: <PlusOutlined />,
                label: <Link to='/addpost'>Add Post</Link>,
              },
              {
                key: '/profile',
                icon: <UserOutlined />,
                label: <Link to={`/profile/${user._id}`}>Profile</Link>,
              },
              {
                key: '/allusers',
                icon: < UsergroupAddOutlined/>,
                label: <Link to='/allusers'>All Users</Link>,
              },
              {
                icon: <SaveOutlined/>,
                label: <Link>Saved Posts</Link>,
              },
              {
                icon: <MessageOutlined/>,
                label: <Link to='/message'> Messages</Link>
              },
              {
                icon: <LogoutOutlined/>,
                label: <Link onClick={()=>{localStorage.removeItem(('user'),window.location.reload());}}>Log Out</Link>,
              },
            ]}
          />
        </Sider>
      </Layout>
    );
  };
  
  