const User = require("../model/users");

module.exports.profile = (req, res) => {
    console.log(req.local);
    return res.render("user", {
        title: "USERS",
        header: "WELCOME TO USER'S PROFILE"
    })
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
    // console.log("hello")
    return res.redirect('/')
}

module.exports.destroySession = (req, res) => {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
}