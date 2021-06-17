const jwt = require("jsonwebtoken")

const SECRET = 'NEEDU'

module.exports = function (req, res, next) {
  const token = req.header("Authorization")
  if (!token) return res.status(401).json({ message: "Unauthorized route" })

  try {
    const decoded = jwt.verify(token, SECRET)
    req.user = decoded.user
    next();
  } catch (e) {
    console.error(e);
    res.status(401).send({ message: "Invalid Token" })
  }
}