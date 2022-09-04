import Joi from '@hapi/joi';
import HttpStatus from 'http-status-codes';
export const noteValidator = (req, res, next) => {
    const schema = Joi.object({
        Title: Joi.string().min(4).alphanum(2).required(),
        Descreption: Joi.string().min(4).required()
        
    });
    const { error, value } = schema.validate(req.body);
  if (error) {
    next(error);
    return value;
  } else {
    next();
  }
};