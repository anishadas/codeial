module.exports.home = (req, res) => {
    // getting a cookie
    console.log(req.cookies);

    // changing a cookie value
    res.cookie('user_id', 222);
    return res.render("home", {
        title: "HOME",
        header: "WELCOME TO HOME PAGE"
    });
}