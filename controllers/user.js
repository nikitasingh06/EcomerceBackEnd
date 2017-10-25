var User = require('../models/user');
var Product = require('../models/products');
var Cart = require('../models/Cart');
var Promise = require("bluebird");

//register users
exports.postUsers = function (req, res) {
    var user = new User({
        password: req.body.password,
        email: req.body.email,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        created_at: new Date(),
        updated_at: ""
    });

    user.save(function (err, response) {
        if (err) {
            return customHandleError(req, res, next, err);
        }

        res.json({
            success: true,
            body: response
        })

    });
};

exports.addBill = function(req,res){
    var _id = req.params._id;
    User.findOne({_id: id }, function (err, user) {
        if (err) {
            res.json(err);
        }
        var _id = req.body._id;
        user._id = _id;
        user.save(function (err, response) {
            if (err) {
                res.json({
                    status: false,
                    respData: {
                        data: err
                    }
                });
            }
            else {
                res.json({
                    status: true,
                    respData: {
                        data: response
                    }
                });
            }
        })
        
})
}

//edit user details
exports.editUser = function (req, res) {
    var id = req.params._id;
    User.findOne({_id: id }, function (err, user) {
        if (err) {
            res.json(err);
        }

        var name = req.body.name;
        var password = req.body.password;
        var email = req.body.email;
        var phoneNumber = req.body.phoneNumber;
        var created_at = req.body.created_at;

        user.name = name;
        user.password = password;
        user.phoneNumber = phoneNumber;
        user.email = email;
        user.created_at = created_at;
        user.updated_at = new Date();

        user.save(function (err, response) {
            if (err) {
                res.json({
                    status: false,
                    respData: {
                        data: err
                    }
                });
            }
            else {
                res.json({
                    status: true,
                    respData: {
                        data: response
                    }
                });
            }
        })
    })
};

//get all users
exports.getUsers = function (req, res) {
    User.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }
        res.json(response);
    })
}


//get all products
exports.getProducts = function (req, res) {
    Product.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
}

//add new product
exports.postProduct = function (req, res) {
    var product = new Product({
        name: req.body.name,
        img: req.body.img,
        color: req.body.color,
        type: req.body.type,
        price: req.body.price,
        quantity: req.body.quantity

    });

    product.save(function (err, response) {
        if (err) {
            return customHandleError(req, res, next, err);
        }

        res.json({
            success: true,
            body: response
        })

    });
};

//add product to cart
exports.postCartProduct = function (req, res) {
    var cart = new Cart({
        name: req.body.name,
        img: req.body.img,
        color: req.body.color,
        type: req.body.type,
        price: req.body.price,
        quantity: req.body.quantity
    });

    var img = req.body.img;
    Cart.findOne({ img: img }, function (err, response) {
        if (response) {
            res.json("already exists");
        }
        else {
            cart.save(function (err, response) {
                if (err) {
                    return customHandleError(req, res, next, err);
                }

                res.json({
                    success: true,
                    body: response
                })

            });
        }
    });
}

//get cart products
exports.getCartProducts = function (req, res) {
    Cart.find({}, function (err, response) {
        if (err) {
            return res.json(req, res, err);
        }

        res.json(response);
    })
};

//delete product from cart
exports.deleteCartProduct = function (req, res) {
    var _id = req.params._id;
    Cart.findOne({ _id: _id }, function (err, response) {
        if (err) {
            res.json("cannot find item")
        }

        if (response) {
            Cart.remove({ _id: _id }, function (err1, response1) {
                if (err1) {
                    res.json(err1);
                }
                res.json(response1);
            })
        }
        else {
            res.json("cannot find ");
        }



    })
}

