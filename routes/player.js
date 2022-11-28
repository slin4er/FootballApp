const express = require('express')
const router = express.Router()
const {
    getPlayer,
    createPlayer,
    deletePLayer,
    getAllPlayers,
    updatePlayer} = require('../controllers/player')

router.route('/:id').get(getPlayer).patch(updatePlayer).delete(deletePLayer)
router.route('/').get(getAllPlayers).post(createPlayer)

module.exports = router