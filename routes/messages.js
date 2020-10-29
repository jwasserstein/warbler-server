const express = require('express'),
	  router  = express.Router({mergeParams: true}),
	  { createMessage, getMessage, deleteMessage } = require('../handlers/messages');

router.post('/', createMessage);
router.get('/:message_id', getMessage);
router.delete('/:message_id', deleteMessage);

module.exports = router;