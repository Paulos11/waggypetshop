const logger = (req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  console.log('Body:', req.body);
  console.log('Params:', req.params);
  console.log('Query:', req.query);
  next();
};

module.exports = logger;
