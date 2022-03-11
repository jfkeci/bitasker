
import Joi from 'joi'

const create = Joi.object({
    title: Joi.string().max(255).required(),
    description: Joi.string().max(510).required(),
    due: Joi.date(),
    importance: Joi.number().valid(0, 1, 2),
    status: Joi.number().valid(0, 1, 2),
    attachments: Joi.array().items(Joi.string()),
    tasks: Joi.array(),
    team: Joi.array().items(Joi.string()),
    watching: Joi.array().items(Joi.string()),
    likes: Joi.array().items(Joi.string()),
    tags: Joi.array().items(Joi.string()),
    createdBy: Joi.string().required(),
});


export default { create };