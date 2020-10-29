const express = require('express'),
	  router  = express.Router(),
	  { signin, signup } = require('../handlers/auth');

router.post('/signin', signin);
router.post('/signup', signup);

module.exports = router;