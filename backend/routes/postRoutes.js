const express = require("express");
const {
  getPosts,
  createPost,
  deletePost,
} = require("../controllers/postController");

const router = express.Router();

// require auth for all post routes
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

// get all posts
router.get("/", getPosts);

// create a post
router.post("/", createPost);

// DELETE a post
router.delete("/:id", deletePost);

module.exports = router;
