const jwt = require('jsonwebtoken');
const multer = require('multer');
const User = require('../models/user.model'); 
const { mkdirSync, existsSync } = require('fs');

const errorHandle = (error, next) => {
  console.error(error);

  if (error.code === 11000) {
    let errors = {};
    for (let k in error.keyValue) {
      if (error.keyValue.hasOwnProperty(k)) {
        errors[k] = `The provided value for ${k} is already in use.`;
      }
    }
    return next({
      message: 'Validation error',
      errors,
      status: 422,
    });
  }

  if (error.errors) {
    let errors = {};
    for (let k in error.errors) {
      if (error.errors.hasOwnProperty(k)) {
        errors[k] = error.errors[k].message;
      }
    }
    return next({
      message: 'Validation error',
      errors,
      status: 400,
    });
  }

  return next({
    message: 'There seems to be an error.',
    status: 400,
  });
};

const auth = async (req, res, next) => {
  console.log('Entering auth middleware');
  try {
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(' ')[1];
      console.log('Token:', token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Decoded token:', decoded);

      const user = await User.findById(decoded.userId);
      console.log('Found user:', user);

      if (!user) {
        console.log('User not found');
        return next({
          message: 'User not found',
          status: 401,
        });
      }

      req.uid = decoded.userId;
      req.user = user;
      console.log('User attached to request');
      next();
    } else {
      console.log('No authorization header');
      return next({
        message: 'Token missing',
        status: 401,
      });
    }
  } catch (err) {
    console.error('Error in auth middleware:', err);
    if (err instanceof jwt.JsonWebTokenError) {
      return next({
        message: 'Invalid token.',
        status: 400,
      });
    }
    errorHandle(err, next);
  }
};

const validationError = (errors, next) =>
  next({
    message: 'There seems to be some validation error',
    errors: {
      password: 'The Password is not confirmed',
    },
    errors,
    status: 422,
  });

const cmsAcces = (req, res, next) => {
  if (req.user.role === 'Customer') {
    return next({
      message: 'Access Denied',
      status: 403,
    });
  }
  next();
};
const adminAcces = (req, res, next) => {
  console.log('Entering adminAcces middleware');
  console.log('User role:', req.user.role);
  if (req.user.role !== 'Admin') {
    console.log('Access denied: User is not an Admin');
    return next({
      message: 'Access Denied',
      status: 403,
    });
  }
  console.log('Admin access granted');
  next();
};

const customerAcces = (req, res, next) => {
  if (req.user.role !== 'Customer') {
    return next({
      message: 'Access Denied',
      status: 403,
    });
  }
  next();
};

const notFoundError = (name, next) =>
  next({
    message: `${name} not found`,
    status: 404,
  });

const upload = (mimeList = []) => {
  const uploadDir = './uploads';

  if (!existsSync(uploadDir)) {
    mkdirSync(uploadDir);
  }

  return multer({
    storage: multer.diskStorage({
      filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        const filename =
          'file' + Date.now() + '-' + Math.round(Math.random() * 1e9) + `.${ext}`;
        cb(null, filename);
      },
      destination: (req, file, cb) => {
        cb(null, uploadDir);
      },
    }),
    fileFilter: (req, file, cb) => {
      if (mimeList.length > 0) {
        if (mimeList.includes(file.mimetype)) {
          cb(null, true);
        } else {
          cb(new Error('File type not supported'));
        }
      } else {
        cb(null, true);
      }
    },
  });
};

module.exports = {
  errorHandle,
  auth,
  validationError,
  cmsAcces,
  adminAcces,
  notFoundError,
  upload,
  customerAcces,
};
