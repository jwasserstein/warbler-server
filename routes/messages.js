const express = require('express'),
	  router  = express.Router({mergeParams: true}),
	  { createMessage, getMessage, deleteMessage } = require('../handlers/messages');

router.post('/', createMessage);
router.get('/:messageId', getMessage);
router.delete('/:messageId', deleteMessage);

module.exports = router;