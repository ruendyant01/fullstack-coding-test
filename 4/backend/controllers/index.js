const {User, Organization} = require("../models").models;
const {decPass} = require("../helpers/bcrypjt");
const {makeToken} = require("../helpers/jsontoken");

class Controller {
    static async register(req,res,next) {
        const {name, username, password} = req.body;
        try {
            await User.create({name,username,password});
            res.status(201).json({message:"Success Created"});
        } catch (error) {
            next(error);
        }
    }

    static async login(req,res,next) {
        const {username, password} = req.body;
        try {
            const user = await User.findOne({username});
            if(!user) throw {name: "Invalid data"}
            const checkPass = decPass(password, user.password);
            if(!checkPass) throw {name: "Invalid data"}
            const token = makeToken({id: user._id});
            res.status(200).json({access_token: token, message:"Success Login"});
        } catch (error) {
            next(error);
        }
    }

    static async allOrgs(req,res,next) {
        try {
            const orgs = await Organization.find({}, "_id name structure UserId");
            res.status(200).json(orgs);
        } catch (error) {
            next(error);
        }
    }

    static async myOrgs(req,res,next) {
        const userId = req.user;
        try {
            const orgs = await Organization.find({UserId:userId}, "_id name structure UserId");
            res.status(200).json(orgs);
        } catch (error) {
            next(error);
        }
    }

    static async createOrgs(req,res,next) {
        const UserId = req.user;
        const {name, structure} = req.body;
        try {
            await Organization.create({name,UserId,structure:JSON.parse(structure)});
            res.status(201).json({message:"Organization success created"});
        } catch (error) {
            next(error);
        }
    }
}

module.exports = Controller;