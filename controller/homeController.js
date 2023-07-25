module.exports.home = (req, res) => {
    return res.render("home", {
        title: "HOME",
        header:"WELCOME TO HOME PAGE"
    });
}