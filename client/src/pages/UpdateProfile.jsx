import React, { useState } from "react";
import Sidebar from "../components/Sidebar";

const UpdateProfile = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  
  // Mock State (In real app, fetch this from DB)
  const [formData, setFormData] = useState({
    name: user?.result?.name || "",
    university: "Student University",
    gradYear: "2026",
    major: "Computer Science",
    skills: ["Engineering", "Python", "Design"]
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const removeSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  return (
    <div className="dashboard-container">
      <Sidebar />

      <div className="dashboard-content">
        <div className="dashboard-header">
          <h1>Profile Update</h1>
        </div>

        <div className="profile-update-card">
          <div className="profile-layout">
            
            {/* Left: Photo Section */}
            <div className="photo-section">
              <label style={{fontWeight: 600, marginBottom: "15px"}}>Profile Picture</label>
              <img 
                src="https://randomuser.me/api/portraits/men/85.jpg" 
                alt="Profile" 
                className="profile-img-large" 
              />
              <button className="btn-teal" style={{padding: "8px 15px", fontSize: "0.9rem"}}>
                Change Photo
              </button>
            </div>

            {/* Right: Form Section */}
            <div className="form-section">
              
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  className="form-input" 
                  value={formData.name} 
                  onChange={handleChange}
                />
                <p className="form-hint">Currently name is editable.</p>
              </div>

              <div className="form-group">
                <label className="form-label">University</label>
                <input 
                  type="text" 
                  name="university"
                  className="form-input" 
                  value={formData.university}
                  onChange={handleChange}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Major/Field of Study</label>
                  <input 
                    type="text" 
                    name="major"
                    className="form-input" 
                    value={formData.major}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Graduation Year</label>
                  <select 
                    name="gradYear" 
                    className="form-select"
                    value={formData.gradYear}
                    onChange={handleChange}
                  >
                    <option>2024</option>
                    <option>2025</option>
                    <option>2026</option>
                    <option>2027</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Skills/Services</label>
                <div className="skills-container">
                  {formData.skills.map((skill) => (
                    <div key={skill} className="skill-tag">
                      {skill}
                      <span className="remove-tag" onClick={() => removeSkill(skill)}>×</span>
                    </div>
                  ))}
                  <button className="btn-outline" style={{border: "1px dashed #ccc", fontSize: "0.8rem"}}>+ Add</button>
                </div>
              </div>

              <div style={{marginTop: "30px", borderTop: "1px solid #eee", paddingTop: "20px"}}>
                <button className="btn-teal" style={{width: "100%", padding: "12px"}}>Save Changes</button>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;