/********************************************************************************
*************************** knight.js file (services/knights) ***********************
********************************************************************************/

const express = require('express');
const Knight = require('../../models/knight');

//Handle request from [GET]/knights(?filter=heroes)
const getKnights = async (req, res, next) => {
    try {
        let knights = await Knight.find({});
        if (knights.length > 0) {
            return res.status(200).json({
                'message': 'knights fetched successfully',
                'data': knights
            });
        }
        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No knights found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, please try again later'
        });
    }
}

//Handle request from [GET]/knights/:id
const getKnightById = async (req, res, next) => {
    try {
        let knight = await Knight.findById(req.params.id);
        if (knight) {
            return res.status(200).json({
                'message': `knight with if ${req.params.id} fetched successfully`,
                'data': knight
            });
        }
        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No knight found in the system with the required id'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, please try again later'
        });
    }
}

//Handle request from [POST]/knights
const createKnight = async (req, res, next) => {
    try {
        const {
            name,
            nickname,
            birthday,
            weapons,
            equippedWeapons,
            attributes,
            keyAttribute,
            hero
        } = req.body;
        
        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }
        
        if (birthday === undefined || birthday === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'birthday is required',
                'field': 'birthday'
            });
        }
        
        if (keyAttribute === undefined || keyAttribute === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'keyAttribute is required',
                'field': 'keyAttribute'
            });
        }

        let isNameExists = await Knight.findOne({
            "name": name
        });

        if (isNameExists) {
            return res.status(409).json({
                'code': 'ENTITY_ALREADY_EXISTS',
                'description': 'an entity with this name already exists',
                'field': 'name'
            });
        }

        const temp = {
            name,
            nickname,
            birthday,
            weapons,
            equippedWeapons,
            attributes,
            keyAttribute,
            hero
        }

        let newKnight = await Knight.create(temp);

        if (newKnight) {
            return res.status(201).json({
                'message':' knight created successfully',
                'data': newKnight
            });
        } else {
            throw new Error('something went wrong');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, please try again later'
        });
    }
}

//Handle request from [UPDATE]/knights(?filter=heroes)
const updateKnight = async (req, res, next) => {
    try {
        const knightId = req.params.id;
        const {
            name,
            nickname,
            birthday,
            weapons,
            equippedWeapons,
            attributes,
            keyAttribute,
            hero
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (birthday === undefined || birthday === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'birthday is required',
                'field': 'birthday'
            });
        }

        if (keyAttribute === undefined || keyAttribute === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'keyAttribute is required',
                'field': 'keyAttribute'
            });
        }

        let isKnightExists = await Knight.findById(knightId);
        
        if (!isKnightExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No knight found in the system'
            });
        }

        const temp = {
            name,
            nickname,
            birthday,
            weapons,
            equippedWeapons,
            attributes,
            keyAttribute
        }

        let updateKnight = await Knight.findByIdAndUpdate(knightId, temp, {
            new: true
        });

        if (updateKnight) {
            return res.status(200).json({
                'message':' knight updated successfully',
                'data': updateKnight
            });
        } else {
            throw new Error('something went wrong');
        }
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, please try again later'
        });
    }
}

//Handle request from [DELETE]/knights(?filter=heroes)
const deleteKnight = async (req, res, next) => {
    try {
        let knight = await Knight.findByIdAndRemove(req.params.id);
        if (knight) {
            return res.status(204).json({
                'message': `knight with id ${req.params.id} deleted successfully`
            });
        }
        
        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No knights found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, please try again later'
        });
    }
}

module.exports = {
    getKnights: getKnights,
    getKnightById: getKnightById,
    createKnight: createKnight,
    updateKnight: updateKnight,
    deleteKnight: deleteKnight
}