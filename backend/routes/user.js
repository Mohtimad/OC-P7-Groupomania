const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

const validSchema = {
  username: body('username', 'Your username is not valid').not().isEmpty().matches(/^[a-zA-Z.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]*.{3,20}$/),
  email: body('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
  password: body('password', 'Your password is not valid').not().isEmpty().matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/),
};

const validatorCallback =
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    }
    next();
  }

// validate express validator
router.post('/register', [validSchema.username, validSchema.email, validSchema.password], validatorCallback);
router.post('/login', [validSchema.email], (req, res, next) => next());
router.put('/', [validSchema.username, validSchema.email], validatorCallback);

// routes
router.post('/register', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/', auth, userCtrl.edit);
router.delete('/', auth, userCtrl.delete);

module.exports = router;