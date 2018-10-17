const express       = require('express');
const app           = express();
const bodyParser    = require('body-parser'); // for getting the request data
const mongoose 	    = require('mongoose'); // for mongo db
const morgan		=require('morgan');  // for showing the request details in console
require('express-async-errors');  // this is working only in async and await routing
// database connection
require('./mongo');


// models 
require('./models/Post');
require('./models/Comment');

app.use(bodyParser.json())
   .use(morgan());


// const Post = mongoose.model("Post");

app.use('/posts',require('./routes/post'));   // for post routing

/*


// for getting the all record
app.get('/posts', async (req,res)=>{
	try{
		const dataPost= await Post.find({})
        res.send(dataPost);

	} catch(error)
	{
		res.status(500);
	}
	
});

// save the particular record
app.post('/posts', (req, res) =>{
	const postdata = new Post();
	postdata.title=req.body.title;
	postdata.content=req.body.content;
	postdata.save();
	res.send(postdata);
});

// getting the particular record
app.get('/posts/:postId', async (req, res)=>{
	// const postData=await Post.find({ _id : req.params.postId});  // return in array
	const postData=await Post.findOne({ _id : req.params.postId});  // return in array
	res.send(postData);
})

// update the record
app.put('/posts/:postId', async (req,res)=> {
	const UpdatedPost = await Post.findByIdAndUpdate(
		{_id:req.params.postId},
		req.body,
		{new:true,runValidators:true}
		);
	res.send(UpdatedPost);
});

// for deleting the records
app.delete('/posts/:postId',async (req,res)=>{
	const deletedPost = await Post.findByIdAndRemove({
		_id:req.params.postId
	});
	res.send(deletedPost);
});



*/


// Not found routes
app.use((req, res, next)=>{
	req.status=404;
	const error =new Error('Routes is not found');
	next(error);
});

// error handling for production
if(app.get("env") === "production")
{
	app.use((error, req, res, next)=>{
		res.status(req.status || 500);
		res.send({message:error.message});
	});

}

// error handling for developement
app.use((error, req, res, next)=>{
	res.status(req.status || 500);
	res.send({message:error.message,stack:error.stack});
});

app.listen(5000,()=>{
	console.log('your server is runnig at 5000');
})