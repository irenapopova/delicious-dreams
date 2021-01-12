
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