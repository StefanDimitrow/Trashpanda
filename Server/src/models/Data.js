const { Schema, model, Types } = require("mongoose");
const {User} = require('../models/User')
//TODO: Add/change properties according to the exam;

const dataSchema = new Schema({
  prop: {
    type: String,
    required: true,
  },
  author: {
    type: Types.ObjectId,
    ref: User,
  },
});

const Data = model("Data", dataSchema);

module.exports = { Data };

//TODO: replace with data model from exam;
