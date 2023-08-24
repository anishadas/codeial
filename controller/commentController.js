const Comment = require('../model/comments');
const Post = require('../model/posts');

module.exports.create = async (req, res) => {
    try {
        const post = await Post.findById(req.body.post);
        if (post) {
            const comment = await Comment.create({
                content: req.body.comment,
                user: req.user._id,
                post: req.body.post,
            });
            if (comment) {
                post.comments.push(comment);
                post.save();
                req.flash('success', "comment added");
                res.redirect('/');
            }
        }
    } catch (err) {
        req.flash('error', "something went wrong");
        // console.log("error in creating a comment");
        return;
    }
}

module.exports.destroy = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment.user.toString() == req.user.id) {
            let postId = comment.post;
            await comment.deleteOne(comment);
            req.flash('success', "comment removed!");
            const update_post = await Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
            if (update_post) {
                return res.redirect('back');
            }
            else {
                req.flash('error', "something went wrong");
                res.redirect('back');
            }
        } 
    } catch (err) {
        req.flash('error', "something went wrong");
        // console.log("error in deleting comment");
        return;
    }
    
}