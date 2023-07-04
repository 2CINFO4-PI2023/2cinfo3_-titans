import Joi from "joi";

export const updateAddressSchema = Joi.object({
    address: Joi.string().required()
})