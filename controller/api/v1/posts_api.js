const Post = require('../../../model/posts')
const Comment = require('../../../model/comments');

module.exports.index = async (req, res) => {
    const posts = await Post.find({}).sort('-createdAt').populate('user').populate({
        path: 'comments',
        populate: {
            path: 'user'
        }
    });
    // console.log(posts)
    return res.status(200).json({
        msg: "list of posts",
        posts: posts
    })
}

module.exports.destroy = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        console.log("hiii", req.user)
        if (post.user == req.user.id) {
            await Comment.deleteMany({ post: post._id });
            await Post.deleteOne(post);
            return res.status(200).json({
                msg: "post and associated comments deleted"
            })
        }
        else {
            return res.status(401).json({
                msg:"you cannot delete this post"
            })
        }
       
    } catch (err) {
        return res.status(500).json({
            msg:"Internal server error"
        })
    }
}
