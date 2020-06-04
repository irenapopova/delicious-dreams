const express = require('express');
const router = express.Router();

// Do some more work here
router.get('/', (req, res) => {
  const irena = {
    name: 'irena',
    age: '35',
    cool: true
  };
  // console.log("Hey!!!")
  // res.send("Hey! It works");
  res.json(req, query);
});

router.get('/reverse/:name', (req, res) => {
  const reverse = [...req.params.name].reverse().join('');
  res.send(reverse);
})

module.export = router;