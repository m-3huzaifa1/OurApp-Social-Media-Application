import { Row, Col, Button, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import moment from 'moment';
import {unfollowUser, followUser, getAllUsers } from '../redux/actions/userActions';
import {MenuFoldOutlined,MenuUnfoldOutlined,CheckOutlined,UploadOutlined,UserAddOutlined,VideoCameraOutlined,LogoutOutlined} from '@ant-design/icons';

export default function AllUsers() {
    const [searchkey,setSearchkey] = useState('')
    const {users} = useSelector(state=>state.usersReducer)
    const currentUser = JSON.parse(localStorage.getItem('user'))
    const dispatch = useDispatch();
    const {followLoading, unfollowLoading} = useSelector(state=>state.alertsReducer)
    useEffect(()=>{
        dispatch(getAllUsers())      
    },[followLoading,unfollowLoading])
    return(
        <DefaultLayout>
            <div>
                
                <Row justify='center'>
                    <Col lg={20} >
                    <Input placeholder='search users' className='search-users' value={searchkey} onChange={(e)=>{setSearchkey(e.target.value)}}/>
                    </Col>
                </Row>
                <Row justify='center' gutter={16}>
                    {users.filter(obj=>obj.username.toLowerCase().includes(searchkey.toLocaleLowerCase())).map((user)=>{
                        return (
                            <>
                            {currentUser._id !== user._id && (
                                <Col lg={7} xs={24}>
                          
                                <div className='bs1 mt-5 p-8' style={{width: '300px',padding:'15px'}}>
                                {user.profilePicUrl == '' ? 
                                (<p className="profilepic2">{user.username[0]}</p>) :( <img src={user.profilePicUrl} height='60' width='60' style={{borderRadius: '50%'}} alt='' />)}      
                                <Link to={`/profile/${user._id}`}>{user.username}</Link>
                                <p>{moment(user.createdAt).format('MMM DD yyy')}</p>
                                {user.followers.find((obj)=> obj == currentUser._id)? (
                                <div className='d-flex'>
                                    <Button icon={<CheckOutlined/>}>following</Button>
                                    <Button className='ml-2' onClick={()=>{dispatch(unfollowUser({currentuserid : currentUser._id , receiveruserid : user._id}))}}>Unfollow</Button>
                                </div>
                                ) : (
                                    <Button icon={<UserAddOutlined/>} onClick={()=>{dispatch(followUser({currentuserid : currentUser._id , receiveruserid : user._id}))}}>
                                    Follow
                                    </Button>
                                )}
                                </div>
      
                              </Col>
                            )}
                            </>
                        )
                    })}
                </Row>
            </div>
        </DefaultLayout>
    )
}