
const express = require('express');
const ProductCtrl = require('../controllers/product');
const UserCtrl = require('../controllers/user');

const auth = require('../middlewares/auth'); 
const api = express.Router();

/*routes  of products*/
api.get('/product', auth, ProductCtrl.getProducts); 
api.get('/product/:productId', ProductCtrl.getProduct); 
api.post('/product', ProductCtrl.saveProduct); 
api.put('/product/:productId', ProductCtrl.updateProduct); 
api.delete('/product/:productId', ProductCtrl.deleteProduct);

/*routes  of users*/

api.get('/users',  UserCtrl.getUsers); 

api.get('/private', auth, function(req, res){
	
	return res.status(200).send({message:'tienes acceso'});

})
api.post('/signUp', UserCtrl.signUp);
api.post('/signIn', UserCtrl.signIn);
module.exports = api;