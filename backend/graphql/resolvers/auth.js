const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');
var ethUtil = require('ethereumjs-util');

module.exports = {
  verify: async ({ address, signature }) => {
    try {
      const user = await User.findOne({ addresses: address });
      const msg = `I am signing my one-time nonce: ${user.nonce}`;
      const msgBuffer = ethUtil.toBuffer(msg);
      const msgHash = ethUtil.hashPersonalMessage(msgBuffer);
      const signatureBuffer = ethUtil.toBuffer(signature);
      const signatureParams = ethUtil.fromRpcSig(signatureBuffer);
      const publicKey = ethUtil.ecrecover(
        msgHash,
        signatureParams.v,
        signatureParams.r,
        signatureParams.s
      );
      const addressBuffer = ethUtil.publicToAddress(publicKey);
      const hexAddress = ethUtil.bufferToHex(addressBuffer);
      if (hexAddress.toLowerCase() === address.toLowerCase()) {
        const token = jwt.sign(
          {
            userId: user.id,
            email: user.email,
            address: user.address,
            nonce: user.nonce
          },
          'somesupersecretkey',
          { expiresIn: '1h' }
        );
        user.nonce = await bcrypt.hash(user.nonce, 12);
        const result = await user.save();
        return {
          userId: result.id,
          nonce: result.nonce,
          token: token,
          tokenExpiration: 1
        };
      }
    } catch (err) {
      throw err;
    }
  },
  //object destructuring arguments
  login: async ({ address }) => {
    const user = await User.findOne({
      addresses: address
    });
    if (!user) {
      throw new Error('User does not exist');
    }

    const isEqual = user.addresses.includes(address);
    if (!isEqual) {
      throw new Error(`${address}: Address is not registered`);
    }
    return { ...user._doc, _id: user.id };
  },
  createUser: async args => {
    try {
      const existingAddress = await User.findOne({
        addresses: args.userInput.address
      });
      if (existingAddress) {
        console.log(existingAddress)
        throw new Error('User already exists.');
      }
      const existingUser = await User.findOne({
        email: args.userInput.email
      });
      if (existingUser) {
        existingUser.addresses.push(args.userInput.address);
        const result = await existingUser.save();
        return {
          ...result._doc,
          username: result._doc.username,
          addresses: result._doc.addresses,
          nonce: result._doc.nonce,
          _id: result.id
        };
      }
      const nonce = await bcrypt.hash(args.userInput.address, 12);
      const user = new User({
        username: args.userInput.username,
        email: args.userInput.email,
        addresses: args.userInput.address,
        nonce: nonce
      });
      const result = await user.save();
      console.log(user);
      return {
        ...result._doc,
        username: result._doc.username,
        addresses: result._doc.addresses,
        nonce: result._doc.nonce,
        _id: result.id
      };
    } catch (err) {
      throw err;
    }
  }
};
