'use strict'
const mongoose = require('mongoose'); 
const User = require('../models/user');
const service = require('../services/services');



function signUp(req, res){ 
	
	const user = new User({ 
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password
	}) 
	user.save((err) =>{

		if(err) res.status(500).send({message: 'Error al crear el usuario'});
		return res.status(200).send({ token: service.createToken(user) }) 

	})
}

function signIn(req, res){
	User.find({email: req.body.email}, (err, user) => { 
		console.log(user);

		if(err) return  res.status(500).send({message:'Hubo  un error'});
		if(user.length == 0) return res.status(404).send({message:'usuario no encontrado'});
		req.user = user;
		res.status(200).send({
			message: 'Te has logueado correctamente',
			token: service.createToken(user)
		})
		


	});


}
function getUsers(req, res){
		User.find((err, user)=>{
			return res.status(200).send({users:user});
		})
	}

module.exports = {
	signUp,
	signIn,
	getUsers
}