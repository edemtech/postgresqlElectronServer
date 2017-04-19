import express from 'express';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

let router = express.Router();

router.post('/', (req, res) => {
  const { identifier, password } = req.body;

  User.query({
    where: { username: identifier },
    orWhere: { email: identifier }
  }).fetch().then(user => {
    if (user) {
      if (bcrypt.compareSync(password, user.get('password_digest'))) {
        const token = jwt.sign({
          id: user.get('id'),
          username: user.get('username'),
          permission: user.get('permission'),

          camcon: user.get('camcon'),
          camconPass: user.get('camconPass'),
          streamate: user.get('streamate'),
          streamatePass: user.get('streamatePass'),
          streamray: user.get('streamray'),
          streamrayPass: user.get('streamrayPass'),
          imlive: user.get('imlive'),
          imlivePass: user.get('imlivePass'),
          mfc: user.get('mfc'),
          mfcPass: user.get('mfcPass'),
          f4f: user.get('f4f'),
          f4fPass: user.get('f4fPass'),
          jasmin: user.get('jasmin'),
          jasminPass: user.get('jasminPass')
        }, config.jwtSecret);
        res.json({ token });
      } else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    } else {
      res.status(401).json({ errors: { form: 'Invalid Credentials' } });
    }
  });

});

export default router;
