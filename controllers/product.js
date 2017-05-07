
const Product = require('../models/product')

function getProducts(req, res){

	Product.find({}, (err, products)=>{

		if(err)	return res.status(500).send({message: 'hubo un error'})
		if(!products)	return res.status(400).send({message: 'no encontro el producto'}) 
		res.status(200).send(products);
	})

}
function getProduct(req, res){

	let productId = req.params.productId
	Product.findById(productId, function (err, product){
	if(err)	return res.status(500).send({message: 'hubo un error'})
	if(!product)	return res.status(400).send({message: 'no encontro el producto'})
	console.log(product);
	product.category = 'celular';
	res.status(200).send({ product })	

	});	

}
function saveProduct(req, res){

	console.log(req.body);

	let product = new Product();
	product.name = req.body.name
	product.picture = req.body.picture
	product.price = req.body.price
	product.category = req.body.category
	product.description = req.body.description

	product.save((err, productStored) =>{ 

		if(err) res.status(500).send({message:'error al salvar la base de datos'})

			res.status(200).send({product: productStored});

	})

}

function updateProduct(req, res){

	let productId = req.params.productId;
	let update = req.body;
	Product.findByIdAndUpdate(productId, update, (err, product)=>{ 
		if(err) res.status(500).send({message:'error al actualizar datos'});
		res.status(200).send({message:product})
	});
}

function deleteProduct(req, res){

	let productid = req.params.productId;

	Product.findById(productId, (err, product) =>{

		if(err) res.status(500).send({message: 'error al borrar el producto'}) 
		product.remove(err => { 
		if(err) res.status(500).send({message: 'error al borrar el producto'})
		}, 
		res.status(200).send({message: 'el  producto ha sido eliminado'})
		)	
	});
}
 module.exports = {

 	getProduct,
 	getProducts,
 	saveProduct,
 	updateProduct,
 	deleteProduct
 }