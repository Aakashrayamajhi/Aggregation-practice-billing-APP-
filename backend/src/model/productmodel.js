import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/billing")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,    
    description: String,
    imageUrl: String,   
});

const Product = mongoose.model("Product", productSchema);

export default Product;