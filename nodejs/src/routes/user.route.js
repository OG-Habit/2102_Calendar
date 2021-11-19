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

router.get('/', (req, res) => {
    console.log("In accsetup :");
    console.log(req.session);
    if(req.session.userId) {
        res.send({
            loggedIn: true, 
            user: req.session.userId
        });
    } else {
        res.send({loggedIn: false});
    }
})

router.get('/login/:email-:password', userController.findUser);
router.post('/signup', userController.create);

module.exports = router;