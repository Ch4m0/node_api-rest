const mongoose = require('mongoose'); 
const app = require('./app');
const config =  require('./config');


mongoose.connect(config.db, (err, res)=>{

	if(err) throw err

	app.listen(config.port, () => {
			console.log("API REST runnig in port 3000")
	})
})
