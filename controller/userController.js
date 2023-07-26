const User = require("../model/users");

module.exports.profile = (req, res) => {
    return res.render("user", {
        title: "USERS",
        header:"WELCOME TO USER'S PROFILE"
    })
}

// render the sign in page
module.exports.signIn = (req, res) => {
    return res.render("user_sign_in", {
        title: "SIGNIN",
        header: "SIGN IN"
    })
}

// render the sign up page
module.exports.signUp = (req, res) => {
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
                    .then(user =>res.redirect('/users/signin'))
                    .catch(err => console.log("error in finding the user in sigining up"))
            } else {
                return res.redirect("back");
            }
        })
        .catch(err => console.log("error in finding the user in sigining up"))
}

// get the signin data
module.exports.createSession = (req, res) => {

}