const router = require("express").Router()
const Product = require("../models/Product")

// Cadastrar
router.post("/", async (req, res) => {
  const lowerCaseCategorie = req.body.categorie.toLowerCase()
  const newProduct = new Product({ ...req.body, categorie: lowerCaseCategorie })

  try {
    const savedProduct = await newProduct.save()

    res.status(200).json(savedProduct)
  } catch (error) {
    res.status(500).json(error)
  }
})

// Acessar produto
router.get("/find/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    res.status(200).json(product)
  } catch (error) {
    res.status(500).json(err)
  }
})

// Acessar todos os produtos
router.get("/", async (req, res) => {
  const qCategory = req.query.category
  const search = req.query.search
  try {
    let products

    if (qCategory) {
      products = await Product.find({ categorie: qCategory.toLowerCase() })
    } else if (search) {
      const regex = new RegExp(search, "i")
      products = await Product.find({
        $or: [{ name: regex }, { description: regex }],
      })
    } else {
      products = await Product.find()
    }
    res.status(200).json(products)
  } catch (error) {
    res.status(500).json(err)
  }
})

module.exports = router
