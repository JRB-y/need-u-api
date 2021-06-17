const router = require('express').Router()
const User = require('../../models/User')
const Activity = require('../../models/Activity')

// register (inscription)
router.get('/', async (req, res) => {
  const activities = await Activity.findAll()
  res.status(200).json({ success: true, data: activities })
})


module.exports = router