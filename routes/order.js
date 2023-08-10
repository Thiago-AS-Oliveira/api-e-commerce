const router = require("express").Router()
const Order = require("../models/Order")
const { verifyTokenAndAuth, verifyToken } = require("./verifyToken")

// Cadastrar
router.post("/", verifyToken, async (req, res) => {
  const newOrder = new Order(req.body)

  try {
    const savedOrder = await newOrder.save()

    res.status(200).json({ message: "Salvo !", orderId: savedOrder._id })
  } catch (error) {
    res.status(500).json(error)
  }
})

// Acessar pedidos de usuario
router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const order = await Order.find({ userId: req.params.id })

    res.status(200).json(order)
  } catch (error) {
    res.status(500).json(err)
  }
})

module.exports = router
