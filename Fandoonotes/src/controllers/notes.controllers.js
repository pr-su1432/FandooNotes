import HttpStatus from 'http-status-codes';
import * as noteService from '../services/notes.services';


/**
 * Controller to get all users available
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getAllNotes = async (req, res, next) => {
  try {
    const data = await noteService.getAllNotes();
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All Notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to get a single user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const getNotes = async (req, res, next) => {
  try {
    const data = await noteService.getNotes(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'notes fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const newNotes = async (req, res, next) => {
  try {
    console.log("request body --->",req)
    const data = await noteService.newNotes(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Notes created successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to update a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const updateNotes = async (req, res, next) => {
  try {
    const data = await noteService.updateNotes(req.params._id, req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'notes updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to delete a user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const deleteNotes = async (req, res, next) => {
  try {
    await noteService.deleteNotes(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: [],
      message: 'Notes deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to archive a notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const archiveNotes = async (req, res, next) => {
  try {
    const data = await noteService.archiveNotes(req.params._id,req.body);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Archived Note Successfully'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to trash a notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const trashNotes = async (req, res, next) => {
  try {
    const data = await noteService.trashNotes(req.params._id);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note trash Successfull'
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Controller to add label  to notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const addlabel = async (req, res, next) => {
  try {
    const data = await noteService.addlabel(req.params._id,req.body.labels);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'label added successfully'
    });
  } catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
      code: HttpStatus.BAD_REQUEST,
      message: `${error}`
    });
  }
};

/**
 * Controller to delete label to notes
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
 export const deleteLabel = async (req, res, next) => {
  try {
    const data = await noteService.deleteLabel(req.params._id,req.body.labels);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'label removed successfully'
    });
  }  catch (error) {
    res.status(HttpStatus.BAD_REQUEST).json({
        code: HttpStatus.BAD_REQUEST,
        message: `${error}`
    });
}
};

