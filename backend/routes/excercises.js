const router = require('express').Router();
const Excercise = require('../models/excercise.model.js');

router.route('/').get((req,res) => {
    Excercise.find()
    .then(excercises => res.json(excercises))
    .catch(err => res.status(400).json('Error: '+err));
});

router.route('/add').post((req,res) =>{
    const username = req.body.username;
    const description = req.body.description;
    const duration = req.body.duration;
    const date = req.body.date;

    const newExcercise = new Excercise({
        username,
        description,
        duration,
        date,
    });

    newExcercise.save()
    .then(()=> res.json('Excercise Added!'))
    .catch(err => res.status(400).json('Error: '+err));
});


router.route('/:id').get((req,res) => {     //just returns the information of that id
    Excercise.findById(req.params.id)
    .then( excercise => res.json(excercise))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/:id').delete((req,res) => {
    Excercise.findByIdAndDelete(req.params.id)
    .then( () => res.json('Exercise deleted'))
    .catch(err => res.status(400).json('Error: ' +err));
});

router.route('/update/:id').post((req,res) => {
    Excercise.findById(req.params.id)
    .then( excercise => {
    excercise.username = req.body.username;
    excercise.description = req.body.description;
    excercise.duration = Number(req.body.duration);
    excercise.date = Date.parse(req.body.date);

    excercise.save()
    .then(() => res.json('Exercise updated!'))
    .catch(err => res.status(400).json('Error: ' +err));
    })
    .catch(err => res.status(400).json('Error: ' +err));
});

module.exports = router;