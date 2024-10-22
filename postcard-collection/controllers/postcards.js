const fs = require("fs");

const postcardsPath = "./postcards.json";

function getAllPostcards() {
  try {
    let postcards = fs.readFileSync(postcardsPath, "utf8");
    postcards = JSON.parse(postcards);
    return postcards;
  } catch (err) {
    throw new Error(err);
  }
}

function getPostcard(postId) {
  try {
    const postcard = getAllPostcards().find((post) => post.id === postId);
    if (!postcard) {
      return { error: "Postcard not found.", status: 404 };
    }
    return postcard;
  } catch (err) {
    throw new Error(err);
  }
}

function addNewPostcard(newPostcard) {
  try {
    const postcards = getAllPostcards();
    console.log(postcards);
    postcards.push(newPostcard);
    fs.writeFile(postcardsPath, JSON.stringify(postcards, null, 2), (err) => {
      if (err) {
        throw new Error("Failed to add new postcard.");
      }
    });
    return newPostcard;
  } catch (err) {
    throw new Error(err);
  }
}

function deletePostcard(postcardId) {
  try {
    let postcards = getAllPostcards();
    const postcardIndex = postcards.findIndex((post) => post.id === postcardId);
    if (postcardIndex === -1) {
      return { error: "Postcard not found.", status: 404 };
    }
    postcards = postcards.filter((post) => post.id !== postcardId);
    fs.writeFile(postcardsPath, JSON.stringify(postcards, null, 2), (err) => {
      if (err) {
        throw new Error("Failed to add new postcard.");
      }
    });
    return { message: "Postcard deleted.", id: postcardId };
  } catch (err) {
    throw new Error(err);
  }
}

function updatePostcard(postCardId, newPostcard) {
  try {
    const postcards = getAllPostcards();
    const postcard = postcards.find((item) => item.id === postCardId);

    if (!postcard) {
      return res.status(404).json({ error: "Postcard not found." });
    }

    postcard.name = newPostcard.name;
    postcard.cidade = newPostcard.cidade;
    postcard.pais = newPostcard.pais;
    postcard.descricao = newPostcard.descricao;
    postcard.imageUrl = newPostcard.imageUrl;
    fs.writeFile(postcardsPath, JSON.stringify(postcards, null, 2), (err) => {
      if (err) {
        throw new Error("Failed to update the postcard.");
      }
    });
    return postcard;
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = {
  getAllPostcards,
  getPostcard,
  addNewPostcard,
  deletePostcard,
  updatePostcard,
};
