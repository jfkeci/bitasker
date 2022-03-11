import { Document } from 'mongoose';
import User from 'resources/user/user.interface';

enum Importance { LOW, MEDIUM, HIGH };
enum Status { IN_PROGRESS, DUE, DONE };

export default interface Project extends Document {
    title: string;
    description: string;
    due: Date;
    importance: Importance;
    status: Status;
    attachments: Array<string>;
    tasks: Array<Project>;
    team: Array<string>;
    watching: Array<string>;
    likes: Array<string>;
    tags: Array<string>;
    createdBy: string;
}

