import express from 'express';

import * as controller from '../controllers/server.controller';

const router = express.Router();

// router.route('/')
//     .get(controller.getFields)
//     .post(controller.addField)
//     .put(controller.updateField);
router.route('/')
    .get(controller.getFields);

// router.route('/:id')
//     .get(controller.getField)
//     .delete(controller.deleteField);
router.route('/:id')
    .get(controller.getField);

export default router;