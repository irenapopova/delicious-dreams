const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');

const { catchErrors } = require('../handlers/errorHandlers');

router.get('/', storeController.getStores);
router.get('/stores', storeController.getStores);
router.get('/add', storeController.getStore);
router.post('/add', catchErrors(storeController.createStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore))

/* router.get('/', storeController.middleWare, storeController.homePage); */

module.exports = router; // my routes files exports my router which will handle the individual forward slash routes that are needed, 

// all is sequencial 
// Modals are where the Data is going to be stored , and before I can  actually create a piece of data, I am going to be able to create stores. Before i CAN CREATE A PIECE OF DATA i need to  describe what that data will look like. The simplest way I can put it in ahead of time.
// i am doing everything in strict mode so I have to define my schema beforehand. 