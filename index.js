require('dotenv').config();
const express                              = require('express'),
	  app                                  = express(),
	  bodyParser                           = require('body-parser'),
	  cors                                 = require('cors'),
	  authRoutes                           = require('./routes/auth'),
	  messagesRoutes                       = require('./routes/messages'),
	  errorHandler                         = require('./handlers/error'),
	  { loginRequired, ensureCorrectUser } = require('./middleware/auth'),
	  db                                   = require('./models');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', loginRequired, ensureCorrectUser, messagesRoutes);
app.use('/api/messages', loginRequired, async function(req, res, next){
	const messages = await db.Message.find()
		.sort({createdAt: 'desc'})
		.populate('user', {
			username: true, 
			profileImageUrl: true
		});
	return res.status(200).json(messages);
});

app.use((req, res, next) => {
	const err = new Error('Route not found');
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(3000, () => console.log('Listening on port 3000'));