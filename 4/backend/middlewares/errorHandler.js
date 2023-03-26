function errorHandler(err,req,res,next) {
    let msg, code;
    switch(err.name) {
        case "ValidationError":
            const error = Object.keys(err.errors)[0];
            msg = err.errors[error].message;
            code = 400;
            break
        case "Invalid data":
            msg = "Invalid username/password";
            code = 404;
            break;
        case "Invalid token": 
        case "JsonWebTokenError": 
            msg = err.name
            code = 401
            break
        case "MongoServerError": 
            if(err.message.search("duplicate key error") !== -1) {
                code = 400
                msg = "Username already exist";
            }
            break
        default:
            code = 500;
            msg = "Internal server error"
    }
    res.status(code).json({message:msg})
}

module.exports = errorHandler;