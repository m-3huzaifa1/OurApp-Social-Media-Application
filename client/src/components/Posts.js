import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import { DeleteOutlined,EditOutlined, HeartFilled, CommentOutlined } from '@ant-design/icons';
import { deletePost, editPost, getAllPosts, likeOrUnlikePost } from "../redux/actions/postAction";
import { useDispatch, useSelector } from "react-redux";
import { Col, Modal, Row,Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { addComment } from "../redux/actions/postAction";

export default function Post({ post, postInProfile }) {
    const dispatch = useDispatch();
    const currentuser = JSON.parse(localStorage.getItem('user'));
    const alreadyLiked = post.likes.find(obj => obj.user.toString() == currentuser._id);
    const { likeOrUnlikeLoading , addCommentLoading, editPostLoading, deletePostLoading} = useSelector(state => state.alertsReducer);
    const [cmmntModal, setCmmntModal] = useState(false)
    const [editModal, setEditModal] = useState(false)
    const [comment, setComment] = useState('')
    const {users} = useSelector(state => state.usersReducer);
    const [description,setDescription] = useState(post.description);

    useEffect(() => {
        dispatch(getAllPosts())
    }, [likeOrUnlikeLoading,addCommentLoading,editPostLoading, deletePostLoading])

    return (
        <div className="pst bs1 p-2 mr-2 mt-3">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    {post.user.profilePicUrl == '' ? (<span className="profilepic1 d-flex align-items-center">{post.user.username[0]}</span>) : <img src={post.user.profilePicUrl} height='35' width='35' style={{borderRadius: '50%'}} alt='' />}
                    <Link className="ml-2">{post.user.username}</Link>
                </div>

                <div>
                    <p>{moment(post.createdAt).format('MMM DD YYYY')}</p>
                </div>
            </div>
            <img src={post.image} style={{height: postInProfile == true && '200px'}} className='postimage w-100'/>
            <p className="mt-1 mb-1 text-left">{post.description}</p>
            <div className={postInProfile ? 'd-flex align-items-center justify-content-between' : "d-flex align-items-center"}>
                <div className="d-flex align-items-center mr-3">
                    <HeartFilled style={{ color: alreadyLiked ? 'red' : 'grey' }}
                        onClick={() => { dispatch(likeOrUnlikePost({ postid: post._id })) }} />
                    <p>{post.likes.length}</p>
                </div>
                <div className="d-flex align-items-center">
                    <CommentOutlined onClick={() => setCmmntModal(true)} />
                    <p>{post.comments.length}</p>
                </div>
                {(post.user._id == currentuser._id && postInProfile == true) && (<>
                    <div className="ml-2">
                    <DeleteOutlined onClick={()=>{
                        dispatch(deletePost({_id : post._id}))
                    }}/>
                </div>
                <div className="ml-2">
                    <EditOutlined onClick={()=>{setEditModal(true)}}/>
                </div>
                </>)}
            </div>
            <Modal visible={cmmntModal} title='Comments' closable={false} 
                   width={900} okText='Add Comment' 
                   onOk={()=>{
                    dispatch(addComment({postid:post._id,comment: comment}))
                    setCmmntModal(false)
                   }}
                   onCancel={()=>{
                   setCmmntModal(false)
                   }}>
                <Row>
                    <Col lg={10} xs={0}>
                        <img src={post.image} height='350' className="w-100" alt="" />
                    </Col>
                    <Col lg={14} xs={24}>
                        <TextArea placeholder="Add your Comment here" 
                        className="ml-2" value={comment} 
                        onChange={(e) => { setComment(e.target.value) }} />
                        {post.comments.map(comment=>{ 
                            const user = users.find(obj=>obj._id == comment.user )
                            return (<div className="d-flex align-items-center m-1 p-1 justify-content-between">
                                    <div className="">
                                     {post.user.profilePicUrl == '' ? (<span className="profilepic1 d-flex align-items-center">{user.username[0]}</span>) :( <img src={post.user.profilePicUrl} height='35' width='35' style={{borderRadius: '50%'}} alt='' />)}      
                            <Link className='mr-1' style={{fontSize:15,marginLeft: 10}}>{user.username}</Link>
                            <br/>
                            <p style={{fontSize:10,width:250}}>{comment.comment}</p>
                            
                            </div>
                        
                            <div className="text-right d-flex justify-content-end">
                            <p style={{fontSize:10}} className='text-right'>{comment.date}</p>
                            </div>
                            </div>
                            );
                        })}
                    </Col>
                </Row>
            </Modal>

            <Modal title='Edit description' closable={false} visible={editModal} onOk={()=>{
                dispatch(editPost({_id: post._id , description:description}))
                setEditModal(false)
            }} okText='edit' onCancel={()=>{setEditModal(false)}}>
               <Input value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
            </Modal>
        </div>
    )
}