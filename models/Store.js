const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slug');

const storeSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a store name!'

  },

  slug: String,
  description: {
    type: String,
    type: true
  },
  tags: [String]
});
module.exports = mongoose.model('store', storeSchema);