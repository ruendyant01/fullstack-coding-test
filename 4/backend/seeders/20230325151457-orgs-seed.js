'use strict';

const data = require("../data/orgsData");
const {User} = require("../models").models;

module.exports = {
  up: async(models, mongoose) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

    */

      const userId = await User.findOne({username:"user1"});
      const finalData = data.map((val) => {
        val.UserId = userId._id;
        return val;
      })
   await models.Organization.insertMany(finalData);
    
  },

  down: async(models, mongoose) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

    */

      await models.Organization.deleteMany({});
  }
};
