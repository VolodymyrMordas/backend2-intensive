import mongoose from 'mongoose';
import { base as Base } from './base';

export const student = Base.descriminator(
    'student',
    new mongoose.Schema(
        {
            social: {
                facebook: String,
                linkedIn: String,
                skype:    String,
                telegram: String,
            }, roles: [
                {
                    type: String,
                    enum: [ 'newbie', 'student' ],
                },
            ],
            notes: String,
        },
    ),
);
