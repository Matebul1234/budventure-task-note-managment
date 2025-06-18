const Joi = require('joi');


const add_notes = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().required(),
        category: Joi.string().required(),
        content: Joi.string(),
    });
    const { error } = schema.validate(req.body); // Use req.body
    if (error) {
        return res.status(400).json({ message: error.details[0].message }); // Provide specific error details
    }
    next();
};

module.exports = {
    add_notes
}