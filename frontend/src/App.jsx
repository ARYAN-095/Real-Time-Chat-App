 import React from 'react';
 import { Navbar } from './components/Navbar';
 
 import {Routes, Route} from "react-router-dom";

 import {HomePage} from "./pages/HomePage";
 import {SignUpPage} from "./pages/SignUpPage";
 import {LoginPage} from "./pages/LoginPage";
 import { ProfilePage } from './pages/ProfilePage';

 const App = () => {
   return (
     <div className="text-red-500"> 
     
     <Navbar />

     <Routes>

       <Route path="/" element={<HomePage />} />
       <Route path="/signup" element={<SignUpPage />} />
       <Route path="/login" element={<LoginPage />} />
       <Route path="/settings" element={<SettingsPage />} />
       <Route path="/" element={<ProfilePage />} />

     </Routes>

     </div>
   )
 }

 export default App;
 