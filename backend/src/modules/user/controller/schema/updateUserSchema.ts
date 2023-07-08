import Joi from "joi";

export const updateUserSchema = Joi.object({
    name:Joi.optional(),
    email:Joi.string().email().optional(),
    phone: Joi.string().length(8).optional(),
    address: Joi.string().optional(),
    password: Joi.string().min(8).optional()
})