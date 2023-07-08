import Joi from "joi";

export const createUserSchema = Joi.object({
    name:Joi.required(),
    file:Joi.any(),
    email:Joi.string().email().required(),
    phone: Joi.string().length(8).optional(),
    address: Joi.string().optional(),
    password: Joi.string().min(8).optional()
})