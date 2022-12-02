const express = require('express')
const router = express.Router()
const auth = require('../middlewares/auth')
const {
    createTeam,
    findAllTeams,
    findOneTeam
    } = require('../controllers/team')

router.route('/').get(auth, findAllTeams).post(auth, createTeam)
router.route('/:id').get(auth, findOneTeam)

module.exports = router