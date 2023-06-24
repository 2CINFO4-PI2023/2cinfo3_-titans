import Joi from "joi";

export const signupSchema = Joi.object({
    password: Joi.string().min(8).required(),
    email:Joi.string().email().required(),
    name:Joi.string().required(),
    phone: Joi.string().length(8).optional(),
    address: Joi.string().optional(),
})