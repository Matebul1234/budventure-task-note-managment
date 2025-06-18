const Joi = require('joi');

const signupValidation = (req, res, next) => {
    const schema = Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().max(100).required(),
        password: Joi.string().min(4).max(100).required(),
    });
    const { error } = schema.validate(req.body); // Use req.body
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); // Provide specific error details
    }
    next();
};

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().email().max(100).required(),
        password: Joi.string().min(4).max(100).required(),
    });
    const { error } = schema.validate(req.body); // Use req.body
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); // Provide specific error details
    }
    next();
};

module.exports = {
    signupValidation,
    loginValidation
};
