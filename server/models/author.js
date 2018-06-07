const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const authorSchema = new Schema({
<<<<<<< HEAD
	firstName: String,
=======
	fullName: String,
>>>>>>> c9abd8d57b8ed05785989a5e24f77be8078f100d
	age: Number,
});

module.exports = mongoose.model('Author', authorSchema); 