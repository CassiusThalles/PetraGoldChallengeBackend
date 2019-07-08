/********************************************************************************
 *************************** weapon.js file (services/knights) ***********************
 ********************************************************************************/

const express = require('express');
const Weapon = require('../../models/weapon');

//Handle request from [GET]/weapons
const getWeapons = async (req, res, next) => {
    try {
        let weapons = await Weapon.find({});
        if (weapons.length > 0) {
            return res.status(200).json({
                'message': 'weapons fetched successfully',
                'data': weapons
            });
        }
        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No weapons found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, please try again later'
        });
    }
}

//Handle request from [GET]/weapons/:id
const getWeaponById = async (req, res, next) => {
    try {
        let weapon = await Weapon.findById(req.params.id);
        if (weapon) {
            return res.status(200).json({
                'message': 'weapons fetched successfully',
                'data': weapon
            });
        }
        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No weapons found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, please try again later'
        });
    }
}

//Handle request from [POST]/weapons
const createWeapon = async (req, res, next) => {
    try {
        const {
            name,
            mod,
            attr
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (mod === undefined) {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'mod is required',
                'field': 'mod'
            });
        }

        if (attr === undefined || attr === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'attr is required',
                'field': 'attr'
            });
        }

        let isNameExists = await Weapon.findOne({
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
            mod,
            attr
        }

        let newWeapon = await Weapon.create(temp);

        if (newWeapon) {
            return res.status(201).json({
                'message':' weapon created successfully',
                'data': newWeapon
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

//Handle request from [UPDATE]/weapons
const updateWeapon = async (req, res, next) => {
    try {
        const weaponId = req.params.id;
        const {
            name,
            mod,
            attr
        } = req.body;

        if (name === undefined || name === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'name is required',
                'field': 'name'
            });
        }

        if (mod === undefined || mod === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'mod is required',
                'field': 'mod'
            });
        }

        if (attr === undefined || attr === '') {
            return res.status(422).json({
                'code': 'REQUIRED_FIELD_MISSING',
                'description': 'attr is required',
                'field': 'attr'
            });
        }

        let isWeaponExists = await Weapon.findById(weaponId);

        if (!isWeaponExists) {
            return res.status(404).json({
                'code': 'BAD_REQUEST_ERROR',
                'description': 'No weapon found in the system'
            });
        }

        const temp = {
            name,
            mod,
            attr
        }

        let updateWeapon = await Weapon.findByIdAndUpdate(weaponId, temp, {
            new: true
        });

        if (updateWeapon) {
            return res.status(200).json({
                'message':' weapon updated successfully',
                'data': updateWeapon
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

//Handle request from [DELETE]/weapons
const deleteWeapon = async (req, res, next) => {
    try {
        let weapon = await Weapon.findByIdAndRemove(req.params.id);
        if (weapon) {
            return res.status(204).json({
                'message': `weapon with id ${req.params.id} deleted successfully`
            });
        }

        return res.status(404).json({
            'code': 'BAD_REQUEST_ERROR',
            'description': 'No weapons found in the system'
        });
    } catch (error) {
        return res.status(500).json({
            'code': 'SERVER_ERROR',
            'description': 'something went wrong, please try again later'
        });
    }
}

module.exports = {
    getWeapons: getWeapons,
    getWeaponById: getWeaponById,
    createWeapon: createWeapon,
    updateWeapon: updateWeapon,
    deleteWeapon: deleteWeapon
}