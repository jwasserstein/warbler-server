const mongoose = require('mongoose');
const User     = require('./user');

messageSchema = new mongoose.Schema({
	text: {
		type: String,
		required: true,
		maxLength: 160
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'user'
	} 
}, {timestamps: true});

messageSchema.pre('remove', async function(next){
	try {
		let user = await User.findById(this.user);
		user.messages = user.messages.filter(m => m != this.id);
		await user.save();
		return next();
	} catch(err) {
		next(err);
	}
});

module.exports = mongoose.model('message', messageSchema);