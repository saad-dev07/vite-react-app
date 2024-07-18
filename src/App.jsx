import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from './Components/Auth/Register';
import Login from './Components/Auth/Login';
import ResetPassword from './Components/Auth/Reset';
import AdminDashboard from './Components/Dashboard/AdminDashboard/AdminDashboard';
import Reports from './Components/Dashboard/AdminDashboard/Reports';
import UserManagement from './Components/Dashboard/AdminDashboard/UserManagement';
import UserDashboard from './Components/Dashboard/UserDashboard/UserDashboard';
import UserProfile from './Components/Dashboard/AdminDashboard/UserProfile';
// import api from './utils/api';
// import tokenExpiryCheck from './utils/tokenExpiryCheck';

function App() {
  const PageTitle = ({ title }) => {
    React.useEffect(() => {
      document.title = title;
    }, [title]);
    return null;
  };
  // tokenExpiryCheck();
  return (
    <Router>
      <Routes>
        <Route path='/' element={<><PageTitle title="Login | Pronet" /><Login /></>}/>

        <Route path='/ResetPassword' element={<><PageTitle title="Reset Password | Pronet" /><ResetPassword /></>}/>

        <Route path='/Admin'element={<><PageTitle title="Admin Dashboard | Pronet" /><AdminDashboard /></>}/>

        <Route path='/User' element={<><PageTitle title="User Dashboard | Pronet" /><UserDashboard /></>}/>

        <Route path='/UserManagement' element={<><PageTitle title="User Management | Pronet" /><UserManagement /></>}/>
        
        <Route path='/UserManagement/Register' element={<> <PageTitle title="Create New User | Pronet" /><Register /></>}/>

        <Route path='/UserManagement/UserProfile/:userId' element={<><PageTitle title="User Profile | Pronet" /><UserProfile /></>}/>

        <Route path='/Reports' element={<><PageTitle title="Reports | Pronet" /><Reports /></>}/>
      </Routes>
    </Router>
  );
};

export default App;
