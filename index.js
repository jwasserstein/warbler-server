require('dotenv').config();
const express        = require('express'),
	  app            = express(),
	  bodyParser     = require('body-parser'),
	  cors           = require('cors'),
	  authRoutes     = require('./routes/auth'),
	  messagesRoutes = require('./routes/messages'),
	  errorHandler   = require('./handlers/error');

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/users/:id/messages', messagesRoutes);

app.use((req, res, next) => {
	const err = new Error('Route not found');
	err.status = 404;
	next(err);
});

app.use(errorHandler);

app.listen(3000, () => console.log('Listening on port 3000'));