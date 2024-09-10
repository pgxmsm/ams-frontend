// import axios from "axios";
// import { useEffect, useState } from "react";
// import {aTable} from '../api';

import style from '../components/Dashboard.module.css'



import { format } from "date-fns";

function AttendanceTable({attendanceRecord}){


    return(
      <>
    <div className={`${style.attendanceRecordTable} attendanceRecordTable` }>
       <table>
       <thead>
      <tr>
        <th>Date</th>
        <th>Attendance</th>
      </tr>
    </thead>
       {attendanceRecord.map((item, index)=>{
        // console.log(records[0]['re'])
        return(
         <tbody key={index}>
           <tr>
           <td>{format(item.date, 'dd-MMM-yyyy')}</td>
           <td>{item.aStatus}</td>
           </tr>
           
          </tbody>)}
       )}
          
        </table>
        </div>
      </>
    );
  
  };

  export default AttendanceTable ;