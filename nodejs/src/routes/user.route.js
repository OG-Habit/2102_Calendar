const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// router
//     .route("/:id")
//     .get((req, res) => {})
//     .post((req, res) => {})
//     .put((req, res) => {})

// router.param("id", (req, res, next, id) => {
//     console.log(id);
//     next();
// })

router.post('/signup', userController.create);
router.get('/login/:email-:password', userController.findUser);

module.exports = router;