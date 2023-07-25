module.exports.profile = (req, res) => {
    return res.render("user", {
        title: "USERS",
        header:"WELCOME TO USER'S PROFILE"
    })
}