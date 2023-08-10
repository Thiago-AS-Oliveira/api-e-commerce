const mongoose = require("mongoose")

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String },
        name: { type: String },
        image: { type: String },
        price: { type: Number },
        shipping: { type: Number },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    amount: { type: Number, required: true },
    address: { type: Object, required: true },
    status: { type: String, default: "em preparação" },
    estimatedDelivery: { type: Date },
  },
  { timestamps: true }
)

module.exports = mongoose.model("Order", OrderSchema)
