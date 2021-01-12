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
    trim: true
  },
  tags: [String]
});

storeSchema.pre('save', function (next {
  if(!this.isModified('name')){
  next(); // skip it
    return; // stop this function from running
}
  this.slug = slug(this.name);
next();

// TODO make more resiliant so slugs are unique
});


module.exports = mongoose.model('Store', storeSchema);