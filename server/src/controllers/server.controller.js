import mongoose from 'mongoose';

import fm from '../models/server.model';

export const getFields = (req, res) => {
    fm.find().exec((err, fields) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        console.log('todos', fields);
        return res.json({ 'success': true, 'message': 'Todos fetched successfully', fields });
    })
}

// export const addField = (req, res) => {
//     console.log(req.body);
//     const newTodo = new fm(req.body);
//     newTodo.save((err, todo) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error' });
//         }

//         return res.json({ 'success': true, 'message': 'Todo added successfully', todo });
//     })
// }
export const addField = (io, T) => {
    let result;
    console.log('io', io);
    console.log('T', T);
    const newTodo = new fm(T);
    newTodo.save((err, field) => {
        if (err) {
            result = { 'success': false, 'message': 'Some Error', 'error': err };
            console.log(result);
        } else {
            const result = { 'success': true, 'message': 'Todo added successfully', field };
            io.emit('fieldAdded', result);
        }
    })
}

// export const updateField = (req, res) => {
//     fm.findOneAndUpdate({ _id: req.body.id }, req.body, { new: true }, (err, todo) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error', 'error': err });
//         }
//         console.log(todo);
//         return res.json({ 'success': true, 'message': 'Todo Updated Successfully', todo });
//     })
// }
export const updateField = (io, T, action) => {
    let result;
    fm.findOneAndUpdate({ _id: T.id }, T, { new: true }, (err, field) => {
        if (err) {
            result = { 'success': false, 'message': 'Some Error', 'error': err };
            console.log(result);
        } else {
            if (action === 'update') {
                result = { 'success': true, 'message': 'Todo Updated Successfully', field };
                io.emit('fieldUpdated', result);
            } else {
                result = { 'success': true, 'message': '', field };
                io.emit('fieldUpdated', result);
            }
            
        }
    })
}

export const getField = (req, res) => {
    fm.find({ _id: req.params.id }).exec((err, todo) => {
        if (err) {
            return res.json({ 'success': false, 'message': 'Some Error' });
        }
        if (todo.length) {
            return res.json({ 'success': true, 'message': 'Todo fetched by id successfully', todo });
        }
        else {
            return res.json({ 'success': false, 'message': 'Todo with the given id not found' });
        }
    })
}

// export const deleteField = (req, res) => {
//     fm.findByIdAndRemove(req.params.id, (err, todo) => {
//         if (err) {
//             return res.json({ 'success': false, 'message': 'Some Error' });
//         }

//         return res.json({ 'success': true, 'message': 'Todo Deleted Successfully', todo });
//     })
// }
export const deleteField = (io, T) => {
    let result;
    fm.findByIdAndRemove(T._id, (err, field) => {
        if (err) {
            result = { 'success': false, 'message': 'Some Error', 'error': err };

        }
        result = { 'success': true, 'message': field.fieldText + 'Todo Deleted Successfully', field };
        io.emit('fieldDeleted', result);
    })
}