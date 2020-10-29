const mongoose = require('mongoose');
const bcrypt   = require('bcrypt');

userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	profileImageUrl: {
		type: String
	},
	messages: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'message'
	}]
});

userSchema.pre('save', async function(next){
	try {
		if(!this.isModified('password')){
			return next();
		}
		const hashedPassword = await bcrypt.hash(this.password, 10);
		this.password = hashedPassword;
		next();
	} catch(err){
		return next(err);
	}
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
	try {
		const isMatch = await bcrypt.compare(candidatePassword, this.password);
		return isMatch;
	} catch(err) {
		return next(err);
	}
}

module.exports = mongoose.model('user', userSchema);