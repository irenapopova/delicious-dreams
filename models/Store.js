const mongoose = require('mongoose');
// telling mongoose that the Promise to use is the global (using the built-in ES6 Promise)
mongoose.Promise = global.Promise;
const slug = require('slug');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'

  },
  //using slug library 
  slug: String,
  description: {
    type: String,
    type: true
  },
  tags: [String]
});
module.exports = mongoose.model('Store', storeSchema);