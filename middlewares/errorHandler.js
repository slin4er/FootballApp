const errorHandler = (err, req, res, next) => {
    if(err.message === 'Not Found') {res.status(404).json({error: err.message})}
    if(err.message === 'Players have not been added yet') {res.status(400).json({error: err.message})}
    next(err)
}

module.exports = errorHandler