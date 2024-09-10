import style from '../components/ShowLeave.module.css';
import { format } from 'date-fns';
import {updateLeaveStatus} from '../api';


function ShowLeave({receivedData , handleCrossBtn , portalTitle  , children}){
    

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




    return(
        <>
         <div  className={style.mainContainer}>
        <div className={style.heading}>
            <span>{portalTitle}</span>
            <button onClick={handleCrossBtn}>X</button>

        </div>
       
        <div className={style.contentDivider}></div>



   {children}



      
   

    


        </div>
        
    
        </>
    )
};

export default ShowLeave;










function adminLeaveTable({receivedData , handleLeaveReq}){

    return(
    <>
  <div>
  
  {receivedData.map((item)=> 
 
 <table  key={item._id} >
 
 <thead>
    
     <tr><th>Name:</th></tr>
     <tr><th>Date:</th></tr>
     <tr><th  >Status:</th></tr>
     <tr ><th className={style.reasonTh} >Reason:</th></tr>
 </thead> 
 
     <tbody>
     <tr><td>{item.userName}</td></tr> 
     <tr><td>{ format(item.date , 'dd-MMM-yy')}</td></tr> 
     <tr><td><select  id={item._id} onChange={(e)=>{handleLeaveReq(e)}}>
             <option value="pending">{item.leaveStatus}</option>
                     <option value="approved">Approve</option>
                     <option value="rejected">Reject</option>
             </select></td></tr>    
    
     
         
     <tr> <td className={style.reasonTd} >{item.reason}</td></tr>
 </tbody> 
 
 </table>
  )}
 
 </div>


    </>);

};