const { verifyTokenAndAuth } = require("./verifyToken")

const router = require("express").Router()
const stripe = require("stripe")(process.env.STRIPE_KEY)

router.post("/payment/:id", verifyTokenAndAuth, async (req, res) => {
  const { amount, id, email } = req.body

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "brl",
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        email, // Inclui o e-mail do cliente nos metadados
        customerId: id, // Inclui o ID do cliente nos metadados
      },
    })

    res.status(200).json({ clientSecret: paymentIntent.client_secret })
  } catch (error) {
    res.status(500).json({ error })
  }
})
module.exports = router
