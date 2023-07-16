import Joi from "joi";

export const signupSchema = Joi.object({
    password: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        .optional()
        .messages({
            'string.pattern.base': 'Password should have at least one lowercase letter, one uppercase letter, and one digit, and its length should be at least 8 characters',
        }),
    email:Joi.string().email().required(),
    name:Joi.string().required(),
    phone: Joi.string()
    .regex(/^\+216(20|21|22|23|24|25|26|27|28|29|50|52|53|54|55|56|58|90|91|92|93|94|95|96|97|98|99)\d{6}$/)
    .optional()
    .allow(''),
    address: Joi.string().optional(),
})