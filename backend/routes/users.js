const router = require('express').Router();
let User = require('../models/user.model.js');

router.route('/').get((req,res)=> {
    User.find()     //.find() is a mongoose method that will give all the list of users from the mongodb atlas database.  the find method returns a promise and the results are retuned json format 
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req,res) => {
    console.log(req.body);
    const username = req.body.username;     //jab post request dalte time jo username body main dala usko store kiya variable main
    const newUser = new User({username});       // creating a newUser of that username

    newUser.save()
    .then(() => res.json('User added !'))
    .catch(err => res.status(400).json('Error: '+err));
})

module.exports = router;