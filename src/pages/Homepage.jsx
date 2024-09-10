import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

function Homepage() {
  
  const navigate = useNavigate();


  const handleLoginBtn = ()=>{
    navigate('/login');

  };

  const handleSignBtn = () => {
    navigate('/signup');
  };


  return (
    <>
   
    <div className='homeMainPg'>
    <Navbar />
      <h1 className='text-center  mt-4 mb-0 head'> Hi there !</h1>
      <div className=' d-flex mt-0 flex-column justify-content-center align-items-center g-2 p-5   '>
      <button className='btn btn-primary mb-3 rounded w-50' onClick={()=>{ handleLoginBtn()}} >Login</button>
      <button className='btn btn-secondary rounded w-50' onClick={()=>{handleSignBtn()}} >SignUp</button>
      </div>
    </div>
    </>
  )
}

export default Homepage ;