const UserModel = require('../models/UserModel');

module.exports = {
  list(req, res, next) {
    UserModel.find().exec()
      .then(users => {
        return res.json(users);
      })
      .catch(err => {
        return next(err);
      });
  },

  create(req, res, next) {
    const { name, email, bio, image, activated } = req.body;

    console.log({name, email, bio, image, activated});

    new UserModel({ name, email, bio, image, activated }).save()
      .then(user => {
        return res.json(user);
      })
      .catch(err => {
        return next(err);
      });
  },

  update(req, res, next) {
    UserModel.findOne({_id: req.params.id}, (err, user) => {
      if (err) {
        return next(err);
      }
      user.name = req.body.name;
      user.email = req.body.email;
      user.bio = req.body.bio;
      user.image = req.body.image;
      user.activated = req.body.activated;


      user.save((err, user) => {
          console.log('Error: ', err)
          res.json(user);
      });
    });
  },

  show(req, res, next) {
    UserModel.findOne({ _id: req.params.id }).exec()
      .then(user => {
        return res.json(user);
      })
      .catch(err => {
        return next(err);
      });
  },

  remove(req, res, next) {
    UserModel.findByIdAndRemove({_id: req.params.id}, (err, user) => {
      if (err) {
        return next(err);
      }
      res.redirect('/users');
    });
  }

}
