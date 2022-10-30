import { Button, Col, Modal, Row } from "antd";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import DefaultLayout from "../components/DefaultLayout";
import Post from "../components/Posts";
import {getAllUsers, unfollowUser} from '../redux/actions/userActions';

export default function Profile() {
  const params = useParams();
  const { users } = useSelector((state) => state.usersReducer);
  const user = users.find((obj) => obj._id == params.userid);
  const { posts } = useSelector((state) => state.postsReducer);
  const currentUser = JSON.parse(localStorage.getItem('user'))._id;
  const usersposts = posts.filter(obj => obj.user._id == params.userid)
  const [followersDisplay,setFollowersDisplay] = useState(false)
  const [followingDisplay,setFollowingDisplay] = useState(false)
  const dispatch = useDispatch();
  const {unfollowLoading} = useSelector(state=>state.alertsReducer)
    useEffect(()=>{
        dispatch(getAllUsers())      
    },[unfollowLoading])
    
  return (
    <DefaultLayout>
      {users.length > 0 && (<>
        <Row justify="center">
          <Col lg={12} sm={24} xs={24}>
            <div className="bs1 m-2 p-3 text-left">
              <div className="d-flex align-items-center">
                {user.profilePicUrl == '' ?
                  (<p className="profilepic2">{user.username[0]}</p>) : (<img src={user.profilePicUrl} height='60' width='60' alt='' />)}
                <div className="text-left" style={{ paddingLeft: '10px' }}>
                  <p style={{ color: 'black' }}>{user.username}</p>
                  <p style={{ fontSize: 15 }}>{moment(user.createdAt).format('MMM DD yyyy')}</p>
                  {(currentUser == params.userid) && (<Button><Link to='/editprofile'>Edit Profile</Link></Button>)}
                </div>
              </div>
              <p style={{ color: 'black', fontSize: 16 }}>
                {user.bio == "" ? 'Frontend Developer' : user.bio}
              </p>
              <div className="text-left">
                <Button className="mr-2" onClick={()=>{setFollowersDisplay(true)}}>Followers : {user.followers.length}</Button>
                <Button onClick={()=>{setFollowingDisplay(true)}}>Following : {user.following.length}</Button>
              </div>

              <p style={{ color: 'black', fontSize: 16 }}>Total Posts : {usersposts.length}</p>

            </div>
          </Col>
        </Row>
        {(user.followers.find(obj => obj == currentUser) || user.privateAccount == false || user._id == currentUser) ? (
          <Row>
            {usersposts.map(post => {
              return <Col lg={8} sm={24} xs={24}>
                <Post post={post} postInProfile={true} />
              </Col>
            })}
          </Row>
        ) : (<p>This account is private</p>)}


        <Modal title='Followers' visible={followersDisplay} closable={false} onCancel={()=>{setFollowersDisplay(false)}} onOk={()=>{setFollowersDisplay(false)}}>
                 {user.followers.map(obj=>{
                  const followeruser = users.find((ob) => ob._id === obj)
                  return (
                  <div className="d-flex align-items-center bs1 p-2 mt-2">
                       {followeruser.profilePicUrl == '' ? 
                       (<span className="profilepic1 d-flex align-items-center">{followeruser.username[0]}</span>) : 
                       <img src={followeruser.profilePicUrl} height='35' width='35' style={{borderRadius: '50%'}} alt='' />}
                  
                  <div className="ml-2">
                      <div style={{margin : 2}}><Link>{followeruser.username}</Link></div>
                      <div style={{margin : 2}}>Since {moment(followeruser.createdAt).format('MMM DD yyyy')}</div>
                  </div>
                  </div>
                  
                  )
                 })}
        </Modal>

        <Modal title='Following' visible={followingDisplay} closable={false} onCancel={()=>{setFollowingDisplay(false)}} onOk={()=>{setFollowingDisplay(false)}}>
                 {user.following.map(obj=>{
                  const followinguser = users.find(o=>o._id==obj)
                  return (
                  <div className="d-flex align-items-center bs1 p-2 mt-2">
                       {followinguser.profilePicUrl == '' ? 
                       (<span className="profilepic1 d-flex align-items-center">{followinguser.username[0]}</span>) : 
                       <img src={followinguser.profilePicUrl} height='35' width='35' style={{borderRadius: '50%'}} alt='' />}
                  
                  <div className="ml-2">
                      <div style={{margin : 2}}><Link>{followinguser.username}</Link></div>
                      <div style={{margin : 2}}>Since {moment(followinguser.createdAt).format('MMM DD yyyy')}</div>
                  </div>
    
                  <Button className='ml-5' 
                  onClick={()=>{dispatch(unfollowUser({currentuserid : currentUser , receiveruserid : followinguser._id}))}}>Unfollow</Button>
    
                  </div>
                  
                  )
                 })}
        </Modal>

      </>)}
    </DefaultLayout>
  )
}