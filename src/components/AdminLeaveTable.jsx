import style from '../components/ShowLeave.module.css'
import { format } from 'date-fns';

function AdminLeaveTable({leaves , handleLeaveReq}) {
  return (
   
    <div className={style.adminPendingLeave}>


  {leaves.map((item)=> 
 
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
  )
}

export default AdminLeaveTable