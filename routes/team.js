const express = require('express')
const router = express.Router()
const {
    createTeam,
    findAllTeams,
    findOneTeam
    } = require('../controllers/team')

router.route('/').get(findAllTeams).post(createTeam)
router.route('/:id').get(findOneTeam)

module.exports = router