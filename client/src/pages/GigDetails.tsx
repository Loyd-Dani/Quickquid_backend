import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const GigDetail = () => {
  const { id } = useParams(); // Get Gig ID from URL
  const [gig, setGig] = useState<any>(null);
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState("");
  const user = JSON.parse(localStorage.getItem("profile") || "null");

  useEffect(() => {
    // 1. Fetch Gig Data
    axios.get(`http://localhost:5000/listings/${id}`).then((res) => setGig(res.data));
    // 2. Fetch Reviews for this Gig
    axios.get(`http://localhost:5000/reviews/${id}`).then((res) => setReviews(res.data));
  }, [id]);

  const handleBuy = async () => {
    if (!user) return alert("Please Login to Buy");
    try {
        // Calls the Payment/Order route
        await axios.post(`http://localhost:5000/orders/${id}`, {}, {
            headers: { Authorization: `Bearer ${user.token}` }
        });
        alert("Order Placed Successfully!");
    } catch (err) { alert("Order Failed"); }
  };

  const handleReview = async () => {
    try {
        await axios.post("http://localhost:5000/reviews", {
            gigId: id,
            star: 5, // Hardcoded for simplicity, add a star selector later
            desc: reviewInput
        }, { headers: { Authorization: `Bearer ${user.token}` } });
        window.location.reload();
    } catch (err) { alert("Could not post review"); }
  };

  if (!gig) return <div>Loading...</div>;

  return (
    <div style={{ padding: "40px", display: "flex", gap: "40px" }}>
      {/* LEFT: Gig Info */}
      <div style={{ flex: 2 }}>
        <h1>{gig.title}</h1>
        {gig.img && <img src={`http://localhost:5000/${gig.img}`} style={{ width: "100%", maxHeight: "400px" }} />}
        <p>{gig.description}</p>
        
        {/* REVIEWS SECTION */}
        <hr />
        <h3>Reviews</h3>
        {reviews.map((r: any) => (
            <div key={r._id} style={{ background: "#f9f9f9", padding: "10px", margin: "10px 0" }}>
                <strong>User: </strong> {r.desc} (⭐ {r.star})
            </div>
        ))}
        
        {/* ADD REVIEW INPUT */}
        <div style={{ marginTop: "20px" }}>
            <input type="text" placeholder="Write a review..." onChange={(e) => setReviewInput(e.target.value)} />
            <button onClick={handleReview}>Post Review</button>
        </div>
      </div>

      {/* RIGHT: Buy Box */}
      <div style={{ flex: 1, border: "1px solid #ddd", padding: "20px", height: "fit-content" }}>
        <h2>Price: ₹{gig.price}</h2>
        <button onClick={handleBuy} style={{ width: "100%", padding: "15px", background: "green", color: "white", fontSize: "18px" }}>
          Continue to Checkout
        </button>
      </div>
    </div>
  );
};

export default GigDetail;