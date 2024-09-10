// frontend/src/api.js
import axios from 'axios';

const API_URL =   'http://localhost:5000/api/auth' ; // Replace with your backend IP

export const registerUser = (userData) => {
    return axios.post(`${API_URL}/register`, userData);
};

export const loginUser = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};
export const loginAdmin = (credentials) => {
    return axios.post(`${API_URL}/adminlogin`, credentials);
};
export const userAttendance = (credentials) => {
    return axios.post(`${API_URL}//mark-attendance`, credentials);
};
export const aTable = (userId) => {
    return axios.get(`${API_URL}/attendance/${userId}`);
};

export const sendLeave = (credentials) => {
    return axios.post(`${API_URL}/leave`, credentials);
};

export const updateLeaveStatus = (credentials) => {
    return axios.put(`${API_URL}/leave/status`, credentials);
};

export const getLeaveRecord = (credentials)=>{
    const [uId] = credentials ;
    return axios.get(`${API_URL}/leave/${uId}`);
}
export const getLeaveRequest = (credentials)=>{
    // const [uId] = credentials ;
    return axios.get(`${API_URL}/pending-leave-requests`);
}
export  const fetchRecord = (uId)=>{
    // const [uId] = credentials ;
    return axios.get(`${API_URL}/attendance/${uId}`);
}

// http://192.168.18.9:5000/api/auth/attendance/


export const getUsers = (credentials) => {
    // const [userId] = credentials ;
    return axios.get(`${API_URL}/allusers/${credentials}`);
};

export const delUser = (credentials) => {
    // const [userId] = credentials ;
    return axios.delete(`${API_URL}/deluser/${credentials}`);
    
};