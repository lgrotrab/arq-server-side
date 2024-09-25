var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("USERS");
});

router.get("/1", function (req, res, next) {
  res.send("USER 1");
});

router.post("/", function (req, res, next) {
  res.send("POST USER");
});

router.delete("/", function (req, res, next) {
  res.send("DELETE USER");
});

router.put("/", function (req, res, next) {
  res.send("PUT USER");
});

router.get("/:name", function (req, res, next) {
  res.send("USER " + req.params.name);
});

module.exports = router;
