
var mongoose = require('mongoose');
//schema
var mohadaratiSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    prof: {
        type: String,
        required: true
    },
    cat: {
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    picture: {
        type: String,
        required: true
    },
    lien: {
        type: String,
        required: true
    },
    admis: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
// Export Mohadarati Model
var Mohadarati = module.exports = mongoose.model('mohadarati', mohadaratiSchema);
module.exports.get = function (callback, limit) {
   Mohadarati.find(callback).limit(limit); 
}