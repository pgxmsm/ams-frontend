import {  useEffect, useState } from 'react';
import style from '../components/LoginPage.module.css';
// import axios from 'axios';
import { loginUser , loginAdmin } from '../api';
import {useNavigate} from 'react-router-dom';

function LoginPage({setIsAuthenticated , setUniqueId , users , userEmail , userName }) {
  const {isAdmin , setIsAdmin} = users;

  const {email, setEmail} = userEmail;
  const { setName} = userName;
  const [password, setPassword] = useState('');

  

  const navigate = useNavigate();

  const handleOnSubmit = async (e) => {
    e.preventDefault();
   
// here i will use if statement
  if(isAdmin[0].admin){

    try { 
        const response = await loginAdmin({ email, password });
         setIsAuthenticated(true);
         setUniqueId([response.data.userId]);
         setName([response.data.name]);
         
        const { token, userId} = response.data;

         const now = new Date().getTime();
         const expiresAt = now + 60 * 60 * 1000; // 1 hour from now
     
        localStorage.setItem('token', token);
        localStorage.setItem('expiresAt', expiresAt);
        localStorage.setItem('userId', userId);
        localStorage.setItem('isAdmin', true);
        localStorage.setItem('userName', response.data.name);
        //  
// 

         
         navigate('/dashboard'  );  //, {userId : {dat}}
         setIsAdmin([{admin:true , dashboard: "Admin"}])
      } catch (error) {
         console.error('Login error:', error);
         setIsAuthenticated(false);
         alert('Invalid credentials.');
     }



  }
  else{

    try { 
        const response = await loginUser({ email, password });
         setIsAuthenticated(true);
         setUniqueId([response.data.userId]);
        //  console.log(response.data.userId)
         setName([response.data.name]);
        //  console.log(response.data, 'here is data')


         const { token, userId} = response.data;

         const now = new Date().getTime();
         const expiresAt = now + 60 * 60 * 1000; // 1 hour from now

        localStorage.setItem('token', token);
        localStorage.setItem('expiresAt', expiresAt);
        localStorage.setItem('userId', userId);
        localStorage.setItem('userName', response.data.name);
        localStorage.setItem('isAdmin', false);




         
         navigate('/dashboard'  );  //, {userId : {dat}}
         setIsAdmin([{admin:false , dashboard: "Student"}])
      } catch (error) {
         console.error('Login error:', error);
         setIsAuthenticated(false);
         alert('Invalid credentials.');
     }

    }
  
    
};



    const handleRegBtn = ()=>{
    //    e.preventDefault();
    // navigate('/');
    navigate('/signup');
    }
    const handleHomePgBtn = ()=>{
        navigate('/');
   }


   const handleBtnOnChange = (e)=>{
    // console.log(e.target.type);
    e.target.type==="email" ? setEmail(e.target.value) :
    e.target.type === "password" ? setPassword(e.target.value) : console.log('nothing');
    // e.target.type===;

   }

   const handleAltBtn = ()=>{
      !(isAdmin[0].admin) ? setIsAdmin([{admin:true , dashboard:"Admin"}]) : setIsAdmin([{admin:false , dashboard:"Student"}]);
   }




   useEffect(() => {

    const checkToken = () => {
      const expiresAt = localStorage.getItem('expiresAt');
      const now = new Date().getTime();
  
      if (!expiresAt || now > expiresAt) {
        // Token is expired or not available, clear the token and redirect to login
        localStorage.removeItem('token');
        localStorage.removeItem('expiresAt');
        localStorage.removeItem('userId');
        localStorage.removeItem('isAdmin');
        // navigate('/'  )
        setIsAuthenticated(false);
        console.log("token is expired")
        // window.location.href = '/login'; // Or use React Router's navigate
      } else {
          
        setUniqueId([localStorage.getItem('userId')]);

        localStorage.getItem('isAdmin')==="true" ? setIsAdmin([{admin: true , dashboard: "Admin"}]) : setIsAdmin([{admin: false , dashboard: "Admin"}]);
         
        setName(localStorage.getItem('userName'));
        // localStorage.setItem('userName', response.data.name);
        setIsAuthenticated(true);
        navigate('/dashboard'  );  //, {userId : {dat}}
        

        // Token is still valid, proceed
        console.log('Token is valid');
      }
    };
  
    checkToken();
  }, [navigate , setIsAdmin , setIsAuthenticated ,setName , setUniqueId] );








    return (
        <div className={style.loginPage} >
            <div className={style.loginContainer} >
        <h2>{`${isAdmin[0].dashboard} Login Page`}</h2>
        <form action='/'
             onSubmit={(e)=>{handleOnSubmit(e)}}
>
            {/* <label forHtml="name" >Name:<input id="name" type="text"  placeholder="Enter Name Here" ></input></label> */}
            <div className={style.fields}>
            <label htmlFor="email" >Email:</label><input onChange={(e)=> handleBtnOnChange(e) } id="email"  type="email"  placeholder="Enter Email Here" required ></input>
            </div>
            <div className={style.fields}>
                <label htmlFor="password" >Password:</label><input onChange={(e)=> handleBtnOnChange(e)}  id="password"  type="password"  placeholder="Enter Password Here" required ></input>
            </div>
            
            <button className={style.submitBTN} type='submit'  >Login</button>
            {!isAdmin[0].admin &&  <span className={style.q1} >Not registered Yet? <button type='button' className={style.regBTN}  onClick={()=>{handleRegBtn()}} >Register Now</button> </span> }
            <button onClick={()=>{handleHomePgBtn()}} className={style.homePg}>Homepage</button>
            
        </form>
        
        <button className={style.adminBTN} type='button' onClick={()=>{handleAltBtn()}}  >{` ${isAdmin[0].admin ? "Student Login" : "Admin Login"}   `}</button>
        </div>
        </div>
    );
}

export default LoginPage ;













// function Extraas(){

// return(
// <div className={style.userSelectionContainer}>
//                 <label>Select please:</label>
//                 <div className={style.userSelection}>
//                     <div>
//                 <label htmlFor="studentLogin">Student</label>
//                 <input type="radio" name="userType" id="studentLogin" checked value='student'/>
//                 </div>
//                 <div>
//                 <label htmlFor="adminLogin">Admin</label>
//                 <input type="radio" name="userType" id="adminLogin" />
//                 </div>
//                 </div>
//             </div>

// )}

