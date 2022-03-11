import mongoose, { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt'
import Project from './project.interface'
import { nanoid } from 'nanoid';

const ProjectSchema = new Schema({
    title: {
        type: String,
        required: true,
        maxLength: 255
    },
    description: {
        type: String,
        required: true,
        maxLength: 510,
    },
    due: {
        type: Date,
    },
    importance: {
        enum: [0, 1, 2],
        default: 0
    },
    status: {
        enum: [0, 1, 2],
        default: 0
    },
    attachments: {
        type: [String],
        default: []
    },
    tasks: {
        type: [this],
        default: []
    },
    team: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        default: []
    },
    watching: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        default: []
    },
    likes: {
        type: [{ type: mongoose.Types.ObjectId, ref: 'User' }],
        default: []
    },
    tags: {
        type: [String],
        default: []
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        required: true
    },
})

export default model<Project>('Project', ProjectSchema);