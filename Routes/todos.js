const {Todo, validate} = require('../Models/todos');
const express = require('express');
const router = express.Router();

router.get('/', async (req,res) => {
    const todos = await Todo.find();
    res.status(200).send(todos);
});

router.post('/', async (req,res) => {
    const {error} = validate(req.body);
    
    if(error) return res.status(400).send(error.details[0].message);
    let todo = new Todo({
        todoValue : req.body.todoValue,
        isDone : req.body.isDone
    });
    todo = await todo.save();
    res.send(todo);
});

router.delete('/:id', async (req, res) => {
    let todo = await Todo.findByIdAndRemove(req.params.id);
    if(!todo) return res.status(404).send('Todo Not found')
    res.send(todo);
});

router.put('/:id', async (req, res) => {
    const result = await Todo.findOneAndUpdate(
        { _id:req.params.id },
        { $set: { isDone: req.body.isDone }},
        { new: true });
    if(!result) return;
    res.send(result)
});

module.exports = router; 