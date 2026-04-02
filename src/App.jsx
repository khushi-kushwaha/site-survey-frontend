import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import Home from './pages/Home';
import Register from './pages/Register';
import Login from "./pages/Login";
import ProtectedRoute from './api/ProtectedRoute';
import UserDashboard from './pages/UserDashboard';
import UserSurveyForm from './pages/UserSurveyForm';
import UserSite from './pages/UserSite';
import UserFloorplan from './pages/UserFloorplan';
import UserLabelspace from './pages/UserLabelspace';
import UserRfscan from './pages/UserRfscan';
import UserSitedetail from './pages/UserSitedetail';
import AdminDashboard from './pages/AdminDashboard'



const App = () => {
  return (
    <>
      <Toaster position="top-center" />

      <BrowserRouter>
        <Routes>
         <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

           <Route element={<ProtectedRoute />}>
             <Route path="/userdashboard" element={<UserDashboard />} />
             <Route path="/usersurveyform/:id" element={<UserSurveyForm />} />
             <Route path="/usersite" element={<UserSite />} />
             <Route path="/userfloorplan/:id" element={<UserFloorplan />} />
             <Route path="/userlabelspace/:id" element={<UserLabelspace />} />
             <Route path="/UserRfscan/:id" element={<UserRfscan />} />
             <Route path="/site/:id" element={<UserSitedetail />} />
             <Route path="/admindashboard" element={<AdminDashboard />} />
            
           </Route>
         
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;