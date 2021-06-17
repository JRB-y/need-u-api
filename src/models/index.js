const User = require('./User')
const Activity = require('./Activity')
const Role = require('./Role')

/**
 * Associations
 */

// User hasMany Activities
User.belongsToMany(Activity, { through: 'UserActivities', as: 'activities' })
Activity.belongsToMany(User, { through: 'UserActivities' })

module.exports = {
  User,
  Activity,
  Role
}
