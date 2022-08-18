import * as mongoose from 'mongoose';

const schema = new mongoose.Schema({
    id: String,
    name: String,
    email: String,
    password: String,
},{
    versionKey: false
});

const model = mongoose.model('User', schema);

export default model;