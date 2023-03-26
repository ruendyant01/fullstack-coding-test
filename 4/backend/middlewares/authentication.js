const { checkToken } = require("../helpers/jsontoken");

const {User} = require("../models").models;

function auth(req,res,next) {
    const {access_token} = req.headers;
    try {
        if(!access_token) throw {name: "Invalid token"}
        const token = checkToken(access_token);
        const user = User.findById(token.id);
        if(!user) throw {name: "Invalid token"}
        req.user = token.id;
        next()
    } catch (error) {
        next(error);
    }
}

module.exports = auth