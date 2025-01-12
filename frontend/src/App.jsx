 import React from 'react';
 import { Navbar } from './components/Navbar';
 
 import {Routes, Route} from "react-router-dom";

 const App = () => {
   return (
     <div className="text-red-500"> 
     
     <Navbar />

     <Routes>

       <Route path="/" element={<HomePage />} />
       <Route path="/signup" element={<HomePage />} />
       <Route path="/login" element={<HomePage />} />
       <Route path="/" element={<HomePage />} />
       <Route path="/" element={<HomePage />} />

     </Routes>

     </div>
   )
 }

 export default App;
 