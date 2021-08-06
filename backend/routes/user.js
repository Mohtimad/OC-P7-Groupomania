const express = require('express');
const router = express.Router();
const { body, oneOf, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');


const validSchema = {
  username: body('username', 'Your username is not valid').not().isEmpty().matches(/^([a-zA-Z.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{3,32})$/),
  email: body('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
  password: body('password', 'Your password is not valid').not().isEmpty().matches(/(^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{8,64}$)/),
};

const checkError =
  function (req, res, next) {
      const errors = validationResult(req);
      console.log(errors.errors[0].value)
      if (!errors.isEmpty()) {
      }
      next();
  }

router.post('/register', [validSchema.username, validSchema.email, validSchema.password], checkError);
router.post('/login', [validSchema.email], (req, res, next) => next());
router.put('/', oneOf ([
    body('username', 'Your username is not valid').not().isEmpty().matches(/^([a-zA-Z.,'\-àáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ]{3,32})$/),
    body('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail()
  ]), (req, res, next) => {
    try {
      validationResult(req).throw();
      next();  
    } catch (err) {
      return res.status(422).jsonp(err);
    }
})

// routes
router.post('/register', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/', auth, userCtrl.edit);
router.delete('/', auth, userCtrl.delete);

module.exports = router;