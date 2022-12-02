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
    playerLogout, sendInvitationToAnotherPlayer, acceptInvitation, declineInvitation
} = require('../controllers/player')

router.route('/:id').get(auth, getPlayer).patch(auth, updatePlayer).delete(auth, deletePLayer)
router.route('/').get(auth, getAllPlayers).post(createPlayer)
router.route('/login').post(loginPlayer)
router.route('/logout').post(auth, playerLogout)
router.route('/invite/:id').post(auth, sendInvitationToAnotherPlayer)
router.route('/accept/:id').post(auth, acceptInvitation)
router.route('/decline/:id').post(auth, declineInvitation)

module.exports = router