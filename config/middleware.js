// to take the flash message and add it to response
module.exports.setFlash = (req, res, next) => {
    res.locals.flash = {
        'success': req.flash('success'),
        'error':req.flash('error')
    }
    next();
}