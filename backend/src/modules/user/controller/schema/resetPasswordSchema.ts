import Joi from "joi";

export const resetPasswordSchema = Joi.object({
    newPassword: Joi.string()
        .min(8)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
        .optional()
        .messages({
            'string.pattern.base': 'Password should have at least one lowercase letter, one uppercase letter, and one digit, and its length should be at least 8 characters',
        }),
    otp:Joi.required(),
})