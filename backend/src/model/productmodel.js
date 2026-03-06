import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/billing", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}); 

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,    
    description: String,
    imageUrl: String,   
});

const Product = mongoose.model("Product", productSchema);

export default Product;