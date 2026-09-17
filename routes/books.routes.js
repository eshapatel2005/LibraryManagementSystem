const express = require("express");

const router = express.Router();

const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} = require("../controller/book");

const validation = require("../middleware/validation");

const {
  validateCreateBook,
  validateGetBook,
  validateUpdateBook,
} = require("../validation/book");

// Create Book
router.post("/", validation(validateCreateBook), createBook);

// Get All Books
router.get("/", getBooks);

// Get Book By ID
router.get("/:id", validation(validateGetBook, "params"), getBookById);

// Update Book
router.put("/:id", validation(validateUpdateBook), updateBook);

// Delete Book
router.delete("/:id", deleteBook);

module.exports = router;
