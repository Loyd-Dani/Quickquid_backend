import express, { Request, Response, Router } from "express";
import multer from "multer";
import Listing from "../models/Listing.js"; 
import { authorize } from "../middleware/auth.js";  

// 1. Extend the Express Request type
interface AuthRequest extends Request {
  userId?: string;
  userRole?: string;
}

const router: Router = express.Router();

// SETUP FILE UPLOAD
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: (error: Error | null, destination: string) => void) => {
    cb(null, "uploads/"); 
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now() + "-" + file.originalname); 
  },
});

const upload = multer({ storage });

// 2. CREATE A LISTING (Only for Logged-in Sellers)
router.post("/", authorize, upload.single("image"), async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    if (req.userRole !== "seller") {
        return res.status(403).json({ message: "Only sellers can create listings." });
    }

    const { title, description, price, category, sellerName } = req.body;

    const newListing = new Listing({
      title,
      description,
      price,
      category,
      sellerName,
      seller: req.userId, // Saves the seller's ID
      image: req.file ? req.file.path : "", 
    });

    await newListing.save();
    res.status(201).json(newListing);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating listing" });
  }
});

// 3. GET LISTINGS (With Filters) - UPDATED!
// This now supports queries like: /listings?userId=123 or /listings?category=tech
router.get("/", async (req: Request, res: Response) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  const qUserId = req.query.userId; // <--- The Dashboard sends this!

  try {
    let listings;

    if (qNew) {
      // Fetch 5 most recent listings
      listings = await Listing.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      // Fetch by category
      listings = await Listing.find({ category: qCategory });
    } else if (qUserId) {
      // Fetch listings belonging to a specific seller (For Dashboard)
      // Note: We use 'seller' because that matches your Schema in the POST route
      listings = await Listing.find({ seller: qUserId }); 
    } else {
      // Fetch all
      listings = await Listing.find();
    }

    res.status(200).json(listings);
  } catch (error) {
    res.status(500).json({ message: "Error fetching listings" });
  }
});

// 4. GET SINGLE LISTING (For Details Page)
// You likely need this for the "GigDetails" page to work
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const listing = await Listing.findById(req.params.id);
    res.status(200).json(listing);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;