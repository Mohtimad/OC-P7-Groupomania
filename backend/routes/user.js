const express = require('express');
const router = express.Router();
const {body, validationResult} = require('express-validator');

const userCtrl = require('../controllers/user');

router.post('/register', [
    body('username', 'Your username is not valid').not().isEmpty().matches(/^[a-zA-Z.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]*.{3,20}$/),
    body('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    body('password', 'Your password is not valid').not().isEmpty().matches(/((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64})/),
  ],
  function (req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    }
      next();
  });

router.post('/login',
  [body('email').not().isEmpty().isEmail().normalizeEmail()], (req, res, next) => next()
);

router.post('/register', userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;