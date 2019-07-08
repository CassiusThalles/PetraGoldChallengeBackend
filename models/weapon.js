let mongoose = require('mongoose');
let Schema = mongoose.Schema;

var Weapon = new Schema({
    "name": {
        type: String,
        unique: true,
        required: true
    },
    "mod": {
        type: Number,
        required: true
    },
    "attr": {
        type: String,
        required: true,
        enum: ["strength", "dexterity", "constitution", "intelligence", "wisdom", "charisma"]
    }
});

module.exports = mongoose.model('Weapon', Weapon);