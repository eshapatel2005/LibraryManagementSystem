const validation = (validate, type = "body") => {

    return (req, res, next) => {

        const data = type === "params"
            ? req.params
            : req.body;

        const { error } = validate(data);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.details[0].message
            });
        }

        next();
    };

};

module.exports = validation;