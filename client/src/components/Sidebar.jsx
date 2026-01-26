import React from "react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();
  const user = JSON.parse(localStorage.getItem("profile"));

  const isActive = (path) => location.pathname === path ? "active" : "";

  return (
    <div className="dashboard-sidebar">
      <div>
        {/* Menu Links */}
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard" className={`sidebar-link ${isActive("/dashboard")}`}>
              <i className="fa-solid fa-grip"></i>
              <span>Overview</span>
            </Link>
          </li>
          <li>
            {/* Link to view active orders */}
            <Link to="/dashboard" className="sidebar-link">
              <i className="fa-solid fa-briefcase"></i>
              <span>My Services</span>
            </Link>
          </li>
          <li>
            <Link to="/add-listing" className={`sidebar-link ${isActive("/add-listing")}`}>
              <i className="fa-solid fa-plus-circle"></i>
              <span>Post a Gig</span>
            </Link>
          </li>
          <li>
            <a href="#" className="sidebar-link">
              <i className="fa-regular fa-calendar"></i>
              <span>Calendar</span>
            </a>
          </li>
          <li>
            <Link to="/dashboard/profile" className={`sidebar-link ${isActive("/dashboard/profile")}`}>
             <i className="fa-solid fa-gear"></i>
             <span>Settings</span>
            </Link>
          </li>
        </ul>
      </div>

      {/* Bottom User Info */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", paddingTop: "20px", borderTop: "1px solid #eee" }}>
         <img 
            src="https://randomuser.me/api/portraits/men/85.jpg" 
            alt="Profile" 
            style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
         />
         <div>
            <h4 style={{fontSize: "0.9rem", margin: 0}}>{user?.result?.name.split(" ")[0]}</h4>
            <p style={{fontSize: "0.8rem", color: "#888", margin: 0}}>Seller</p>
         </div>
      </div>
    </div>
  );
};

export default Sidebar;