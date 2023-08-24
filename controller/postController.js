const Post = require('../model/posts');
const Comment = require('../model/comments');

module.exports.create = async (req, res) => {
//   console.log("reqqq",req.user.name)
    try {
        const post=await Post.create({
            content: req.body.content,
            user: req.user._id,
        })
        await post.populate('user',{name:1});
        // console.log("users",post,users.user.name)
        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: "Post created!"
            });
        }
        // req.flash('success', "Post Published");
      
        return res.redirect('/');
    } catch (err) {
        req.flash('error', "error in creating a post");
        return;
    }
}

// /posts/destroy/:id
module.exports.destroy = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        // req.user._id : gives object Id ; req.user.id: gives string id
        if (post.user.toString() == req.user.id) {
            await Comment.deleteMany({ post: post._id });
            await Post.deleteOne(post);
            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id:req.params.id
                    },
                    message:"post deleted successfully"
                })
            }
            // req.flash('success', "Post Removed!");
            return res.redirect('back');
        }
        else {
            // req.flash('error', "You cannot delete this post");
            return res.redirect('back');
        }
    } catch (err) {
        // req.flash('error', "somethng went wrong");
        // console.log("error in deleting the post", err);
        return;
    }
}


