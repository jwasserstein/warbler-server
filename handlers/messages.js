const db = require('../models');

module.exports.createMessage = async function(req, res, next) {
	try {
		let message = await db.Message.create({
			text: req.body.text,
			user: req.params.id
		});
		let user = await db.User.findById(req.params.id);
		user.messages.push(message._id);
		await user.save();
		message = await db.Message.findById(message._id).populate('user', {username: true, profileImageUrl: true});
		return res.status(200).json(message);
	} catch(err) {
		return next(err);
	}
};

module.exports.getMessage = async function(req, res, next) {
	try {
		const message = await db.Message.findById(req.params.message_id);
		return res.status(200).json(message);
	} catch (err) {
		return next(err);
	}
};

module.exports.deleteMessage = async function(req, res, next) {
	try {
		let deletedMessage = await db.Message.findById(req.params.message_id);
		if(!deletedMessage){
			return next({
				status: 404,
				message: "That message doesn't exist"
			});
		}
		deletedMessage.remove();
		return res.status(200).json(deletedMessage);
	} catch(err) {
		console.log(err);
		return next(err);
	}
};