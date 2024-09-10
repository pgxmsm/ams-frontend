import style from '../components/ShowLeave.module.css'
import { format } from 'date-fns';

function LeaveTable({receivedData, leaves, isAdmin,handleLeaveReq}) {

    return(
        <>

        <>
  
       {receivedData.length > 0 ?
       
      <div className={style.adminPendingLeave} >
      
      {receivedData.map((item)=> 
      
      <table  key={item._id} >
      
      <thead>
         <tr><th>Date:</th></tr>
         <tr><th>Status:</th></tr>
         <tr ><th className={style.reasonTh} >Reason:</th></tr>
      </thead> 
      
         <tbody>
         <tr><td>{ format(item.date , 'dd-MMM-yy')}</td></tr> 
         <tr><td>{item.leaveStatus}</td></tr>    
         <tr><td className={style.reasonTd} >{item.reason}</td></tr>
      </tbody> 
      
      </table>
      )}
      
      </div> 
       
      :

      <span> No any application record .</span> }
     

       </>



     

      
      
        </>);
}

export default LeaveTable