import note from '../models/notes.models';
import{client} from '../config/redis';
import Label from '../models/label.model';

//get all notes
export const getAllNotes = async () => {
  const data = await note.find();
  if(data){
    await client.set('all notes', JSON.stringify(data));
    return data;
  }
  
};

//create new notes
export const newNotes = async (body) => {
  const data = await note.create(body);
  if(data){
    await client.del('all notes');
    return data;
  }

};

//update single note
export const updateNotes = async (_id, body) => {
  const data = await note.findByIdAndUpdate(
    { _id: _id, 
      userId: body.userId },
    { Title: body.Title, Description: body.Description },
    {
      new: true
    }
  );
  if(data){
    await client.del('all notes');
    return data;
  }
};

//delete single note
export const deleteNotes = async (id) => {
  await note.findByIdAndDelete(id);
  await client.del('all notes');
  return '';
};

//get single note
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

//add label to notes
export const addlabel = async (_id, labels) => {
  const labelCheck = await Label.find({id:labels});
  if(labelCheck != null){
    const data = await note.findByIdAndUpdate(
      {
        _id: _id
      },
      {
        $addToSet:{"labels": labels }
      },
      {
        new: true
      });
    return data;
  }

};
//remove label from  note
export const deleteLabel = async (_id, labels) => {
    const data = await note.findByIdAndUpdate(
      { 
        _id: _id 
      }, 
      { 
        $pull:{"labels": labels}
      }, 
      {
        new: true
      } 
    );
  return data;
};

//add collabarator to notes
export const addCollaborator = async (_id, collaborate) => {
  const labelCheck = await note.find({id:collaborate});
  if(labelCheck != null){
    const data = await note.findByIdAndUpdate(
      {
        _id: _id
      },
      {
        $addToSet:{"collaborate":  collaborate}
      },
      {
        new: true
      });
    return data;
  }

};

//remove collaborator from  note
export const deleteCollaborator = async (_id, collaborate) => {
  const data = await note.findByIdAndUpdate(
    { 
      _id: _id 
    }, 
    { 
      $pull:{"collaborate": collaborate}
    }, 
    {
      new: true
    } 
  );
return data;
};