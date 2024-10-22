var express = require("express");
var router = express.Router();
const { v4: uuidv4 } = require("uuid");
const {
  getAllPostcards,
  getPostcard,
  addNewPostcard,
  deletePostcard,
  updatePostcard,
} = require("../controllers/postcards.js");

router.use(express.json());

router.get("/", (req, res) => {
  try {
    const postcards = getAllPostcards();
    res.send(postcards);
  } catch (err) {
    res.status(500).json({ error: "Failed to read postcards data." });
  }
});

// Rota GET para obter um único Postcard pelo ID
router.get("/:id", (req, res) => {
  try {
    const postId = req.params.id;
    const postcard = getPostcard(postId);
    if (postcard.status == 404) {
      res.status(404).json({ error: "Postcard not found." });
    } else {
      res.json(postcard);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to read postcards data." });
  }
});

router.post("/", (req, res) => {
  try {
    const { name, cidade, pais, descricao, imageUrl } = req.body;
    //const imageUrl = `https://picsum.photos/400/300`; // Gerador automático de imagens
    const newPostcard = {
      id: uuidv4(),
      name: name || "teste",
      cidade: cidade || "teste",
      pais: pais || "teste",
      descricao: descricao || "teste",
      imageUrl: imageUrl || "https://picsum.photos/400/300",
    };
    console.log(newPostcard);
    res.send(addNewPostcard(newPostcard));
  } catch (err) {
    res.status(500).json({ error: "Failed to add new postcard." });
  }
});

router.delete("/:id", (req, res) => {
  try {
    const postId = req.params.id;
    const response = deletePostcard(postId);
    if (response.status == 404) {
      res.status(404).json({ error: "Postcard not found." });
    } else {
      res.json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to delete postcard" });
  }
});

router.put("/:id", (req, res) => {
  try {
    const postId = req.params.id;
    const { name, cidade, pais, descricao, imageUrl } = req.body;
    const response = updatePostcard(postId, {
      name,
      cidade,
      pais,
      descricao,
      imageUrl,
    });
    if (response.status == 404) {
      res.status(404).json({ error: "Postcard not found." });
    } else {
      res.json(response);
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to update postcard" });
  }
});

module.exports = router;
