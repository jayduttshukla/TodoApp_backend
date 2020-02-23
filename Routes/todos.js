const {Todo, validate} = require('../models/todos');
const auth = require('../middlewares/auth');
const express = require('express');
const router = express.Router();

router.get('/:id', auth, async (req,res) => {
    const todos = await Todo.find({user_id : req.params.id});
    res.status(200).send(todos);
});

router.post('/', auth, async (req,res) => {
    const {error} = validate(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
    let todo = new Todo({
        todoValue : req.body.todoValue,
        isDone : req.body.isDone,
        user_id : req.body.user_id
    });
    todo = await todo.save();
    res.send(todo);
});

router.delete('/:id', auth, async (req, res) => {
    let todo = await Todo.findByIdAndRemove(req.params.id);
    if(!todo) return res.status(404).send('Todo Not found')
    res.send(todo);
});

router.put('/:id', auth, async (req, res) => {
    const result = await Todo.findOneAndUpdate(
        { _id:req.params.id },
        { $set: { isDone: req.body.isDone }},
        { new: true });
    if(!result) return;
    res.send(result)
});

module.exports = router; 