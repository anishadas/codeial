module.exports.index = (req, res) => {
    return res.status(200).json({
        msg: "list of posts v2",
        posts: []
    })
}