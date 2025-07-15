function validate(schema, source = 'body') {
  return (req, res, next) => {
    const data = req[source];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      const err = new Error('ValidationError');
      err.statusCode = 400;
      err.isJoi = true;
      err.message = error.details.map((detail) => detail.message).join(', ');
      return next(err);
    }
    next();
  };
}

export default validate;
