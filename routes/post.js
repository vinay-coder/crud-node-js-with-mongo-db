const router        = require('express').Router();

const mongoose 	    = require('mongoose'); // for mongo db

const Post          = mongoose.model("Post");


// for getting the all record
router.get('/', async (req,res)=>{
	try{
		const dataPost= await Post.find({})
        res.send(dataPost);

	} catch(error)
	{
		res.status(500);
	}
	
});

// save the particular record
router.post('/', async (req, res) =>{
	const postdata = new Post();
	postdata.title=req.body.title;
	postdata.content=req.body.content;
	await postdata.save();
	res.send(postdata);
});

// getting the particular record
router.get('/:postId', async (req, res)=>{
	// const postData=await Post.find({ _id : req.params.postId});  // return in array
	const postData=await Post.findOne({ _id : req.params.postId});  // return in array
	res.send(postData);
})

// update the record
router.put('/:postId', async (req,res)=> {
	const UpdatedPost = await Post.findByIdAndUpdate(
		{_id:req.params.postId},
		req.body,
		{new:true,runValidators:true}
		);
	res.send(UpdatedPost);
});

// for deleting the records
router.delete('/:postId',async (req,res)=>{
	const deletedPost = await Post.findByIdAndRemove({
		_id:req.params.postId
	});
	res.send(deletedPost);
});

module.exports = router;