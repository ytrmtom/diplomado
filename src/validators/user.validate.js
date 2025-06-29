import Joi from "joi";

export const createUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
});

export const updateUserSchema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).optional(),
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).optional(),
});