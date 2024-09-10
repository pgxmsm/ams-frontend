
import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PrivateRoute from './pages/PrivateRoute';
import Dashboard from './pages/Dashboard';
import { useEffect, useState } from 'react';


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [uniqueId , setUniqueId] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [isAdmin , setIsAdmin] = useState([{admin:false , dashboard:"Student"}]);
  // const [userT , setUserT] = useState();
  


  const location = useLocation();
  const [transitionStage, setTransitionStage] = useState('page-enter');


  
  useEffect(() => {
    setTransitionStage('page-exit-active');
    // console.log(isAdmin)
    
    const timeout = setTimeout(() => {
      setTransitionStage('page-enter-active');
    }, 500); // Duration of the transition in CSS (0.5s)
    return () => {
      clearTimeout(timeout);
    };
  }, [location])
  



  return (
<>

 <div className={`page ${transitionStage}`}>
  {/* <Router> */}
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage users={ {isAdmin , setIsAdmin} }  userEmail={{email , setEmail}} userName={{name , setName}}    setUniqueId={setUniqueId} setIsAuthenticated={setIsAuthenticated} />} />
        <Route path="/signup" element={<RegisterPage />} />
        <Route path="/dashboard" element={ <PrivateRoute  isAuthenticated={isAuthenticated}>
              <Dashboard uId={uniqueId[0]} isAdmin={ isAdmin  } userEmail={email}  userName={name[0]}  />
            </PrivateRoute>} />
        {/* Other routes */}
      </Routes>
    {/* </Router> */}


    </div>
   </>
  );
}

// export default App;

export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}