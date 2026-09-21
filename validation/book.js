const Joi = require("joi");


// Create Book Validation
const validateCreateBook = (data) => {

    const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        category: Joi.string().required(),
        isbn: Joi.string().required()
    });

    return schema.validate(data, {
        convert: false
    });
};


// Get Book Validation
const validateGetBook = (data) => {

    const cschema = Joi.object({
        id: Joi.string().required()
    }); 

    return schema.validate(data, {
        convert: false
    });
};


// Update Book Validation
const validateUpdateBook = (data) => {

    const schema = Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        category: Joi.string(),
        isbn: Joi.string()
    });

    return schema.validate(data, {
        convert: false
    });
};


module.exports = {
    validateCreateBook,
    validateGetBook,
    validateUpdateBook
};