const express = require('express');

const placesController = require('../controllers/places-controller');

const router = express.Router();

const validator = require('express-validator');
const check = validator.check;

// the /: makes it so any route accessed here is able to access this middlware
router.get('/:pid', placesController.getPlaceById);

router.get('/user/:uid', placesController.getUserById);

router.post('/', 
    [
        check('title').not().isEmpty(),
        check('description').isLength( {min: 5} ),
        check('address').not().isEmpty()
    ], 
    placesController.createPlace);

router.patch('/:pid',
    [
        check('title').not().isEmpty(),
        check('description').isLength( {min: 5} )
    ], 
    placesController.updatePlaceById);

router.delete('/:pid', placesController.deletePlace);


module.exports = router;