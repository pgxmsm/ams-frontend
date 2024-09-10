import React, { useEffect, useState } from 'react'
// import style from '../components/Dashboard.module.css'
import style from '../components/ShowLeave.module.css'
import { format } from 'date-fns';

import { sendLeave } from '../api'
// import { getLeaveRecord } from '../api';
import {getLeaveRequest ,  updateLeaveStatus} from '../api';
import ShowLeave from './ShowLeave';
import LeaveTable from './LeaveTable';
import AdminLeaveTable from './AdminLeaveTable';

// import { fetchLeaveRecords } from './handleApi';



function LeavePortal({leaveRecord, uId , handleCrossBtn , isAdmin ,st , userName , fetchLeaveRecords }) {

  const [date , setDate] = useState(); 
  const [reason , setReason] = useState(); 
  const [isClicked , setIsClicked] = useState([{click:false , btnValue : "Show"}]);
  // const [leaveRecord , setLeaveRecord] = useState([]);

  const [lRequest , setLRequest] =  useState([]);



 

 // form submit + leave submit api
  const handleSubmit = async (e)=>{
    try{
    const res = await sendLeave({userId : uId , date , reason , userName});

     
    alert(res.data.message);

    e.target['leaveDate'].value = "";
    e.target['leaveReason'].value = "";
    setReason();        
    }
    catch(err){
         console.log(err)
    }
    
  };


  // individual user all leave record


  // const fetchLeaveRecords = async () => {

  //   try {
  //      const response = await getLeaveRecord([uId]);
        
  //       setLeaveRecord( response.data );

  //   } catch (err) {
 
  //       console.error("getting:" , err);
  //   }
  // };



  const handleShowLeaveBtn =  ()=>{
    fetchLeaveRecords(uId)
    
  }





// admin , all users pending leave request fetching function
  const fetchLeaveRequests = async () => {

    try {
       const response = await getLeaveRequest();
        
        setLRequest( response.data );

        // console.log(response);
       
    } catch (err) {
     
        console.error("getting requests:" , err);
    }

  };
  

// admin , updating leave record function
  const handleLeaveReq = async (e)=>{
   
    try{
    const response = await updateLeaveStatus({leaveId : e.target.id , leaveUpdate: e.target.value });
    alert(response.data.message);
   
    }
    catch(err){
        console.log(err);
    }
  }







  useEffect(()=>{
    fetchLeaveRequests();
    
    // console.log("this is me")
 
   },[st]);







  return (
    <>
    



    <ShowLeave portalTitle="Leave Portal" receivedData={lRequest} handleCrossBtn={handleCrossBtn} >
    {!(isAdmin[0].admin) ? 




      <div className={style.leavePortaal}>



<div className={style.sendLeaveForm} >

    {!(isClicked[0].click) ? 
      <form
    onSubmit={(e)=>{e.preventDefault(); handleSubmit(e)}}
    >
        <label htmlFor="leaveDate">Date:</label>
      <input id='leaveDate'  type="date" onChange={(e)=>{setDate(format(e.target.value, "dd-MMM-yy"))}} />
        <label htmlFor="leaveReason" required>Reason:</label>
      <textarea id='leaveReason' cols={5} rows={5} value={reason} onChange={(e)=>{setReason(e.target.value)}} ></textarea>
      <button type='submit' className={style.submitBtn}>Submit</button>
    </form> 

    :
       <>

    
  
{/* <button onClick={()=>{  handleShowLeaveBtn();   !(isClicked[0].click) ? setIsClicked([{click:true , btnValue:"Hide"}]) : setIsClicked([{click:false , btnValue:"Show"}]) ; } }  className={style.prevLeaveBtn}>{`${isClicked[0].btnValue} Leave Status`}</button> */}

         <LeaveTable  receivedData={leaveRecord}  />

         
         
     </>
     
     
     }

<div className={style.prevLeaveBtnContainer} >
<button onClick={()=>{  handleShowLeaveBtn();   !(isClicked[0].click) ? setIsClicked([{click:true , btnValue:"Hide"}]) : setIsClicked([{click:false , btnValue:"Show"}]) ; } }  className={style.prevLeaveBtn}>{`${isClicked[0].btnValue} Leave Status`}</button>
</div>
</div>  

   
    
    
    
    </div> 
    
    :

    <AdminLeaveTable leaves={lRequest} handleLeaveReq={(e)=>handleLeaveReq(e)} />
    
  }


     </ShowLeave>

    

   
    </>



  );
}

export default LeavePortal;












