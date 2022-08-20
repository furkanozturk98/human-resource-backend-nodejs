import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    name     : String,
    email    : String,
    password : String,
},{
    versionKey : false
});

import bcrypt from 'bcrypt';

const saltRounds = 8

schema.pre('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

const model = mongoose.model('User', schema);

export default model;