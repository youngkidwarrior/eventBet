const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true
  },
  addresses: [
    {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    }
  ],
  nonce: {
    type: String,
    required: true
  },
  createdEvents: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Events'
    }
  ]
});

module.exports = mongoose.model('User', userSchema);
