const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const { verifyTokenAndAuth } = require("./verifyToken")

// Modificar
router.put("/:id", verifyTokenAndAuth, async (req, res) => {
  const userID = req.params.id
  const { updateAddress, newAddress, deleteAddress, ...updatedFields } =
    req.body

  if (req.body.password) {
    updatedFields.password = CryptoJS.AES.encrypt(
      updatedFields.password,
      process.env.PASSWORD_SECRET
    ).toString()
  }

  try {
    let updatedUser

    if (deleteAddress) {
      updatedUser = await User.findByIdAndUpdate(
        userID,
        { $pull: { address: { id: deleteAddress } } },
        { new: true }
      )
    }

    if (updatedFields) {
      updatedUser = await User.findByIdAndUpdate(
        userID,
        { $set: updatedFields },
        { new: true }
      )
    }

    if (updateAddress) {
      updatedUser = await User.findByIdAndUpdate(
        userID,
        { $set: { "address.$[elem]": updateAddress } },
        {
          new: true,
          arrayFilters: [{ "elem.id": updateAddress.id }],
        }
      )
    }

    if (newAddress) {
      updatedUser = await User.findByIdAndUpdate(
        userID,
        { $push: { address: newAddress } },
        { new: true }
      )
    }

    const { address, password, ...others } = updatedUser._doc

    res.status(200).json({ message: "Sucesso !", userData: others })
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
})

// Acessar info do usuario
router.get("/find/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    const { password, ...others } = user._doc

    res.status(200).json(others)
  } catch (error) {
    res.status(500).json(err)
  }
})

// Deletar
router.delete("/:id", verifyTokenAndAuth, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).json("Usuario deletado !")
  } catch (error) {
    res.status(500).json(err)
  }
})

module.exports = router
