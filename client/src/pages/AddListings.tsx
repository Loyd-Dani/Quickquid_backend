import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddListing = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ title: "", desc: "", price: "", category: "Tech" });
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("profile") || "null");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.desc);
    data.append("price", formData.price);
    data.append("category", formData.category);
    data.append("sellerId", user?.result?._id); 
    if (file) data.append("image", file);

    try {
      await axios.post("http://localhost:5000/listings", data, {
        headers: { Authorization: `Bearer ${user?.token}`, "Content-Type": "multipart/form-data" },
      });
      alert("Gig Posted!");
      navigate("/");
    } catch (err) {
      alert("Failed to post gig");
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "50px auto", padding: "20px", border: "1px solid #ddd" }}>
      <h2>Post a New Gig</h2>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <input type="text" placeholder="Title (e.g., I will build a website)" onChange={(e) => setFormData({...formData, title: e.target.value})} />
        <textarea placeholder="Description" onChange={(e) => setFormData({...formData, desc: e.target.value})} />
        <input type="number" placeholder="Price (₹)" onChange={(e) => setFormData({...formData, price: e.target.value})} />
        <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
        <button type="submit" style={{ background: "#4caf50", color: "white", padding: "10px" }}>Publish Gig</button>
      </form>
    </div>
  );
};

export default AddListing;