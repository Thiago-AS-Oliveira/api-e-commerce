const mongoose = require("mongoose")

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    categorie: { type: String, required: true },
    discount: { type: Number, default: 0 },
    installments: { type: Number, default: 12 },
    rating: { type: Number },
    shipping: { type: Number, required: true },
    inStock: { type: Boolean, default: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Product", ProductSchema)
