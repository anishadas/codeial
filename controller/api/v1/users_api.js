const User = require('../../../model/users');
const jwt = require('jsonwebtoken');

// signin & create a session for the user
module.exports.createSession = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        if (!user || user.password != req.body.password) {
            return res.status(422).json({
                msg: "Invalid username or password"
            })
        }
        return res.status(200).json({
            msg: "SignIn successful,here is your token,please keep it safe!",
            data: {
                token: jwt.sign(user.toJSON(), 'codeial', { expiresIn: '100000' })
            }
        })
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            msg: "Internal Server Error"
        })
    }
}