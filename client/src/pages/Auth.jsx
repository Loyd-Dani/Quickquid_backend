import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [role, setRole] = useState("user"); 
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSignup && formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match!");
    }

    try {
      if (isSignup) {
        // --- REGISTER ---
        const data = new FormData();
        data.append("name", `${formData.firstName} ${formData.lastName}`);
        data.append("email", formData.email);
        data.append("password", formData.password);
        data.append("role", role);
        
        if (role === "seller") {
            if(!file) return alert("Sellers must upload an ID document.");
            data.append("document", file);
        }

        await axios.post("http://localhost:5000/user/register", data, {
            headers: { "Content-Type": "multipart/form-data" }
        });
        
        alert(role === "seller" 
            ? "Registration successful! Please check your email for admin verification." 
            : "Registration successful! Please log in.");
        
        setIsSignup(false); 

      } else {
        // --- LOGIN ---
        const { data } = await axios.post("http://localhost:5000/user/login", {
            email: formData.email,
            password: formData.password
        });

        localStorage.setItem("profile", JSON.stringify(data));
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || "Something went wrong.";
      if (error.response?.status === 403) {
        alert("Account pending approval. Please wait for the admin to verify your document.");
      } else {
        alert(errorMessage);
      }
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto", padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2 style={{textAlign: "center"}}>{isSignup ? "Register" : "Log In"}</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        
        {isSignup && (
          <>
            <div style={{ display: "flex", gap: "10px" }}>
              <input name="firstName" placeholder="First Name" onChange={handleChange} style={{flex: 1, padding: "8px"}} />
              <input name="lastName" placeholder="Last Name" onChange={handleChange} style={{flex: 1, padding: "8px"}} />
            </div>
            
            <select value={role} onChange={(e) => setRole(e.target.value)} style={{padding: "8px"}}>
                <option value="user">Buyer</option>
                <option value="seller">Seller</option>
            </select>

            {role === "seller" && (
                <div style={{ fontSize: "12px" }}>
                    <label>Upload ID:</label>
                    <input type="file" onChange={(e) => setFile(e.target.files[0])} />
                </div>
            )}
          </>
        )}

        <input name="email" type="email" placeholder="Email" onChange={handleChange} required style={{padding: "8px"}} />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required style={{padding: "8px"}} />
        
        {isSignup && (
          <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} required style={{padding: "8px"}} />
        )}

        <button type="submit" style={{ background: "#007bff", color: "white", padding: "10px", border: "none", cursor: "pointer", borderRadius: "4px" }}>
          {isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>

      <div style={{ marginTop: "15px", textAlign: "center" }}>
        <button onClick={() => setIsSignup(!isSignup)} style={{ background: "none", border: "none", color: "#007bff", cursor: "pointer", textDecoration: "underline" }}>
          {isSignup ? "Switch to Log In" : "Switch to Sign Up"}
        </button>
      </div>
    </div>
  );
};

export default Auth;