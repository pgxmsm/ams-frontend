import React, { useEffect, useState } from 'react';
import style from '../components/Users.module.css';
import { getUsers , delUser } from '../api';
import LeaveTable from './LeaveTable';
import AttendanceTable from './AttendanceRecordTable';





function Users({children, fetchRecords  , handleCrossBtn , buttonStates,uId , leaveRecord , fetchLeaveRecords , attendanceRecord}) {




    const [userButtonStates, setUserButtonStates] = useState({
        button1: false,
        button2: false,
        button3: false,
        button4: false,
        name : ""
      });













    const handleLeaveUser =(e)=>{
        // console.log("btn is clicked", e)
        setUserButtonStates((prevState) => ({
            ...prevState,
            button1: !prevState.button1,
             // Toggle button state
          }));

        fetchLeaveRecords(e)
        // console.log(leaveRecord)
    }
    const handleAttendanceUser =(e , nam)=>{

           fetchRecords(e);
        //    console.log(attendanceRecord)
        setUserButtonStates((prevState) => ({
            ...prevState,
            button2: !prevState.button2,
            name: nam // Toggle button state
          }));
        //   console.log(userButtonStates.button2)
    }


    


    const [usersData , setUsersData] = useState([]);



    const fetchUser =  async ()=>{
        try{
            const response = await getUsers([uId]);
            // console.log(response.data);
            setUsersData(response.data);

        }
        catch(err){
            console.log(err);
        }
      

    }

    
    

    
    useEffect(()=>{

        const fetchUser =  async ()=>{
            try{
                const response = await getUsers([uId]);
                // console.log(response.data);
                setUsersData(response.data);
    
            }
            catch(err){
                console.log(err);
            }
          
    
        }
    


        fetchUser();

    },[buttonStates , uId ])


    const handleDeleteUser = async (e)=>{


        try{
           const res = await delUser(e);
           alert(res.data.message);
            fetchUser();
        }catch(err){
             console.log(err)
        }
   
           //    delUser(e);
           //    console.log(attendanceRecord)
           setUserButtonStates((prevState) => ({
               ...prevState,
               button3: !prevState.button3, // Toggle button state
             }));
           
       }
   
   




  return (
    <div className={style.mainContainer}>
        <div className={style.heading}>
            <span>User Portal</span>
            <button onClick={handleCrossBtn}>X</button>

        </div>
        <div className={style.contentDivider}></div>
   

{(!userButtonStates.button1 && !userButtonStates.button2)  ?  
    
    usersData.map((item)=> 
    <div className={style.tableAlpha} key={item._id}>
<table  id={item._id}>
<thead>
    <tr><th>Name:</th></tr>
    <tr><th>Email:</th></tr>
</thead> 
    <tbody>
    <tr><td>{item.name}</td></tr>
    <tr><td>{item.email}</td></tr> 
   
</tbody>  
</table>
<div className={style.btns}>
    <button  onClick={(e)=> handleLeaveUser(item._id) }>Leaves</button>
    <button  onClick={(e)=>{handleAttendanceUser(item._id , item.name)} }>Show Attendance</button>
    <button  onClick={(e)=>{handleDeleteUser(item._id )} }>Delete User</button>
</div>
</div>
)

: (!userButtonStates.button2 && userButtonStates.button1) ?




<LeaveTable  receivedData={leaveRecord}  /> 

: 

<>

<div className={style.attendanceRecord}>
<span>Name: {userButtonStates.name}</span>
<AttendanceTable attendanceRecord={attendanceRecord}  /> 

</div>

</>
}
   

   


        </div>
        
  )
}

export default Users












