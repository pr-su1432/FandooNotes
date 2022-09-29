import express from 'express';
import * as noteController from '../controllers/notes.controllers';
import { noteValidator } from '../validators/notes.validators';
import { userAuth } from '../middlewares/auth.middleware';
import { redis_data } from '../middlewares/redis.middleware';


const router = express.Router();

//route to get all notes
router.get('', userAuth, redis_data, noteController.getAllNotes);

//route to create a new user
router.post('', noteValidator, noteController.newNotes);

//route to get a single note by their note id
router.get('/:_id', userAuth,  noteController.getNotes);
//route to get a single note by their note id
router.get('/:_id/', userAuth, redis_data, noteController.getNotes);

//route to update a single note by their note id
router.put('/:_id',userAuth, noteController.updateNotes);

//route to delete a single user by their note id
router.delete('/:_id',userAuth, noteController.deleteNotes);

//route to delete a single user by their note id
router.delete('/:_id/',userAuth, redis_data, noteController.deleteNotes);

//route to archive Note
router.put('/:_id/archive/',userAuth, noteController.archiveNotes);

//route to trash Note
router.put('/:_id/trash/',userAuth, noteController.trashNotes);

//route to Add  label to Note
router.post('/:_id/addlabels', noteController.addlabel);

//route to Add  label to Note
router.delete('/:_id/deletelabels', noteController.deleteLabel);

//route to Add  collaborator to Note
router.post('/:_id/collaborator', noteController.addCollaborator);


export default router;
