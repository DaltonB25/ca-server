const Product = require('../models/Product')

const isAdmin = (req, res, next) => {
    if(req.user.type !== "Admin") {
        return res.status(401).json({
            msg: "Unauthorized"
        })     
    }
    next()
}

module.exports = isAdmin

// const isAdmin = (req, res, next) => {
//     auth(req, res, () => {
//       if(req.user.isAdmin){
//         next()
//       } else{
//         res.status(403).json({ message: "Acess denied. Not authorized" })
//       }
//     })
//   }