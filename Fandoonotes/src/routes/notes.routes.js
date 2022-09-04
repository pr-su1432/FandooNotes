import express from 'express';
import * as noteController from '../controllers/notes.controllers';
import { noteValidator } from '../validators/notes.validators';
import { userAuth } from '../middlewares/auth.middleware';

const router = express.Router();

//route to get all users
router.get('', noteController.getAllNotes);

//route to create a new user
router.post('', noteValidator, noteController.newNotes);

//route to get a single user by their user id
router.get('/:_id', userAuth, noteController.getNotes);

//route to update a single user by their user id
router.put('/:_id',userAuth, noteController.updateNotes);

//route to delete a single user by their user id
router.delete('/:_id',userAuth, noteController.deleteNotes);

export default router;
