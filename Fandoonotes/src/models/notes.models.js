import { string } from '@hapi/joi';
import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Descreption: {
            type: String,
            required: true,
        },
        Color: {
            type: String,
        },
        isArchived: {
            type: Boolean, default: false
        },
        isDeleted: {
            type: Boolean, default: false
        },
        userId: {
            type: String,
            
        },
        labels : [{
            type: String
        }]
    },

    {
        timestamps: true
    }
);

export default model('Note', noteSchema);