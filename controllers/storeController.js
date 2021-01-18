const mongoose = require('mongoose');
/* const { request } = require('../app'); */
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  console.log(req.name);
  req.flash('error', 'Something happened');
  req.flash('info', 'Something happened');
  req.flash('warning', 'Something happened');
  res.render('index');
};

exports.addStore = (req, res) => {
  res.render('editStore', { title: ' 😧 Add Store' });
};
//middleWare allows to run code after the request but before response

exports.createStore = async (req, res) => {
  const store = await (new Store(req.body)).save();
  req.flash('success', `Successfully created ${store.name}. Care to leave a Review ?`);

  res.redirect(`/store/${store.slug}`);

};

exports.getStores = async (req, res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find();
  /* console.log(stores); */
  res.render('stores', { title: 'Stores', stores });
};

exports.editStore = async (req, res) => {
  //1. Find the store given the id
  const store = await Store.findOne({ _id: req.params.id });
  //confirm they are the owner of the store 
  //TODO 
  //3. Render out the edit form so the user can update their store 
  res.render('editStore', { title: `Edit ${store.name}`, store });
};

exports.updateStore = async (req, res) => {
  // find and update store 
  const store = Store.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true,
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${store.name}</strong>. <a href="/store/${stores.slug}">View Store </a>`);
};