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
//Archive  note
export const archiveNotes = async (_id) => {
  const data = await note.findByIdAndUpdate(

    { _id:_id, userId:_id.userId},

    {
      isArchived: true
    },
    {
      new: true
    }
  );
  console.log("archived data=====>", data)
  return data;
};



//trash note
export const trashNotes = async (_id) => {
  const data = await note.findByIdAndUpdate(
    {
       _id:_id, userId:_id.userId,
    },
    {
      isDeleted: true
    },
    {
      new: true
    }
  );
  console.log("trashed data===>",data)
  return data;
}