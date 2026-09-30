const joi = require('joi')

class UserSchemaValidation{
static createUser = joi.object({
    name:joi.string().required().trim().messages({
        "string.required":"Name is required",
        "any.required":"Name is required"
    }),
    email:joi.string().email().required().trim().messages({
        "string.required":"Email is required",
        "any.required":"Email is required"
    }),
    password:joi.string().min(6).max(15).required().trim().messages({
        "string.min":"place provide minimun 6 digit password",
        "string.max":"you are not upto 15-digit password",
        "string.required":"password is required",
        "any.required":"password is required"
    })
})

static login = joi.object({
    email:joi.string().email().required().trim().messages({
        "string.required":"Email is required",
        "any.required":"Email is required"
    }),
    password:joi.string().required().trim().messages({
        "string.required":"Password is required",
        "any.required":"Password is required"
    })
})

}

module.exports = UserSchemaValidation