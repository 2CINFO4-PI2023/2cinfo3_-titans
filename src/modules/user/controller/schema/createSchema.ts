import Joi from "joi";

export const createUserSchema = Joi.object({
    name:Joi.required(),
    email:Joi.string().email().required(),
    phone: Joi.string().length(8).optional(),
    addres: Joi.string().optional(),
    password: Joi.string().min(8).optional()
})