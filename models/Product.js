const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    categorie: { type: String, required: true },
    discount: { type: Number },
    installments: { type: Number },
    rating: { type: Number },
    shipping: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema)
