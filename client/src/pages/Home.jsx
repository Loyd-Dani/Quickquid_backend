import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/listings")
      .then((res) => setGigs(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      {/* HERO SECTION */}
      <section className="hero">
        <h1>Student Services, On Demand.</h1>
        <div className="search-container">
          <input type="text" placeholder="What service are you looking for?" />
          <button>Search</button>
        </div>
      </section>

      {/* CATEGORIES SECTION */}
      <section className="categories">
        <div className="categories-grid">
          <div className="category-item">
            <i className="fa-solid fa-graduation-cap"></i>
            <h3>Academic Help</h3>
          </div>
          <div className="category-item">
            <i className="fa-solid fa-chalkboard-user"></i>
            <h3>Tutoring</h3>
          </div>
          <div className="category-item">
            <i className="fa-solid fa-pen-nib"></i>
            <h3>Creative Services</h3>
          </div>
          <div className="category-item">
            <i className="fa-solid fa-code"></i>
            <h3>Tech & Code</h3>
          </div>
          <div className="category-item">
            <i className="fa-solid fa-person-running"></i>
            <h3>Campus Errands</h3>
          </div>
          <div className="category-item">
            <i className="fa-solid fa-language"></i>
            <h3>Translation</h3>
          </div>
        </div>
      </section>

      {/* FEATURED GIGS (DYNAMIC) */}
      <section className="featured">
        <div className="section-header">
          <h2>Featured Gigs</h2>
        </div>
        
        <div className="gigs-grid">
          {gigs.length === 0 ? (
             <p>No gigs posted yet. Be the first!</p>
          ) : (
            gigs.map((gig) => (
              <Link to={`/gig/${gig._id}`} key={gig._id} className="gig-card">
                {/* Product Image */}
                <img 
                  src={gig.image ? `http://localhost:5000/uploads/${gig.image}` : "https://via.placeholder.com/500x300"} 
                  alt={gig.title} 
                  className="gig-image" 
                />
                
                <div className="gig-details">
                  {/* Seller Info (Mocked for now if backend doesn't populate) */}
                  <div className="seller-info">
                    <img src="https://randomuser.me/api/portraits/lego/1.jpg" alt="User" className="seller-avatar" />
                    <div>
                      <div className="seller-name">{gig.sellerName || "Student Seller"}</div>
                      <div className="seller-status">Level 1 Seller</div>
                    </div>
                  </div>
                  
                  <p className="gig-title">{gig.title}</p>
                </div>
                
                <div className="gig-footer">
                  <div className="price">₹{gig.price}</div>
                  <div className="rating">
                    <i className="fa-solid fa-star"></i> 5.0 <span>(New)</span>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>

      <footer>
        <p>&copy; 2026 QuickQuid. Made for Students.</p>
      </footer>
    </div>
  );
};

export default Home;