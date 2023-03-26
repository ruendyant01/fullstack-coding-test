'use strict';
const {encPass} = require('../helpers/bcrypjt');
module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"]
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique:[true, "Username already exist"],
      validate: {
        validator: (val) => {
          const user = User.findOne({username:val.username});
          if(user) return;
        },
        message: () => "Username already exist"
      }
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: 6
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });

  newSchema.pre("save", function(next) {
    const passw = encPass(this.password);
    this.password = passw;
    next()
  })

  const User = mongoose.model('User', newSchema);

  return User;
};