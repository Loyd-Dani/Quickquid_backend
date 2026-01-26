import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Import the new sidebar

const SellerDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem("profile"));
  
  // Mock Earnings Data (Replace with real backend data later)
  const earnings = {
    pending: 120.50,
    available: 450.00
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orderRes = await axios.get("http://localhost:5000/orders/seller", {
          headers: { Authorization: `Bearer ${user?.token}` }
        });
        setOrders(orderRes.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div className="dashboard-container">
      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
        </div>

        {/* --- TOP ROW: Profile & Avatar --- */}
        <div className="dashboard-grid">
          {/* Profile Card */}
          <div className="dash-card profile-header">
            <div>
              <h2 style={{ marginBottom: "10px" }}>Welcome back, {user?.result?.name}!</h2>
              <p style={{ color: "var(--text-light)", marginBottom: "20px" }}>
                Manage your student freelance activities here.
              </p>
              <button className="btn-teal">Update Info</button>
            </div>
            {/* Placeholder Avatar - Replace with real user image if available */}
            <img 
              src="https://randomuser.me/api/portraits/men/85.jpg" 
              alt="Profile" 
              className="user-avatar-large"
            />
          </div>
           {/* Right column empty in top row for now, can add a small widget here */}
           <div></div>
        </div>


        {/* --- MIDDLE ROW: Orders & Earnings --- */}
        <div className="dashboard-grid">
          
          {/* Left: Active Orders */}
          <div className="dash-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
               <h3 className="dash-card-title" style={{marginBottom: 0}}>Recent Orders</h3>
               <button className="btn-outline">View All</button>
            </div>
            
            {loading ? <p>Loading orders...</p> : orders.length === 0 ? (
              <p style={{ color: "var(--text-light)" }}>No active orders yet.</p>
            ) : (
              <div className="orders-list">
                {orders.slice(0, 5).map((order) => (
                  <div key={order._id} className="order-item">
                    <div className="order-info">
                      <h4>{order.title || "Gig Service"}</h4>
                      <p className="order-meta">
                        Buyer ID: {order.buyerId.substring(0, 8)}... • ₹{order.price}
                      </p>
                    </div>
                    <div>
                      <span className={`badge ${order.isCompleted ? "badge-completed" : "badge-pending"}`}>
                        {order.isCompleted ? "Completed" : "Pending"}
                      </span>
                    </div>
                     <div>
                        <button className="btn-outline" style={{marginLeft: "10px"}}>View</button>
                     </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Earnings Overview */}
          <div className="dash-card">
            <h3 className="dash-card-title">Earnings Overview</h3>
            <div className="earning-stat">
              <p>Available for Withdrawal</p>
              <h3>₹{earnings.available.toFixed(2)}</h3>
            </div>
            <div className="earning-stat">
               <p>Pending Clearance</p>
               <h3 style={{fontSize: "1.5rem", color: "#f0ad4e"}}>₹{earnings.pending.toFixed(2)}</h3>
            </div>
            <button className="btn-teal" style={{width: "100%"}}>Withdraw Funds</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;