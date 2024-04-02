var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// router.get("/", (req, res, next) => {
//   User.find()
//   .then((foundUsers) => {
//     console.log("Found User ===>", foundUsers);
//     res.json(foundUsers)
//   })
//   .catch((err) => {
//     console.log(err);
//     res.json(err)
//   });
// });

module.exports = router;
