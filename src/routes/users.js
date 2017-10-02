import express from 'express';
import commonValidations from '../shared/validations/signup';
import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';

import User from '../models/user';
import Users from '../collections/users';

let router = express.Router();

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);
  return User.query({
    where: { email: data.email },
    orWhere: { username: data.username }
  }).fetch().then(user => {
    if (user) {
      if (user.get('username') === data.username) {
        errors.username = 'Данное имя занято';
      }
      if (user.get('email') === data.email) {
        errors.email = 'Электронная почта занята';
      }
    }
    return {
      errors,
      isValid: isEmpty(errors)
    };
  })
}

//MAIN API
// fetch all users
router.get('/', (req, res) => {
  Users.forge()
    .fetch()
    .then( (collection) => {
      res.json({error: false, data: collection.toJSON()});
    })
    .catch( (err) => {
      res.status(500).json({error: true, data: {message: err.message}});
    });
});

// fetch exact person
router.get('/:identifier', (req, res) => {
  User.query({
    select: [ 'username',
              'email',
              'permission',
              'camcon',
              'camconPass',
              'streamate',
              'streamatePass',
              'streamray',
              'streamrayPass',
              'imlive',
              'imlivePass',
              'mfc',
              'mfcPass',
              'f4f',
              'f4fPass',
              'jasmin',
              'jasminPass',
            ],
    where: { email: req.params.identifier },
    orWhere: { username: req.params.identifier }
  }).fetch().then(user => {
    res.json({ user });
  });
});

//update person
router.put('/:identifier', (req, res) => {
  User.forge({username: req.params.identifier})
  .fetch({require: true})
  .then(function (user) {
    user.save({
      username: req.body.username,
      email: req.body.email,
      password_digest: bcrypt.hashSync(req.body.password, 10),
      permission: req.body.permission,
      camcon: req.body.camcon,
      camconPass: req.body.camconPass,
      streamate: req.body.streamate,
      streamatePass: req.body.streamatePass,
      streamray: req.body.streamray,
      streamrayPass: req.body.streamrayPass,
      imlive: req.body.imlive,
      imlivePass: req.body.imlivePass,
      mfc: req.body.mfc,
      mfcPass: req.body.mfcPass,
      f4f: req.body.f4f,
      f4fPass: req.body.f4fPass,
      jasmin: req.body.jasmin,
      jasminPass: req.body.jasminPass
    })
    .then(function () {
      res.json({error: false, data: {message: 'User details updated'}});
    })
    .catch(function (err) {
      res.status(500).json({error: true, data: {message: err.message}});
    });
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
})

//remove person
router.delete('/:identifier', (req, res) => {
  User.forge({username: req.params.identifier})
    .fetch({require: true})
    .then( (user) => {
      user.destroy()
        .then( () => {
          res.json({error: true, data: {message: 'User successfully deleted'}});
        })
        .catch( (err) => {
          res.status(500).json({error: true, data: {message: err.message}});
        });
  })
  .catch(function (err) {
    res.status(500).json({error: true, data: {message: err.message}});
  });
});

//create person
router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      const {
        username,
        password,
        permission,
        email,
        camcon, camconPass,
        streamate, streamatePass,
        streamray, streamrayPass,
        imlive, imlivePass,
        mfc, mfcPass,
        f4f, f4fPass,
        jasmin, jasminPass
       } = req.body;

      const password_digest = bcrypt.hashSync(password, 10);

      User.forge({
        username,
        permission,
        email,
        password_digest,
        camcon, camconPass,
        streamate, streamatePass,
        streamray, streamrayPass,
        imlive, imlivePass,
        mfc, mfcPass,
        f4f, f4fPass,
        jasmin, jasminPass
      }, { hasTimestamps: true }).save()
        .then(user => res.json({ success: true }))
        .catch(err => res.status(500).json({ error: err }));
    } else {
      res.status(400).json(errors);
    }
  });

});

export default router;
