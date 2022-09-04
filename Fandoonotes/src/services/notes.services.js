import note from '../models/notes.models';

//get all users
export const getAllNotes = async () => {
  const data = await note.find();
  return data;
};

//create new user
export const newNotes = async (body) => {
  const data = await note.create(body);
  return data;
};

//update single user
export const updateNotes = async (_id, body) => {
  const data = await note.findByIdAndUpdate(
    {
      _id
    },
    body,
    {
      new: true
    }
  );
  return data;
};

//delete single user
export const deleteNotes = async (id) => {
  await note.findByIdAndDelete(id);
  return '';
};

//get single user
export const getNotes = async (id) => {
  const data = await note.findById(id);
  return data;
};
