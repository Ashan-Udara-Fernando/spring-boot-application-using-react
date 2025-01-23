import React from 'react';
import Navbar from './component/navbar/Navbar';  // Ensure correct path and capitalization
import Sidebar from './component/sidebar/Sidebar';  // Ensure correct path and capitalization
import { Routes, Route } from 'react-router-dom';
import Order from './pages/Order/Order';
import List from './pages/List/List';
import Add from './pages/Add/Add';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const apiurl = "http://localhost:5173"; // Adjust URL if needed

  return (
    <div>
      <ToastContainer/>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add/>} />
          <Route path="/list" element={<List/>} />
          <Route path="/orders" element={<Order/>} />
        
        </Routes>
      </div>
    </div>
  );
}

export default App;
