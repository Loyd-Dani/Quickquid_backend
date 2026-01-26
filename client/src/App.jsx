import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Component Imports
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import AddListings from "./pages/AddListings";
import GigDetails from "./pages/GigDetails";
import SellerDashboard from "./pages/SellerDashboard"; // Make sure this is imported
import Chatbot from "./components/Chatbot";
import UpdateProfile from "./pages/UpdateProfile";
// Import CSS
import "./App.css";

// Helper: Protect Routes (Only logged-in users can access)
const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return user?.token ? children : <Navigate to="/auth" />;
};

// Helper: Protect Seller Routes (Only Sellers can access)
const SellerRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return user?.result?.role === "seller" ? children : <Navigate to="/" />;
};

const App = () => {
  return (
    <BrowserRouter>
      {/* Navbar is OUTSIDE of Routes */}
      <Navbar />
      
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        
        {/* Gig Details (Public) */}
        <Route path="/gig/:id" element={<GigDetails />} />

        {/* Protected Seller Routes */}
        <Route 
          path="/add-listing" 
          element={
            <SellerRoute>
              <AddListings />
            </SellerRoute>
          } 
        />
        
        <Route 
          path="/dashboard" 
          element={
            <SellerRoute>
              <SellerDashboard />
            </SellerRoute>
          } 
        />
        <Route
         path="/dashboard/profile"
         element={
           <SellerRoute>
             <UpdateProfile/>
           </SellerRoute>
          }
        />
      </Routes>

      {/* Chatbot is OUTSIDE of Routes so it floats on every page */}
      <Chatbot />
    </BrowserRouter>
  );
};

export default App;