/*********************************************************************
******************* knight.js file (models) ****************************
*********************************************************************/

let Weapon = require('./weapon');
let mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
let Schema = mongoose.Schema;


var Knight = new Schema({
    "name": {
        type: String,
        required: [ true, 'name is required' ],
        maxlength: 100
    },
    "nickname": {
        type: String,
        maxlength: 100,
        default: ''
    },
    "birthday": {
        type: DateOnly,
        required: [ true, 'birthday is required' ],
        max: Date.now
    },
    "weapons": [Weapon.schema],
    "equippedWeapons": [Weapon.schema],
    "attributes": {
        "strength":{type: Number, default: 0},
        "dexterity":{type: Number, default: 0},
        "constitution":{type: Number, default: 0},
        "intelligence":{type: Number, default: 0},
        "wisdom":{type: Number, default: 0},
        "charisma":{type: Number, default: 0}
    },
    "keyAttribute": {
        type: String,
        required: [ true, 'keyAttribute is required' ],
        enum: ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]
    },
    "hero": {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Knight', Knight);