import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("profile"));

  const handleLogout = () => {
    localStorage.clear();
    navigate("/auth");
  };

  return (
    <header className="navbar">
      <div className="logo">
        <i className="fa-solid fa-link"></i>
        <Link to="/">QUICKQUID</Link>
      </div>
      
      <nav className="nav-links">
        <Link to="/" className="nav-link">Find Services</Link>
        
        {/* LOGIC: Check if user is logged in first */}
        {user ? (
          <>
            {/* IF SELLER: Show Dashboard & Post Gig */}
            {user?.result?.role === "seller" && (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/add-listing" className="nav-link" style={{color: "#00897b"}}>+ Post Gig</Link>
              </>
            )}

            {/* SHOW FOR ALL LOGGED IN USERS */}
            <span className="nav-link">Hi, {user.result.name}</span>
            <button onClick={handleLogout} className="btn-join" style={{background: "#d32f2f"}}>Logout</button>
          </>
        ) : (
          /* GUEST LINKS */
          <>
            <Link to="/auth" className="nav-link">Sign In</Link>
            <Link to="/auth" className="btn-join">Join Now</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;