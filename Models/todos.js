const Joi = require('joi');
const mongoose = require('mongoose');

const Todo = mongoose.model('Todo', new mongoose.Schema({
    todoValue : {
        type : String,
        required: true,
    },
    isDone: {
        type: Boolean,
        required: true
    },
    user_id: {
        type : String,
        required: true
    }
}))

function validateTodo(todo){
    const schema = {
        todoValue : Joi.string().required(),
        isDone: Joi.boolean().required(),
        user_id: Joi.required()
    } ;

    return Joi.validate(todo,schema);
}

exports.Todo = Todo;
exports.validate = validateTodo;