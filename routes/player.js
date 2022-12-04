const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    getPlayer,
    createPlayer,
    deletePLayer,
    getAllPlayers,
    updatePlayer,
    loginPlayer,
    playerLogout,
    sendInvitationToPlayer, getProfile,
} = require('../controllers/player')

router.route('/:id').get(auth, getPlayer).patch(auth, updatePlayer).delete(auth, deletePLayer)
router.route('/profile/:id').get(auth, getProfile)
router.route('/').get(auth, getAllPlayers).post(createPlayer)
router.route('/login').post(loginPlayer)
router.route('/logout').post(auth, playerLogout)
router.route('/invite/:id').post(auth, sendInvitationToPlayer)

module.exports = router