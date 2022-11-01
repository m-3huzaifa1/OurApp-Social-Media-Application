import "./App.css";
import {BrowserRouter,Route, Routes, Navigate} from 'react-router-dom';
import Profile from './pages/Profile';
import Addpost from './pages/Addpost';
import Home from './pages/Home';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from "react";
import { getAllPosts } from "./redux/actions/postAction";
import { getAllUsers } from "./redux/actions/userActions";
import AllUsers from "./pages/AllUsers";
import Editprofile from "./pages/Editprofile";


export default function App() {

 const { loading, likeOrUnlikeLoading }= useSelector((state)=>state.alertsReducer);
 const dispatch= useDispatch();

 useEffect(()=>{
   dispatch(getAllPosts())
   dispatch(getAllUsers())
 },[])

 return (
    <div className="App">
      {(loading || likeOrUnlikeLoading) && (<div className="spinner-border" role="status">
      <span className="sr-only">Loading...</span>
      </div>)}
      <BrowserRouter>
      <Routes>
        <Route path='/login' exact element={<Login/>}/>
        <Route path='/register' exact element={<Register/>}/>
        <Route path='/' exact element={<ProtectedRoute><Home/></ProtectedRoute>}/>
        <Route path='/profile/:userid' exact element={<ProtectedRoute><Profile/></ProtectedRoute>}/>
        <Route path='/addpost' exact element={<ProtectedRoute><Addpost/></ProtectedRoute>}/>
        <Route path='/allusers' exact element={<ProtectedRoute><AllUsers/></ProtectedRoute>}/>
        <Route path='/editprofile' exact element={<ProtectedRoute><Editprofile/></ProtectedRoute>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export const ProtectedRoute=({children})=>{
  if (localStorage.getItem('user')) {
    return children
  } else {
    return <Navigate to="/login"/>
  }
}
