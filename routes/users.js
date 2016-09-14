var express = require('express');
var router = express.Router();
const UsersController = require('../controllers/UsersController');


// Get a list of users
router.get('/', UsersController.list);

// Create a  new user
router.post('/', UsersController.create);

//Update a user
router.put('/:id', UsersController.update);

// Get one user
router.get('/:id', UsersController.show);

// Delete a user
router.delete('/:id', UsersController.remove);

module.exports = router;
