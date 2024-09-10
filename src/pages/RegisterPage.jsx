import { useNavigate } from "react-router-dom";
import {  useState } from "react";
import { registerUser } from '../api';
// import axios from "axios";
import style from '../components/RegisterPage.module.css'; 


function RegisterPage(){

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState(''); // State to handle errors
    const navigate = useNavigate();







    const handleSubmitBtn = async (e) => {
        e.preventDefault();
        try {
            await registerUser({ name, email, password });
            alert('Registration successful!');
            navigate('/login');
        } catch (error) {
            console.error('Registration error:', error);
            alert('Registration failed.');
        }
    };
    
    // const [name , setName] = useState('');
    // const [email , setEmail ] = useState('');
    // const [password , setPassword ] = useState('');
    
  

    // useEffect(()=>{
    //     console.log(`name: ${name} email:${email} pass:${password}`);
    // })


    // const navigate = useNavigate();

    // const handleSubmitBtn = (e)=>{
    //        e.preventDefault();
        //    setEmail(e.target['email'].value);
        //    setName(e.target['name'].value);
        //    setPassword(e.target['password'].value);

    //     };
        const handleLogBtn = ()=>{
            //    e.preventDefault();
            // navigate('/');
            navigate('/login');
            }
        

        const handleHomePgBtn = ()=>{
             navigate('/');
        }

    return (
       
        
        <div className={style.loginPage} >
            <div className={style.loginContainer} >
        <h2>Registration Page</h2>
        <form onSubmit={(e)=> handleSubmitBtn(e)}  >
           <div className={style.fields}>
            <label htmlFor="name" >Name:</label>
            <input id="name" type="text" onChange={(e) => setName(e.target.value)}  placeholder="Enter Name Here" required ></input>
            </div>
            <div className={style.fields}>
            <label htmlFor="email" >Email:</label><input onChange={(e) => setEmail(e.target.value)} id="email"  type="email"  placeholder="Enter Email Here" required ></input>
            </div>
            <div className={style.fields}>
            <label htmlFor="password" >Password:</label><input  onChange={(e) => setPassword(e.target.value)} id="password"  type="password"  placeholder="Enter Password Here" required ></input>
            </div>

            <button className={style.submitBTN} type='submit'>SignUp</button>
            <span className={style.q1} >Already registered ? <button type='button' className={style.regBTN}  onClick={()=>{handleLogBtn()}} >Login Now</button> </span>
        </form>
        </div>
        <button onClick={()=>{handleHomePgBtn()}} className={style.homePg}>Homepage</button>
        </div>
       
    );
};

export default RegisterPage ;