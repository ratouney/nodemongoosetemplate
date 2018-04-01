var mongoose = require('mongoose');

var accountSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please add a username']
    },
    battletag: {
        type: Number,
        min: 0,
        required: [true, 'Please add a battletag']
    },
    region: {
        type: String,
        enum: ['eu', 'na', 'kr'],
        required: [true, 'Please format to the correct regions [eu || na || kr]']
    },
    platform: {
        type: String,
        enum: ['pc', 'xbox', 'ps4'],
        required: [true, 'Please format to the platform codes [pc || xbox || ps4]']
    },
    ign: {
        type: String,
        unique: true,
    }
})

accountSchema.pre('save', function(next) {
    this.ign = this.username + "#" + this.battletag;
    next();
})

var Account = mongoose.model('Account', accountSchema);

module.exports = Account;