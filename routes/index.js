var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');

//register users
router.route('/v1/users')
.post(userController.postUsers);

//edit user details
router.route('/v1/editUser')
.put(userController.editUser);

//get Users
router.route('/v1/getUsers')
.get(userController.getUsers);

//add Bil to User collection
// router.route('/v1/addBil')
// .put(userController.addBil);

//get all products
router.route('/v1/getProducts')
.get(userController.getProducts);

//add new product  
router.route('/v1/postProduct')
.post(userController.postProduct);  

//add product to cart
router.route('/v1/postCartProduct')
.post(userController.postCartProduct);

//get cart products
router.route('/v1/getCartProducts')
.get(userController.getCartProducts);

router.route('/v1/deleteCartProduct/:_id')
.delete(userController.deleteCartProduct);

module.exports = router;