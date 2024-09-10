import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useLocation } from 'react-router-dom';
import {format} from 'date-fns';
import {userAttendance , getLeaveRecord , fetchRecord} from '../api'
import style from '../components/Dashboard.module.css';
import AttendanceTable from '../components/AttendanceRecordTable';
import LeavePortal from '../components/LeavePortal';
// import axios from 'axios';
// import axios from 'axios';
import { RiFolderUserFill } from "react-icons/ri";
import { VscRequestChanges } from "react-icons/vsc";
import { FaPaperPlane } from "react-icons/fa";

 
import { SiFiles } from "react-icons/si";
import { MdManageHistory , MdCoPresent } from "react-icons/md";
import User from '../components/Users';
import ShowLeave from '../components/ShowLeave';
import { useNavigate } from 'react-router-dom';
import AllAttendance from '../components/AllAtendance';












const Dashboard = ({uId,    isAdmin , userEmail , userName}) => {
   
  
  // attendanceRecord State is containing User's Previous Record
  const [attendanceRecord, setAttendanceRecord] = useState([]);

  //showTable and showLeave are managing state of Buttons (show table , and leave portal) on situations
  let [showTable , setShowTable] = useState([{curState: false , curBtnValue:"Show Attendance"}]);
  // let [showLeave , setShowLeave] = useState([{curState: false , curBtnValue:"Leave Portal"}]);


  // const [uId , setUid] = useState('66d99a0920c70ac482b7ef2a'); //temp
  
  const [leaveRecord , setLeaveRecord] = useState([]);

 const navigate = useNavigate();

  const [buttonStates, setButtonStates] = useState({
    button1: false,
    button2: false,
    button3: false,
    button4: false,
  });
  
  //aStatus state is storing the status of user attendance status

  const [aStatus, setaStatus] = useState('present');

  const [isClicked , setIsClicked] = useState(false);
  
  let [today , setToday] = useState(); // storing current date

  // this function and useEffect is for making date format 

  useEffect(()=>{
    let date = new Date();
    return setToday( format(date, 'dd-MMM-yyyy'))

  },[])


const handlePresentBtn = ()=>{
    // fetchRecords(uId);
    console.log(today)
    // console.log(uId , "here")
    // setAttendance((prev)=>[ {date:today , status:"present"}, ...prev ])
  }

const handleLeaveBtn = ()=>{
     
    // !(showLeave[0].curState) ? setShowLeave([{curState:true , curBtnValue:"Hide Attendance" , btnStyle: {backgroundColor : 'red'}}]) : setShowLeave([{curState:false , curBtnValue:"Show Attendance"}]) ;
    // console.log("clicked");
     
    // !buttonStates.button2 ? buttonStates.button2()

    setButtonStates((prevState) => ({
      ...prevState,
      button2: !prevState.button2, // Toggle button state
    }));

  }


const handleShowBtn = (uId)=>{
  // setShowTable(true);
  // console.log("show btn ", uId)
  fetchRecords(uId);
  !(showTable[0].curState) ? setShowTable([{curState:true , curBtnValue:"Hide Attendance" , btnStyle: {backgroundColor : 'red'}}]) : setShowTable([{curState:false , curBtnValue:"Show Attendance"}]) ;
  // console.log(showTable[0].curBtnValue)
}

// this function is sending our today's attendance  to backend and db
const handleSubmit = async (u) => {
  !isClicked && setIsClicked(true);
  try {
    const response = await userAttendance({  uId, aStatus ,today , userName });
    // chng==='unClicked' && setChng('clicked') ;
    alert(response.data.message);
    
  } catch (error) {
    alert(error.response.data.message)
      // console.error('Error:', error);
  }
};



// from here I am fetching Attendance Record

const fetchRecords = async (uId) => {

  try {
      const response = await fetchRecord(uId);
    
      
      setAttendanceRecord( response.data );

        
      // console.log(response.data )
     
  } catch (err) {
    setAttendanceRecord([])
      console.error("getting:" , err);
  }
};


// individual user all leave record


const fetchLeaveRecords = async (uId) => {

  try {
     const response = await getLeaveRecord([uId]);
      
      setLeaveRecord( response.data );

  } catch (err) {

      console.error("getting:" , err);
      setLeaveRecord([]);
  }
};



useEffect(() => {

  !(isAdmin[0].admin) && fetchRecords(uId);
  
  // console.log("Here is Data:")
  
   setIsClicked(false);
},[uId , isClicked , isAdmin]);



const handleUserButton = ()=> {

  setButtonStates((prevState) => ({
    ...prevState,
    button1: !prevState.button1, // Toggle button state
  }));
}

const handleAllButton = (buttonKey)=>{
  
  // console.log(btn)

  setButtonStates((prevState) => ({
    ...prevState,
    [buttonKey]: !prevState[buttonKey], // Toggle the specific button
  }));
  

  fetchRecords("alltoday");
  

}











  return (

    <div className={style.mainContainer}>
      <h1>{isAdmin[0].admin ? "Admin" : "Student"} Dashboard</h1>

     <div>
      <label htmlFor='present'>Date:</label>
      <span > {today}  </span>
      </div>

     
      {(isAdmin[0].admin) ?


      <div className={style.adminDashboard}>

      <DashBoardContainer span1Class="userIcon" span2Class="aka" span1Content={<RiFolderUserFill />} 
      span2Content="Users" clickFnc={()=>handleAllButton('button1')} />

      <DashBoardContainer divClass="usersLeave" span1Class="userIcon" span2Class="aka" span1Content={<VscRequestChanges />} 
      span2Content="Users' Leave Request" clickFnc={()=>handleLeaveBtn()} />

      <DashBoardContainer divClass="userAttenanceRecord"  span1Class="userIcon" span2Class="aka" span1Content={<SiFiles />} 
      span2Content="Users' Attendance Record" clickFnc={()=>handleAllButton('button3')} />
      <DashBoardContainer divClass="adminSetting" span1Class="userIcon" span2Class="aka" span1Content={<MdManageHistory />} 
      span2Content="Settings"  onClick={()=>handleAllButton('button4')} />

      { buttonStates.button1 &&
      <User uId={uId} fetchRecords={(e)=>{fetchRecords(e)}} attendanceRecord={attendanceRecord} fetchLeaveRecords={(e)=>fetchLeaveRecords(e)} leaveRecord={leaveRecord}  handleCrossBtn={()=>handleUserButton()} buttonStates={buttonStates.button1}  ></User>
}
      { buttonStates.button3 &&
      <div className={style.cstmShowing}>
     <ShowLeave  portalTitle="Attendance" handleCrossBtn={()=>{handleAllButton('button3'); }} >
      <div className={style.adminAttendanceRecordTable}>
     <AllAttendance attendanceRecord={attendanceRecord} userId={uId}  /> 
         </div>
     </ShowLeave>
     </div>
}

{/* {buttonStates.button2 &&
<div className={style.leavePortal}>
      <LeavePortal uId={uId} handleCrossBtn={()=>handleLeaveBtn()} />
     </div> 
} */}

      </div>



      :


         <>

  
    
     <div className={style["button-container"]}>
      <form onSubmit={(e)=>{ e.preventDefault();  handleSubmit(uId)}} >
         <label>
                Status:
                <select value={aStatus} onChange={(e) => setaStatus(e.target.value)}>
                    <option value="present">Present</option>
                    <option value="absent">Absent</option>
                </select>
            </label>
            <Buttons btnClass={style.presentBtn} type='submit' btnValue="Mark Attendance" btnClickFn={(e)=>handlePresentBtn(e)} />
            </form>
    
     {/* <Buttons btnClass={style.leaveBtn} btnValue="Leave Request" btnClickFn={()=>handleLeaveBtn()} />
     <Buttons btnClass={style.showBtn} btnStyle={showTable[0].btnStyle} btnValue={showTable[0].curBtnValue} btnClickFn={()=>{handleShowBtn(uId)}} /> */}
     

    <div className={style.userDashContainer}>

     <DashBoardContainer span1Class="userIcon" divClass='userLeaveReq' span2Class="aka" span1Content={<FaPaperPlane />} 
      span2Content="Leave Request" clickFnc={()=>handleLeaveBtn()} />
     <DashBoardContainer span1Class="userIcon" divClass='userAttenanceRecord' span2Class="aka" span1Content={<MdCoPresent />} 
      span2Content="Show Attendance" clickFnc={()=>{handleShowBtn(uId)}} />
     
     </div>
     
     </div> 

</>

     }
     

     {showTable[0].curState &&
     
      


<div className={style.cstmShowing}>
<ShowLeave  portalTitle="Attendance" handleCrossBtn={()=>handleShowBtn(uId)} >
 <div className={style.adminAttendanceRecordTable}>
<AttendanceTable attendanceRecord={attendanceRecord} userId={uId}  /> 
    </div>
</ShowLeave>
</div>
  
      }


 
    {buttonStates.button2 && 



    //  <div className={style.leavePortal2}>
      <LeavePortal fetchLeaveRecords={(e)=>fetchLeaveRecords(e)} leaveRecord={leaveRecord} userName={userName}  st={buttonStates.button2} uId={uId} handleCrossBtn={()=>handleLeaveBtn()} isAdmin={isAdmin} />
    //  </div> 
     }
     

{/* 
    {buttonStates.button2 && 
     <ShowLeave userName={userName}  st={buttonStates.button2} uId={uId} handleCrossBtn={()=>handleLeaveBtn()} isAdmin={isAdmin}    />
     } */}
     

    <div className={style.logOutBtn}>
     <button onClick={()=>{localStorage.clear(); navigate('/login')}} >Log Out</button>
     </div>
    
    </div>
  );
};

export default Dashboard;





function Buttons({btnClickFn, btnValue , btnClass , btnStyle , type  }){
  return (
    <>
    <button type={type} style={btnStyle} className={btnClass} onClick={btnClickFn} >{btnValue}</button>
    </>
  );
};


function DashBoardContainer ({divClass , span1Class , span2Class , span1Content ,span2Content , clickFnc }){
  return(
   <>
   <div onClick={clickFnc} className={`${style[`${divClass}`]} ${style['adminControl']}`}>
          <span className={`${style[`${span1Class}`]}`}>{span1Content}</span>
          <span className={`${style[`${span2Class}`]}`}>{span2Content}</span>
          </div>
   </> 
  );
};