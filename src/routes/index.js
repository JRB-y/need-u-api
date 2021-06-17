const router = require('express').Router()
const authRouter = require('./auth')
const activitiesRouter = require('./activities')

router.use('/auth', authRouter)
router.use('/activity', activitiesRouter)

module.exports = router