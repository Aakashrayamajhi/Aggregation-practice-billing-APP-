import mongoose from "mongoose";

const billSchema = new mongoose.Schema({

  name: String,
  price: Number,
    
  transactionId: String,
  createdAt: { type: Date, default: Date.now }

});     

const Bill = mongoose.model("Bill", billSchema);

export default Bill;