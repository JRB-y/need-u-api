const router = require('express').Router()
const { User, Role, Activity } = require('../../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const SECRET = 'NEEDU'

// register (inscription)
router.post('/register', async (req, res) => {
  const { firstname, lastname, age, email, password, gender, city, zip, presentation, price_hour, activities, password_confirmation, role_id, addr } = req.body

  console.log('activities', activities)
  if (!firstname || !lastname || !age || !email || !password || !gender || !city || !zip || !presentation || !addr) {
    return res.status(400).json({ success: false, reason: 'Données manquantes!' })
  }

  if (password !== password_confirmation) {
    return res.status(400).json({ success: false, reason: 'Le mot de passe doit être confirmé!' })
  }

  const salt = await bcrypt.genSalt(10);
  const passwordHashed = await bcrypt.hash(password.toString(), salt)

  let user
  try {
    user = await User.create({
      firstname,
      lastname,
      age,
      email,
      gender,
      city,
      zip,
      presentation,
      price_hour,
      password: passwordHashed,
      role_id,
      addr
    })

    for (const activity of activities) {
      user.setActivities(activity)
    }

  } catch (error) {
    return res.status(400).json({ succes: false, reason: [...error.errors.map(x => x.message)] })
  }

  // TODO: ADD activities relation !!!!!!
  return res.json({ succes: true, data: user })
})

// login
router.post('/login', async (req, res) => {
  const  { email, password } = req.body

  if (!email) {
    return res.status(401).json({
      success: false,
      reason: `L'email est obligatoire!`
    })
  }

  if (!password) {
    return res.status(401).json({
      success: false,
      reason: `Le mot de passe est obligatoire!`
    })
  }

  let user = await User.findOne({
    where: { email },
    include: 'activities',
  })

  if (!user) {
    return res.status(401).json({
      success: false,
      reason: `L'utilisateur n'existe pas!`
    })
  }



  const isMatch = await bcrypt.compare(password.toString(), user.password)
  if(!isMatch) {
    return res.status(401).json({
      success: false,
      reason: 'Le mot de passe est incorrecte!'
    })
  }

  const role = await Role.findOne({
    attributes: ['name', 'id'],
    where: {
      id: user.role_id
    }
  })

  const payload = {
    user: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      gender: user.gender,
      age: user.age,
      presentation: user.presentation,
      activities: user.activities,
      role: role.toJSON(),
    }
  }

  jwt.sign(payload, SECRET, { expiresIn: '7d' }, (err, token) => {
    console.log('### TOKEN ###')
    console.log(token)

    if (err) throw err

    res.status(200).json({
      success: true,
      token,
      user: payload.user
    })
  })
})

router.get('/me', async (req, res) => {
  const user = await User.findOne({
    where: { id: req.body.id },
    include: 'activities',
  })
  const role = await Role.findOne({
    attributes: ['name', 'id'],
    where: {
      id: user.role_id
    }
  })
  const payload = {
    user: {
      id: user.id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      gender: user.gender,
      age: user.age,
      addr: user.addr,
      presentation: user.presentation,
      activities: user.activities,
      role: role.toJSON(),
    }
  }

  return res.status(200).json({ succes: true, data: payload })
})

module.exports = router