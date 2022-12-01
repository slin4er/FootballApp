const errorHandler = (err, req, res, next) => {
    if(err.message === 'Not Found') {res.status(404).json({error: err.message})}
    if(err.message === 'Have not been added yet') {res.status(400).json({error: err.message})}
    if(err.message === 'Email and password must be provided') {res.status(400).json({error: err.message})}
    if(err.message === 'This email was already taken') {res.status(400).json({error: err.message})}
    if(err.message === 'Something went wrong, try again!') {res.status(400).json({error: err.message})}
    if(err.message === 'Unauthorized, token is required!') {res.status(401).json({error: err.message})}
    next(err)
}

module.exports = errorHandler