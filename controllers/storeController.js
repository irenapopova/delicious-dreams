// req -is the data that comes in (user signs in with <form>  and POSTs to /login)
// res is the data that comes out and in between the req & res a bunch of work must happen
/* export.myMiddleware = (req, res, next) => {
  req.name = 'irena';

  next(); // 
}; */
const mongoose = require('mongoose');
const { request } = require('../app');
const Store = mongoose.model('Store');

exports.homePage = (req, res) => {
  console.log(req.name);
  req.flash('error', 'Something happened');
  req.flash('info', 'Something happaned');
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

  res.redirect(`/`store / ${ store.slug }`);

}; 

exports.getStore = async (req,res) => {
  // 1. Query the database for a list of all stores
  const stores = await Store.find();
  console.log(stores);
  res.render('stores', {title: 'Stores', stores});
};