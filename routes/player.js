const express = require('express')
const router = express.Router()
const {getPlayer, createPlayer} = require('../controllers/player')

router.route('/:id').get(getPlayer)
router.route('/').post(createPlayer)

module.exports = router