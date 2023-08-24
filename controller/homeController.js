const Comment = require('../model/comments');
const Post = require('../model/posts');
const User = require('../model/users');

module.exports.home = async (req, res) => {
    // getting a cookie
    // console.log(req.posts);

    // changing a cookie value
    // res.cookie('user_id', 222);
    try {
        console.log("home")
        const posts = await Post.find({}).sort('-createdAt').populate('user').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        const users = await User.find({});
        return res.render("home", {
            title: "HOME",
            header: "WELCOME TO HOME PAGE",
            posts: posts,
            all_users: users
        });

    } catch (err) {
        console.log("error in finding posts", err);
        return;
    }

}