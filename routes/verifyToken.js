const jwt = require("jsonwebtoken")

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token

  if (authHeader) {
    const token = authHeader.split(" ")[1]
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) return res.status(403).json("Token Inválido !")
      req.user = user
      next()
    })
  } else {
    return res.status(401).json("Você não está autenticado !")
  }
}

const verifyTokenAndAuth = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next()
    } else {
      res.status(403).json("Você não tem permissão para isso !")
    }
  })
}

module.exports = { verifyToken, verifyTokenAndAuth }
