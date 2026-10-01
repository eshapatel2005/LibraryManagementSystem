const Joi=require("joi");

// Create User Validation
const validateCreateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required().messages({
            "string.empty": "Please enter a valid name.",
            "string.min": "Please enter a valid name.",
            "any.required": "Please enter a valid name."
        }),

        email: Joi.string().email().required(),

        phone: Joi.string().required(),

        password: Joi.string().min(8).required()
    });

    return schema.validate(data, {
        convert: false
    });
};


// Get User Validation
const validateGetUser = (data) => {
    const schema = Joi.object({
        id: Joi.string().optional()
    });

    return schema.validate(data);
};


// Update User Validation
const validateUpdateUser = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(3),
        email: Joi.string().email(),
        phone: Joi.string(),
        password: Joi.string().min(8)
    });

    return schema.validate(data);
};

//Login user validation 
const validateLoginUser=(data)=>{
    const schema=Joi.object({
        email:Joi.string().email().required(),
        password:Joi.string().required()
    });
    return schema.validate(data,{
        convert:false
    });
};

module.exports={
    validateCreateUser,
    validateGetUser,
    validateUpdateUser,
    validateLoginUser
};