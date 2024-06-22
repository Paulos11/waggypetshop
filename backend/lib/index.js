const errorHandler = (error, req, res, next) => {
  if (!res || typeof res.status !== 'function') {
    return next({
      message: "Error handler called without a valid response object.",
      status: 500,
      error: error.message,
    });
  }

  if (error.code === 11000) {
    let errors = {};
    for (let k in error.keyValue) {
      if (error.keyValue.hasOwnProperty(k)) {
        errors[k] = `The provided value for ${k} is already in use.`;
      }
    }
    return res.status(422).json({
      message: "Validation error",
      errors,
    });
  }

  if ("errors" in error) {
    let errors = {};
    for (let k in error.errors) {
      if (error.errors.hasOwnProperty(k)) {
        errors[k] = error.errors[k].message;
      }
    }
    return res.status(400).json({
      message: "Validation error",
      errors,
    });
  }

  return res.status(400).json({
    message: "There seems to be an error.",
    error: error.message,
  });
};

module.exports = { errorHandler };
