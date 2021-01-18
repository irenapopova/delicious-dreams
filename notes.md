
storeController.js
```js
exports.createStore = (req, res) => {
  const store = new Store(req.body);
  store
    .save();
  .then(store => {
      return Store.find()
    })
    // chaining 
    .then(stores => {
      return Promise;
    })
    .then(stores => {
      res.render('storeList', { stores: stores })
    })
    .then(stores => {
      res.render('storeList', { stores: stores })
    })
    .then(stores => {
      res.render('storeList', { stores: stores })
    })
    .catch(er => {
      throw Error(err);
    })

  console.log('It worked!');
};

```

#### in routes/index.js

```js
/* router.get('/', (req, res) => {
  const irena = {
    name: 'irena',
    age: '35',
    cool: true
  };
  // console.log("Hey!!!")
  // res.send("Hey! It works");
  res.json(req, query);
}); */

/* router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
}) */
```


storeController.js
```js
// req -is the data that comes in (user signs in with <form>  and POSTs to /login)
// res is the data that comes out and in between the req & res a bunch of work must happen
/* export.myMiddleware = (req, res, next) => {
  req.name = 'irena';

  next(); // 
}; */
```
store.js
```js
/* storeSchema.pre('save', function (next {
  if(!this.isModified('name')){
  next(); // skip it 
    return; // stop this function from running
}
  this.slug = slug(this.name);
next();

// TODO make more resiliant so slugs are unique
 });*/
```

// all is sequencial 
// Modals are where the Data is going to be stored , and before I can  actually create a piece of data, I am going to be able to create stores. Before i CAN CREATE A PIECE OF DATA i need to  describe what that data will look like. The simplest way I can put it in ahead of time.
// i am doing everything in strict mode so I have to define my schema beforehand. 