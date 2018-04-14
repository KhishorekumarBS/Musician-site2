var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var EventsSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    dovenue: {
    	type: Date,
    	required: true
    },
    Venue: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('Events', EventsSchema);