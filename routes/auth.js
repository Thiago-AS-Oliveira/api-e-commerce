const router = require("express").Router()
const User = require("../models/User")
const CryptoJS = require("crypto-js")
const jwt = require("jsonwebtoken")

// Cadastrar
router.post("/register", async (req, res) => {
  const { username, name, lastname, password, email } = req.body

  const userExists = await User.exists({ username })
  if (userExists) {
    return res.status(422).json("Nome de usuário já existente!")
  }

  const emailExists = await User.exists({ email })
  if (emailExists) {
    return res.status(422).json("Email já existente!")
  }

  const newUser = new User({
    username,
    email,
    name,
    lastname,
    password: CryptoJS.AES.encrypt(
      password,
      process.env.PASSWORD_SECRET
    ).toString(),
  })

  try {
    const savedUser = await newUser.save()
    res.status(201).json(`${savedUser.username} cadastrado!`)
  } catch (error) {
    return res.status(500).json(error)
  }
})

// Login

router.post("/login", async (req, res) => {
  const { email, userPassword } = req.body

  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json("Usuário não cadastrado !")
    }

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.PASSWORD_SECRET
    )

    const OriginalPassword = hashedPassword.toString(CryptoJS.enc.Utf8)

    if (OriginalPassword !== userPassword) {
      return res.status(401).json("Senha incorreta !")
    }

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    )

    const { password, address, ...others } = user._doc

    return res.status(200).json({ ...others, accessToken })
  } catch (err) {
    return res.status(500).json(err)
  }
})

module.exports = router
