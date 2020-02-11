const uuid = require('uuid/v4');

const HttpError = require('../models/http-error');

const validator = require('express-validator');
const validationResult = validator.validationResult;

let DUMMY_PLACES = [
    {
        id: 'p1',
        title: 'Empire State',
        description: 'Famous building',
        location:{
            lat: 40,
            lng: 31
        },
        address: '20 W 24th St, New York',
        creator: 'u1'
    }
]

const getPlaceById = (req, res, next) => {
    const placeId = req.params.pid;

    // javascript syntax for finding in array, pass in argument and return a boolean if condition
    const place = DUMMY_PLACES.find(placeArgument => {
        return placeArgument.id == placeId;
    });

    if(!place){
        throw new HttpError('Could not find a place for the provided id.');
    }

    // => {place} => { place: place }
    res.json({place});
};

const getUserById = (req, res, next) => {
    const userId = req.params.uid;

    const userPlacesList = [];
    DUMMY_PLACES.forEach(placeArgument => {
        if(placeArgument.creator == userId){
            userPlacesList.push(placeArgument);
        }
    });

    if(!userPlacesList || userPlacesList.length == 0){
        throw new HttpError('Could not find a place for the provided id.');
    }
    res.json({userPlacesList});
};

const createPlace = (req, res, next) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Invalid inputs passed, please check your data', 422);
    }


    // could write this as const title = req.body.title; || const description = req.body.description
    // basically sugared syntax
    const { title, description, coordinates, address, creator } = req.body;
    const createdPlace = {
        id: uuid(),
        title: title,
        description: description,
        location: coordinates,
        address: address,
        creator: creator
    };

    DUMMY_PLACES.push(createdPlace);

    res.status(201).json({place:createdPlace});
    
};


const updatePlaceById = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        throw new HttpError('Fields are not inputted correctly, please fix', 422);
    }


    const { title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = DUMMY_PLACES.find( (place) => place.id == placeId);
    const placeIndex = DUMMY_PLACES.findIndex((place) => place.id = placeId);
    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex].title = updatedPlace.title;
    DUMMY_PLACES[placeIndex].description = updatedPlace.description;

    res.status(200).json({place: updatedPlace});
    
};

const deletePlace = (req, res, next) => {
    const placeId = req.params.pid;

    if(!DUMMY_PLACES.find(p => p.id === placeId)){
        throw new HttpError('Could not find place to delete', 404);
    }
    DUMMY_PLACES = DUMMY_PLACES.filter(p => console.log(p.id !== placeId));

    res.status(200).json({message: 'Deleted Place'});

};


exports.getPlaceById = getPlaceById;
exports.getUserById = getUserById;
exports.createPlace = createPlace;
exports.updatePlaceById = updatePlaceById;
exports.deletePlace = deletePlace;