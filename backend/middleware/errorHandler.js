const errorHandle = (err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
  });
};

module.exports = errorHandle;