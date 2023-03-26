'use strict';

const data = require("../data/userData");
const { encPass } = require("../helpers/bcrypjt");

module.exports = {
  up: async(models, mongoose) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

    */

      const finalData = data.map(val => {
        const passw = encPass(val.password)
        val.password = passw;
        return val;
      })

      await models.User.insertMany(finalData);
  },

  down: async(models, mongoose) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

    */

      await models.User.deleteMany({});
  }
};
