const Book = require("../models/book.model");
const Joi = require("joi");

//validation
const validateCreateBook = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    category: Joi.string().required(),
    isbn: Joi.string().required(),
  });

  return schema.validate(data, {
    convert: false,
  });
};

const validateGetBook = (data) => {
  const schema = Joi.object({
    id: Joi.string().optional(),
  });
  return schema.validate(data);
};

const validateUpdateBook = (data) => {
  const schema = Joi.object({
    title: Joi.string(),
    author: Joi.string(),
    category: Joi.string(),
    isbn: Joi.string(),
  });
  return schema.validate(data);
};

//Create Book
const createBook = async (req, res) => {
  try {
    const { error } = validateCreateBook(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }
    const book = await Book.create(req.body);

    res.status(201).json({
      success: true,
      message: "Book created successfully",
      data: book,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

//Get all books 
const getAllBooks=async (req,res)=>{
    try{
        const books=await Book.find();
        res.status(200).json({
            success:true,
            message:"Books fetched successfully",
            data: books
        });
    }catch(error){
        res.status(500).json({
            success:false,
            message:error.message
        });
    }
};

//Get book by Id 
const getBookById=async(req,res)=>{
    try{
        const{error}=validateGetBook(req.params);
        if(error){
            return res.status(400).json({
                success:false,
                message:error.details[0].message
            });
        }
        const book=await Book.findById(req.params.id);
        if(!book){
            return res.status(404).json({
                success:false,
                message:"Book not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Book fetched successfully",
            data:book 
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

//Update Book 
const updateBook=async(re1,res)=>{
    try{
        const{error}=validateUpdateBook(req.body);
        if(error){
            return res.status(400).json({
                success:false,
                message:error.details[0].message
            });
        }
        const book=await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        if(!book){
            return res.status(404).json({
                success:false,
                message:"Book not found"
            });
        }
        res.status(200).json({
            success:true,
            message:"Book updated successfully",
            data:book
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

//Delete book 
const deleteBook=async(req,res)=>{
    try{
        const book=await Book.findByIdAndDelete(req.params.id);
        if(!book){
            return res.status(404).json({
                success:false,
                message:"Book not found0"
            });
        }
        res.status(200).json({
            success:true,
            message:"Book deleted successfully"
        });
    }catch(err){
        res.status(500).json({
            success:false,
            message:err.message
        });
    }
};

module.exports={
    createBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
};

