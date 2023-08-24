const User = require("../model/users");
const fs = require('fs');
const path = require('path');

module.exports.profile = async (req, res) => {
    console.log(req.local);
    const user = await User.findById(req.params.id);
    if (user) {
        return res.render("user", {
            title: "USERS",
            header: `WELCOME TO ${user.name} PROFILE`,
            profile_user: user
        })
    }

}

// render the sign in page
module.exports.signIn = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render("user_sign_in", {
        title: "SIGNIN",
        header: "SIGN IN"
    })
}

// render the sign up page
module.exports.signUp = (req, res) => {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile')
    }
    return res.render("user_sign_up", {
        title: "SIGNUP",
        header: "SIGN UP"
    })
}

// get the signup data
module.exports.create = (req, res) => {
    console.log("create")
    if (req.body.password != req.body.confirmPassword) {
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                User.create(req.body)
                    .then(user => res.redirect('/users/signin'))
                    .catch(err => console.log("error in finding the user in sigining up"))
            } else {
                return res.redirect("back");
            }
        })
        .catch(err => console.log("error in finding the user in sigining up"))
}

// signin & create a session for the user
module.exports.createSession = (req, res) => {
    req.flash('success', 'Logged in Successfully')
    // console.log("hello")
    return res.redirect('/')
}

module.exports.destroySession = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success', 'You have logged out!')
        return res.redirect('/');
    });
}

module.exports.update = async (req, res) => {
    try {
        if (req.user.id == req.params.id) {

            const user = await User.findById(req.params.id);
            // console.log("id", user)
            User.uploadedAvatar(req, res, async function (err) {
                if (err) console.log("error in uploads");

                user.name = req.body.name;
                user.email = req.body.email;

                if (req.file) {
                    let isExists = fs.existsSync(path.join(__dirname, '..', user.avatar));
                
                    if (isExists) {
                        
                        fs.unlinkSync(path.join(__dirname, '..', user.avatar));
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                // console.log("user", user);
                await User.updateOne({ _id: req.params.id }, user);
            })
            return res.redirect('back');
        }
        else {
            return res.status(401).send("unauthorized")
        }
    } catch (err) {
        console.log("error in updating the profile")
    }
}