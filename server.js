const express= require('express');
const app= express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose');

// database connection
require('./mongo');

// models 
require('./models/Post');

app.use(bodyParser.json());

const Post = mongoose.model("Post");

app.get('/posts', async (req,res)=>{
	try{
		const dataPost= await Post.find({})
        res.send(dataPost);

	} catch(error)
	{
		res.status(500);

	}
	
});

app.post('/posts', (req, res) =>{
	const postdata = new Post();
	postdata.title=req.body.title;
	postdata.content=req.body.content;
	postdata.save();
	res.send(req.body);
});


app.listen(5000,()=>{
	console.log('your server is runnig at 5000');
})