const express = require("express");
const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

// get all posts
router.get("/", getPosts);

// require auth for all post routes
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// create a post
router.post("/", createPost);

// DELETE a post
router.delete("/:id", deletePost);

module.exports = router;
