import Label from '../models/label.model';

export const addLabel = async (body) => {
    const data = await Label.create(body);
    return data;
};

export const updateLabel = async (_id, body) => {
    const data = await Label.findByIdAndUpdate(
    { 
        _id: _id 
    }, 
    body,
    { 
        new: true 
    })
    return data;
};

export const deleteLabel = async (_id) => {
    await Label.findOneAndDelete(_id)
};