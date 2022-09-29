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

export const labelValidator = (req, res, next) => {
    const schema = Joi.object({
      label: Joi.string().required()
    });
    const { error, value } = schema.validate(req.body);
    if (error) {
      res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`,
      
      });
      return value;
    } else {
      next();
    }
  };