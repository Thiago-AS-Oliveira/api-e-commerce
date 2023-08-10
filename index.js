const dotenv = require("dotenv").config()
const express = require("express")
const app = express()
const mongoose = require("mongoose")
const cors = require("cors")

// Rotas
const userRoute = require("./routes/user")
const authRoute = require("./routes/auth")
const productRoute = require("./routes/product")
const orderRoute = require("./routes/order")
const stripeRoute = require("./routes/stripe")

const port = process.env.PORT || 4001

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Conexão com BD bem sucedida !"))
  .catch((err) => console.log(err))

app.use(cors())
app.use(express.json())

app.use("/api/users", userRoute)
app.use("/api/auth", authRoute)
app.use("/api/products", productRoute)
app.use("/api/orders", orderRoute)
app.use("/api/checkout", stripeRoute)

app.listen(port, () => {
  console.log("Servidor rodando !")
})
