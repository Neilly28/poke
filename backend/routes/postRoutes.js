const express = require("express");
const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/postController");

// require auth for all post routes
const router = express.Router();

const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// get all posts
router.get("/", getPosts);

// create a post
router.post("/", createPost);

// DELETE a post
router.delete("/:id", deletePost);

module.exports = router;
