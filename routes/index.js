const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { catchErrors } = require('../handlers/errorHandlers');

/* router.get('/', storeController.getStores);
router.get('/stores', storeController.getStores);
router.get('/add', storeController.getStore);
router.post('/add', catchErrors(storeController.createStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.post('/add/:id', catchErrors(storeController.updateStore));
router.get('/stores/:id/edit', catchErrors(storeController.editStore)); */

router.get('/', storeController.middleWare, storeController.homePage);

module.exports = router; // my routes files exports my router which will handle the individual forward slash routes that are needed, 

