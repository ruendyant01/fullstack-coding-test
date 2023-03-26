'use strict';

const { Schema } = require("mongoose");

module.exports = mongoose => {
  const newSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Organization name is required"]
    },
    UserId: {
      type: Schema.Types.ObjectId,
      required:[true, "User Id is required"],
      ref:"User"
    },
    structure: {
      type: Object,
      required: [true, "Structure is required"]
    }
  }, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  });
  const Organization = mongoose.model('Organization', newSchema);
  return Organization;
};